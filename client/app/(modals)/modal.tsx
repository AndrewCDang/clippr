"use client"
import { useEffect, useRef, useState } from "react"

function Modal({child, isModalOpen, modalClose}:{child:React.ReactNode,isModalOpen:boolean,modalClose:()=>void}) {
    const [displayNone, setDisplayNone] = useState<boolean>(true)
    const [opacityOn, setOpacityOn]= useState<boolean>(true)
    const contentRef = useRef<HTMLElement>(null)

    const transitionHandler = () => {
        if(!isModalOpen){
            setTimeout(()=>{
                setDisplayNone(true)
            },100)
        }
    }

    const clickClose = (e:MouseEvent) => {
        if(contentRef.current && !contentRef.current.contains(e.target as HTMLElement)){
            modalClose()
        }
    }

    useEffect(()=>{
        if(isModalOpen){
            setDisplayNone((false))
            setTimeout(()=>{
                setOpacityOn(true)
            },100)
        }else{
            setOpacityOn(false)
        }
    },[isModalOpen])

    useEffect(()=>{
        if(contentRef.current){
            window.addEventListener('click', clickClose)

            return() => {
                window.removeEventListener('click', clickClose)
            }
        }
    },[contentRef.current])

    if(displayNone) return null

    return (
        <aside onTransitionEnd={transitionHandler} className={`${opacityOn ? 'opacity-1 ':'opacity-0'} transition-opacity duration-300 fixed bg-opacity-50 top-0 left-0 z-50 w-full bg-secondary-f h-full justify-center`}>
            <section ref={contentRef} className={`absolute top-[50%] left-[50%] translate-x-[-50%] ${opacityOn ? 'translate-y-[-50%] ':'translate-y-[0%]'} transition-transform duration-300 ease-in-out`}>
                {child}
            </section>
        </aside>
    )

}


export default Modal