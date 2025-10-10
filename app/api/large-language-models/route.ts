import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

const KRAVIX_STUDIO_URI = process.env.KRAVIX_STUDIO_CONNECTION_STRING! as string;
const KRAVIX_STUDIO_API_KEY = process.env.KRAVIX_STUDIO_API_KEY! as string;

export async function POST(request: NextRequest) {
    try {
        const { model, msg, parentModel } = await request.json();

        const response = await axios.post(
            KRAVIX_STUDIO_URI,
            {
                message: msg,
                aiModel: model,
                outputType: "json"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${KRAVIX_STUDIO_API_KEY}`
                }
            }
        );

        if (!response.data) {
            return NextResponse.json({
                success: false,
                message: "Unable to get response from Kravix Studio"
            }, { status: 500 });
        }

        // NOTE - [TODO] Update Firebase DB with changes [user token] - handle in frontend

        return NextResponse.json({
            ...response.data,
            model: parentModel
        }, { status: 200 });


    } catch (error: unknown) {
        console.error("Error initializing user:", error);

        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error");
        }
    }
}