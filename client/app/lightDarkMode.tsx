"use client"

import { Input } from "postcss"
import LightMode from "./(components)/lightMode"
import DarkMode from "./(svg)/darkMode"
import { useEffect, useRef, useState } from "react"

function LightDarkMode() {
    const lightDarkRef = useRef<HTMLInputElement>(null)
    const [checked, setChecked] = useState<boolean>(false)

  return (
    <div className="">
        <div data-theme={checked && 'dark'} className="flex relative w-16 h-8">
            <input onChange={()=>setChecked(state=>{return(!state)})} ref={lightDarkRef} id="lightMode" className="peer w-0 h-0" type="checkbox"></input>
            <label style={{boxShadow:'none'}} htmlFor="lightMode" className="w-full h-full bg-light-3 cursor-pointer rounded-[1rem]"></label>
            <span className="bg-primary peer-checked:translate-x-[100%] peer-checked:[filter:drop-shadow(0px_0px_6px_rgba(256,256,256,0.8))] transition-transform translate-x-[0%] duration-300 w-8 aspect-square rounded-full absolute pointer-events-none select-none peer-checked:[&_#lightMode]:opacity-0 peer-checked:[&_#lightMode]:translate-y-[100%] peer-[&:not(:checked)_#darkMode]:opacity-0 peer-[&:not(:checked)_#darkMode]:translate-y-[-100%]">
                <span className="relative w-full h-full block overflow-hidden">
                    <div id="lightMode" className="w-full h-full stroke-light-3 stroke-[4px] [transition:opacity_0.3s,transform_0.5s] translate-y-[0%] opacity-1 absolute inset-0 drop-shadow-lg [&_svg]:[filter:drop-shadow(0px_0px_2px_rgba(256,256,256,0.8))] ">
                        <LightMode/>
                    </div>
                    <div id="darkMode" className="w-full h-full stroke-light-3 stroke-[4px] [transition:opacity_0.3s,transform_0.5s] translate-y-[0%] opacity-1  absolute inset-0">
                        <DarkMode/>
                    </div>
                </span>
            </span>
        </div>
    </div>
  )
}

export default LightDarkMode