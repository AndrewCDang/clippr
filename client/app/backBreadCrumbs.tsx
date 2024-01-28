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
    <div onClick={()=>router.back()} className={`${pageCheck && 'true'}`}>
      <button className='item w-10 aspect-square bg-primary rounded-full transition-all duration-600 shadow-xl '>
        <svg className='stroke-[4px] stroke-bg -rotate-90' viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9629 52.1839L36.7809 31.3659C38.5383 29.6085 41.3875 29.6085 43.1449 31.3659L63.9629 52.1839" strokeLinecap="round" strokeLinejoin="round" />
        </svg>  
      </button>
    </div>
    <div className="cursor-none pointer-events-none h-fit w-fit" ref={parent}>
        <h3 className='text-light text-wrap leading-[0.75rem] md:leading-[0.875rem] text-xs md:text-sm'>{breadcrumbs.map(item=>{return(` ${item} /`)})}<strong> {currentPage}</strong></h3>
    </div>
    </>
  )
}

export default BackBreadCrumbs