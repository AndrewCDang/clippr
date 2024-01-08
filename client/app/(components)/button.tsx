
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
    full?: boolean
}

export function Button({text,loading, clicked, customFit, disabled,variant,svg,full,textColor,borderColor}:ButtonTypes){

    if(variant==2){
        return(
            <button onClick={e=>clicked?.()}  className={`flex ${full === true ? 'w-full' : ''} flex-row content-between gap-2 rounded-lg select-none ${disabled ? 'bg-light pointer-events-none cursor-none' : 'bg-white'} px-4 py-2 ${textColor? textColor: 'text-primary'}  border-[1px] ${borderColor? borderColor : 'border-primary' } text-sm transition-all duration-400  ${!customFit && 'mx-auto'} hover:scale-[0.96]`}>
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
            <button onClick={e=>clicked?.()}  className={`flex ${full === true ? 'w-full' : ''}  flex-row items-center gap-2 rounded-lg select-none ${disabled ? 'bg-light pointer-events-none cursor-none' : 'bg-primary'} px-4 py-2 text-white text-sm transition-all duration-400  ${!customFit && 'mx-auto'} hover:scale-[0.96]`}>
                { loading && <LoadingSpin />}
                {
                    svg && 
                    <div className="stroke-white w-6 stroke-[4px]">
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