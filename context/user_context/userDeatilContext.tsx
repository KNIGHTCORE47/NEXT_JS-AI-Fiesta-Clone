"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { UserDataINF } from '@/database/services';

interface UserDetailContextValue {
    userDetail: UserDataINF | null;
    setUserDetail: Dispatch<SetStateAction<UserDataINF | null>>;
}


const UserDetailContext = createContext<UserDetailContextValue | null>(null);

export default UserDetailContext;

export type { UserDetailContextValue };

