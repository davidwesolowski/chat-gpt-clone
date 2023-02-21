'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image';

export const UserPhoto = (): JSX.Element => {
    const { data: session } = useSession();

    const handleSignOut = () => {
        signOut();
    }

    return session ? (
        <div className='flex justify-center w-full cursor-pointer mb-3'>
            <Image onClick={handleSignOut} className='rounded-full hover:opacity-50' width={50} height={50} src={session.user?.image!} alt={`User ${session.user?.name}`} />
        </div>
    ) : <></>
}