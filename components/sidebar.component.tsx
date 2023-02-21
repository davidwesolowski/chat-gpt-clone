'use client';

import { useCollection } from 'react-firebase-hooks/firestore'
import { useSession } from 'next-auth/react'
import { NewChat } from "./new-chat.component"
import { UserPhoto } from "./user-photo.component"
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { ChatRow } from './chat-row.component';


export const Sidebar = (): JSX.Element => {
    const { data: session } = useSession();
    const [chats, isLoading, error] = useCollection(session &&
        query(
            collection(db, 'users', session.user?.email!, 'chats'),
            orderBy('createdAt', 'desc')
        ));

    return <div className="p-2 h-screen flex flex-col">
        <div className="flex-1">
            <NewChat />
            <div className='mt-2'>
                {isLoading && <p className='text-white text-center animate-pulse'>Loading chats...</p>}
                {chats?.docs.map((chat) => (
                    <ChatRow key={chat.id} id={chat.id} />
                ))}
            </div>
        </div>
        <UserPhoto />
    </div>
}