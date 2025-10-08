"use client";

import { useMemo, useState, PropsWithChildren } from 'react';
import UserDetailContext from './userDeatilContext';
import { UserDataINF } from '@/database/services';


const UserDetailProvider = ({ children }: PropsWithChildren) => {
    const [userDetail, setUserDetail] = useState<UserDataINF | null>(null)


    // Memoize the value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        userDetail,
        setUserDetail
    }), [userDetail])

    return (
        <UserDetailContext.Provider value={contextValue}>
            {children}
        </UserDetailContext.Provider>
    )
}

export default UserDetailProvider;