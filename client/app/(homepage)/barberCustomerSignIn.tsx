"use client"

import ScissorsSVG from "../(svg)/scissorsSvg";
import PersonSVG from "../(svg)/personSVG";
import { useState, useRef, useEffect } from "react";


type BarberCustomerSignInTypes = {
    BarberPage:React.ReactNode;
    CustomerPage:React.ReactNode;
}


function BarberCustomerSignIn({BarberPage, CustomerPage}: BarberCustomerSignInTypes) {
    const [pageToggle, setPageToggle] = useState<boolean>(false)
    const customerPageRef = useRef<HTMLDivElement>(null)
    const barberPageRef = useRef<HTMLDivElement>(null)
    const [pageHeight, setPageHeight] = useState<string>()

    useEffect(()=>{
        if(barberPageRef.current){
            setPageHeight(`${barberPageRef.current.offsetHeight + 32}px`)
        }

    },[barberPageRef.current,customerPageRef.current])



    return (
        <div style={{height:pageHeight && pageHeight, transition:'height 300ms ease-in-out'}} className={`w-full`}>
            <div className="relative h-full overflow-y-hidden overflow-x-hidden">
                <div className="flex w-16 h-8 relative">
                    <input onChange={()=>setPageToggle(state=>{
                        if(state){
                            if(barberPageRef.current){
                                setPageHeight(`${barberPageRef.current.offsetHeight + 32}px`)
                            }
                        }else{
                            if(customerPageRef.current){
                                setPageHeight(`${customerPageRef.current.offsetHeight + 64}px`)
                            }
                        }
                        return(!state)}
                    )} 
                    
                    id="lightTest" className="peer w-0 h-0" type="checkbox"></input>
                    <label style={{boxShadow:'none'}} htmlFor="lightTest" className="w-full h-full bg-light-3 cursor-pointer rounded-[1rem]"></label>
                    <span className="bg-primary transition-transform translate-x-[0%] duration-300 w-8 aspect-square rounded-full absolute pointer-events-none select-none
                        peer-checked:translate-x-[100%] 
                        peer-checked:[&_#barberSVG]:opacity-0 
                        peer-checked:[&_#barberSVG]:translate-y-[100%] 
                        peer-[&:not(:checked)_#customerSVG]:opacity-0 
                        peer-[&:not(:checked)_#customerSVG]:translate-y-[-100%]">
                        <span className="relative w-full h-full block overflow-hidden">
                            <div id="barberSVG" className="w-full h-full stroke-light-3 stroke-[4px] [transition:opacity_0.3s,transform_0.5s] translate-y-[0%] opacity-1 absolute inset-0 drop-shadow-lg">
                                <ScissorsSVG/>
                            </div>
                            <div id="customerSVG" className=" stroke-none w-full h-full fill-light-3 [transition:opacity_0.3s,transform_0.5s] translate-y-[0%] opacity-1  absolute inset-0">
                                <PersonSVG/>
                            </div>
                        </span>
                    </span>
                    <span className={`absolute right-0 top-[50%] translate-x-[100%] select-none   whitespace-nowrap translate-y-[-50%] pl-2 peer-checked:hidden text-xs`}><span className="text-semibold">Barber</span><span className="text-light text-xs"> mode</span></span>
                    <span className={`absolute right-0 top-[50%] translate-x-[100%] select-none whitespace-nowrap translate-y-[-50%] pl-2 peer-[&:not(:checked)]:hidden text-xs`}><span className="text-semibold ">Customer</span><span className="text-light text-xs"> mode</span></span>
                </div>
                <div ref={barberPageRef} className={` w-full pt-8 absolute z-0 ${pageToggle ? 'translate-x-[-100%] opacity-0' : 'translate-x-0 opacity-1'}  transition-all duration-300 ease`}>
                    {BarberPage}
                </div>
                <div ref={customerPageRef} className={`w-full pt-8 absolute z-0 ${pageToggle ? 'translate-x-[0%] opacity-1 ' : 'translate-x-[100%] opacity-0'} transition-all duration-300 ease`}>
                    {CustomerPage}
                </div>
            </div>  
        </div>
    )
}

export default BarberCustomerSignIn