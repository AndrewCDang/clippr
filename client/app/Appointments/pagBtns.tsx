"use client"
import { useRouter } from "next/navigation"
import { useEffect,useState } from "react"

type PagBtnsTypes = {
    numPages:number
    pagPage:number
}

function PagBtns({numPages,pagPage}:PagBtnsTypes) {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState<number>()

    useEffect(() => {
        if (!isNaN(pagPage) ) {
            setCurrentPage(pagPage);
        }else{
            setCurrentPage(0);
        }
    }, [pagPage]);


    return (
        <aside className="flex gap-2 mx-auto">
            {
                !isNaN(numPages) && (numPages as number)>1  ? 
                [...Array(numPages)].map((_,i)=>{
                    return(
                        <a key={i} href="#previousAppointments-title">
                            <div key={i} className="[&:has(input:checked)]:bg-primary [&:has(input:checked)]:shadow-md rounded-md transition-all duration-200 ease-in-out cursor-pointer border-[0.5px] border-light relative w-6 h-6">
                                <input onChange={()=>router.push(`/Appointments?page=${i}`, { scroll: false })} checked={i==currentPage} type="radio" name="pagination" id={`pagination-${i}`} className="peer w-0 h-0  border-[0.5px] border-light rounded-md"></input>
                                <label className="w-full h-full text-center cursor-pointer peer-checked:font-bold peer-checked:text-bg text-light transition-all duration-200 absolute m-auto inset-0" htmlFor={`pagination-${i}`}>{i}</label>
                            </div>
                        </a>
                    )
                })
                :null
            }
        </aside>
    )
}

export default PagBtns