
import './globals.css'
import { Poppins, Montserrat } from 'next/font/google'
import { SkeletonTheme } from 'react-loading-skeleton';
import LoadGoogleMaps from './loadGoogle'
import  {LogIn} from './(auth)/(login)/logIn'
import {SignUp} from '@/app/(auth)/(signup)/signUp'
import { NavBar } from './NavBar';
import Footer from './footer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SessionLogIn from './(auth)/sessionLogIn';
import BackBtn from './(components)/backBtn';
import BackBtnContainer from './backBtnContainer';
import ReviewModal from './(modals)/reviewModal';
import InteractModal from './(modals)/interactModal';

export const dynamic = 'force-dynamic'


const poppins = Poppins({ subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800", "900"]
})

const montserrat = Montserrat({ subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800", "900"]
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: {children: React.ReactNode}) {
  // Remove this from
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()
  // sessionLogIn({data:data.session})

  
  
  return (
    <html className='relative w-[100vw] overflow-x-clip' lang="en">
        <body className={`${poppins.className}`}>
          <main className='relative min-h-screen flex flex-col w-100vw'>
            <NavBar montserrat={montserrat}></NavBar>
            <section  className='px-[calc(12.5%-2rem)] w-full relative flex flex-col flex-1'>
              <BackBtnContainer/>
              <SkeletonTheme baseColor="rgb(211, 211, 211)" highlightColor="white">
                  {children}
              </SkeletonTheme>
            </section>
          </main>
          <LogIn/>
          <SignUp/>
          <ReviewModal/>
          <InteractModal/>
          <LoadGoogleMaps/>
          <SessionLogIn data ={data.session}/>
          <Footer/>
        </body>
    </html>
  )
}