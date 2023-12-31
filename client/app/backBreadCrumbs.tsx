"use client"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useAutoAnimate } from "@formkit/auto-animate/react"


function BackBreadCrumbs() {
    const [parent] = useAutoAnimate()

    const router = useRouter()
    const params = useParams()
    const breadcrumbs = Object.values(params).filter((param,i)=>{
        return i < Object.values(params).length-1
    }) as string[]
    const pageCheck = breadcrumbs.includes('barber')
    const currentPage = Object.values(params)[Object.values(params).length-1] as string
    

  return (
    <>
    <div onClick={()=>router.back()} className={`item h-full w-full absolute top-0 z-50 ${pageCheck && 'true'}`}></div>
    <div className="absolute top-[50%] left-[100%] -translate-y-[50%] translate-x-2 cursor-none pointer-events-none" ref={parent}>
        <h3 className='text-light whitespace-nowrap leading-none'>{breadcrumbs.map(item=>{return(` ${item} /`)})}<strong> {currentPage}</strong></h3>
    </div>
    </>
  )
}

export default BackBreadCrumbs