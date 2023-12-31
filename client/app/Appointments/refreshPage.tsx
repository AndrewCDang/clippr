"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type RefreshType = {
    condition:boolean
}

function RefreshPage({condition}:RefreshType) {
    const router = useRouter()
    console.log

    useEffect(()=>{
        if(condition && condition === true){
            router.refresh()
        }
    },[condition])

    return (
    null)
}

export default RefreshPage