'use client'
import { signIn } from 'next-auth/react'
import Image from "next/image"


export const Login = (): JSX.Element => {
    const handleSignIn = (): void => {
        signIn('google');
    }


    return <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center">
        <Image
            src='https://freesvg.org/img/1538298822.png'
            width={300}
            height={300}
            alt='App logo'
            className='invert'
        />
        <button
            className="text-white font-bold text-3xl animate-pulse"
            onClick={handleSignIn}
        >
            Sign in to use ChatGPT
        </button>
    </div>
}