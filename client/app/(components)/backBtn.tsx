"use client"

import BackArrowSVG from "../(svg)/backArrowSVG"
import { useRouter } from "next/navigation"

type BackBtnTypes = {
    breadcrumbs: string[];
    currentPage: string;
}

function BackBtn({breadcrumbs,currentPage}:BackBtnTypes) {
    const router = useRouter()
    return (
        <button onClick={()=>router.back()} className='absolute top-0 left-0 flex items-center gap-2 z-50'>
            <BackArrowSVG/>
            <h3 className='text-light'>{breadcrumbs.map(item=>{return(` ${item} /`)})}<strong> {currentPage}</strong></h3>
    </button>
    )
}

export default BackBtn