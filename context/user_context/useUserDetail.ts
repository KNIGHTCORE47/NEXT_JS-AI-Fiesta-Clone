"use client";

import { useContext } from 'react';
import UserDetailContext, { UserDetailContextValue } from './userDeatilContext';

export function useUserDetail(): UserDetailContextValue {
    const context = useContext(UserDetailContext)

    if (!context) {
        throw new Error('useUserDetail must be used within a UserDetailProvider')
    }

    return context;
}