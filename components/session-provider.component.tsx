'use client';

import { Session } from 'next-auth'
import { SessionProvider as Provider } from 'next-auth/react';
import { ReactNode } from 'react';

interface SessionProviderProps {
    children: ReactNode;
    session: Session | null;
}

export const SessionProvider = ({ children, session }: SessionProviderProps): JSX.Element => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}