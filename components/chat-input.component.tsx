'use client';

import toast from 'react-hot-toast';
import { db } from "@/firebase/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, FieldValue, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, FormEvent } from "react";

interface ChatInputProps {
    chatId: string;
}

interface Message {
    text: string;
    createdAt: FieldValue;
    user: {
        _id: string;
        name: string;
        avatar: string;
    }
}

export const ChatInput = ({ chatId }: ChatInputProps) => {
    const [text, setText] = useState<string>('');
    const { data: session } = useSession();

    const model = 'text-davinci-003';

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (text === '' || session?.user == null) {
            return;
        }

        const inputText = text.trim();
        const { user: { email, name, image } } = session;

        const message: Message = {
            text: inputText,
            createdAt: serverTimestamp(),
            user: {
                _id: email!,
                name: name!,
                avatar: image ?? `https://ui-avatars.com/api/?name=${name}`
            }
        }

        await addDoc(collection(db, 'users', email!, 'chats', chatId, 'messages'), {
            ...message 
        });

        setText('');

        const notification = toast.loading('ChatGPT is processing...');

        await fetch('/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText,
                session,
                chatId,
                model
            })
        }).then(() => {
            toast.success('ChatGPT has responded!', {
                id: notification
            });
        });

    }

    return <div className='bg-[#212121]/70 text-gray-400 rounded-lg text-sm'>
        <form onSubmit={handleSubmit} className="p-5 space-x-5 flex">
            <input
                type='text'
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Type your prompt here..."
                className="focus:outline-none flex-1 bg-transparent"
            />
            <button
                type='submit'
                disabled={text === ''}
                className='bg-[var(--chat-green)] px-4 py-2 rounded-lg font-bold disabled:cursor-not-allowed disabled:bg-gray-500'
            >
                <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
            </button>
        </form>
    </div>
}