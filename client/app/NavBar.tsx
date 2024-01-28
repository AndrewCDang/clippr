import Link from 'next/link'
import NavSearch from './(search)/navSearch'
import { NextFont } from 'next/dist/compiled/@next/font';
import Account from '@/app/Account'
import ClipprLogo from './(components)/clipprLogo';

export function NavBar({montserrat}:{montserrat:NextFont}){
    return(
        <nav className='grid grid-cols-3 items-center z-20  relative align-start bg-bg p-2'>
            <Link className='flex gap-4 text-3xl font-semibold items-center' href="/">
                <div className='w-14 hidden md:block'>
                    <ClipprLogo/>
                </div>
                <p className={`${montserrat.className} font-bold`}>Clippr.</p>
            </Link>
            < NavSearch />
            < Account />
        </nav>
    )
}