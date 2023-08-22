"use client"

import { useCallback, useEffect, useRef, useState } from "react"


export default function NavLocation({focusLocation, setFocusLocation, setLocation, formatUri}) {

    const [selected, setSelected] = useState(null)

    useEffect(()=>{
        if(focusLocation){
            inputRef.current.focus()
        }
    },[focusLocation])
    const inputRef = useRef()

    const focusHandle = useCallback(()=>{
        if(focusLocation){
            setFocusLocation(false)
        }
    },[focusLocation])

    

  return (
    <div className="p-2 w-[90%] mx-auto">
        <input ref={inputRef} onChange={(e)=>{focusHandle();setLocation(formatUri(e.target.value))}}  className="w-[100%] border border-light-2 p-1 rounded-xl  " id="minute" placeholder="Enter Location" type="text"></input>
    </div>
  )
}
