
"use client"
import { ReactNode } from "react";
import LoadingSpin from "./loadingSpin"

type ButtonTypes = {
    text: string;
    textColor?:string;
    borderColor?:string;
    variant?:number;
    loading?:boolean;
    clicked?: Function;
    customFit?:boolean;
    disabled?:boolean;
    svg?: ReactNode;
    full?: boolean;
    bg?:string;
}

export function Button({text,loading, clicked, customFit, disabled,variant,svg,full,textColor,borderColor, bg}:ButtonTypes){

    if(variant==2){
        return(
            <button onClick={e=>clicked?.()}  className={`flex ${full === true ? 'w-full' : ''} ${disabled ? 'bg-light pointer-events-none cursor-none' : 'bg-bg'} ${bg && bg} flex-row content-between gap-2 rounded-lg select-none px-4 py-2 ${textColor? textColor: 'text-primary'}  border-[1px] ${borderColor? borderColor : 'border-primary' } text-[0.8rem] md:text-sm leading-[0.8rem] md:leading-1 transition-all duration-400  ${!customFit && 'mx-auto'} hover:scale-[0.96]`}>
            { loading && <LoadingSpin />}
            {
                svg && 
                <div className="stroke-primary w-6 stroke-[4px]">
                    {svg}
                </div>
            }
            <div className={`${full === true ? 'mx-auto' : ''}`}>
                {text}
            </div>
        </button>
        )
    }else{
        return(
            <button onClick={e=>clicked?.()}  className={`flex ${full === true ? 'w-full' : ''} ${disabled ? 'bg-light pointer-events-none cursor-none' : 'bg-primary'} ${bg && bg} ${textColor && textColor} ${borderColor && borderColor} flex-row items-center gap-2 rounded-lg select-none px-4 py-2 text-light-3 text-[0.8rem] md:text-sm leading-[0.8rem] md:leading-1 transition-all duration-400  ${!customFit && 'mx-auto'} hover:scale-[0.96]`}>
                { loading && <LoadingSpin />}
                {
                    svg && 
                    <div className="stroke-bg w-6 stroke-[4px]">
                        {svg}
                    </div>
                }
                <div className={`${full === true ? 'mx-auto' : ''}`}>
                    {text}
                </div>  
            </button>
        )

    }
}