"use client"

import React from 'react'
import SortBy from '@/app/(svg)/sortBy'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

type SortTypes = {
    city:string;
    lat:number;
    lng:number;
    sortBy:string;
    searchLocation:string;
    ethnicity:string;
}

function SortBtns({city,lat,lng,sortBy,searchLocation,ethnicity}:SortTypes) {
    const [toggle, setToggle] = useState<boolean>(false)
    const sortBtnRef = useRef<HTMLButtonElement>(null)

    const clickHandle = (e: MouseEvent) => {
        const target = e.target as Node;    
        if (sortBtnRef.current && target) {
            if (!sortBtnRef.current.contains(target)) {
                setToggle(false);
            }
        }
    };

    useEffect(()=>{
        window.addEventListener('click', clickHandle)

        return() =>{
            window.removeEventListener('click', clickHandle)
        }


    },[])

return (
    <section className='flex gap-8 relative w-fit'>
        <button ref={sortBtnRef} onClick={()=>setToggle(true)} className='flex items-center border-[0.5px] border-primary justify-between rounded-md hover:scale-[0.98] transition-all duration-200'>
            <div className='w-8 aspect-square fill-secondary'>
                <SortBy/>
            </div>
            <h3 className='whitespace-nowrap mr-2'>Sort by <span className='underline decoration-1'>{sortBy}</span></h3>
        </button>
        <div className={`${toggle ? 'visible' : 'hidden'} w-full flex flex-col absolute z-30 top-[100%] rounded-md overflow-hidden border-[0.5px] border-secondary shadow-lg mt-1`}>
            <Link href={`/discover/location/${city}?searchLocation=${searchLocation}&ethnicity=${ethnicity}&lat=${lat}&lng=${lng}&sort=price`}><div className={` border-b-[0.5px] border-light  ${sortBy === 'price' ? 'bg-light-3' : 'bg-white'} hover:bg-light-3 hover:text-primary text-light px-4 py-1 cursor-pointer transition-all duration-200 bg-white`}>Price</div></Link>
            <Link href={`/discover/location/${city}?searchLocation=${searchLocation}&ethnicity=${ethnicity}&lat=${lat}&lng=${lng}&sort=location`}><div className={`border-b-[0.5px] border-light  ${sortBy === 'price' ? 'bg-light-3' : 'bg-white'} hover:bg-light-3 hover:text-primary text-light px-4 py-1 cursor-pointer transition-all duration-200 bg-white`}>Location</div></Link>
            <Link href={`/discover/location/${city}?searchLocation=${searchLocation}&ethnicity=${ethnicity}&lat=${lat}&lng=${lng}&sort=reviews`}><div className={`border-b-[0.5px] border-light  ${sortBy === 'price' ? 'bg-light-3' : 'bg-white'} hover:bg-light-3 hover:text-primary text-light px-4 py-1 cursor-pointer transition-all duration-200 bg-white`}>Reviews</div></Link>
        </div>
    </section>
)
}

export default SortBtns