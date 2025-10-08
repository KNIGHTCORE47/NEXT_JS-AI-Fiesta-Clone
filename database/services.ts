import {
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";
import db from "./firebase_config";
import { useUser } from '@clerk/nextjs';
import { useDefaultModel } from '@/context/ai_context/useDefaultModel';
import { DefaultModelList } from '@/shared/AiModelList';


// Extract the User type from useUser hook
export type ClerkUser = NonNullable<ReturnType<typeof useUser>['user']>;

// NOTE - Create interface for user data
export interface UserDataINF {
    name: string;
    email: string;
    remainingMsg: number;
    plan: string;
    credits: number;
    createdAt: Date;
    selectedModelPref?: DefaultModelList;
}

// Return type for the registration function
interface RegisterUserResult {
    isNewUser: boolean;
    userData: UserDataINF;
}

export async function RegisterUserAccountToDB(
    user: ClerkUser
) {
    try {
        // NOTE - Get primary email address safely
        const email = user.primaryEmailAddress?.emailAddress;

        if (!email) {
            throw new Error("User email not found");
        }

        // NOTE - Check for existing user
        const existingUser = doc(db, "users", email);
        const docSnap = await getDoc(existingUser);

        if (docSnap.exists()) {
            console.log("Document data [Existing User]:", docSnap.data());

            const userInfo = docSnap.data();

            return {
                isNewUser: false,
                userData: userInfo
            };
        }

        // NOTE - For New User
        const userData: UserDataINF = {
            name: user?.fullName || user?.firstName || "",
            email: email,
            remainingMsg: 5,    // Free Plan [free users]
            plan: "Free",
            credits: 1000,   // Premium Plan [Subscribed users]
            createdAt: new Date(),
        };

        await setDoc(existingUser, userData);

        console.log("Document data [New User]:", userData);

        return {
            isNewUser: true,
            userData: userData
        };

    } catch (error: unknown) {
        console.error(error);

        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}