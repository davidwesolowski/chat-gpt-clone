import { SessionProvider } from '@/components/session-provider.component'
import { Sidebar } from '@/components/sidebar.component'
import '../styles/globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Login } from '@/components/login.component'
import { ClientProvider } from '@/components/client-provider.component'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProvider session={session}>
          {session === null ? <Login /> : (
              <div className='flex'>
               
                <div className='h-screen bg-[#212121] max-w-xs overflow-y-auto md:min-w-[300px]'>
                  <Sidebar />
                </div>
                
                <div className='bg-[#2d2c2c] flex-1'>
                  {children}
                </div>

                <ClientProvider />

              </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
