
"use client"
import LoadingSpin from "./loadingSpin"

type ButtonTypes = {
    text: string;
    loading?:boolean;
    clicked?: Function;
    customFit?:boolean;
    disabled?:boolean;
}

export function Button({text,loading, clicked, customFit, disabled}:ButtonTypes){
    return(
        <button onClick={e=>clicked?.()}  className={`flex flex-row items-center gap-2 rounded-lg select-none ${disabled ? 'bg-light pointer-events-none cursor-none' : 'bg-primary'} px-4 py-2 text-white text-sm transition-all duration-400  ${!customFit && 'mx-auto'}`}>
            { loading && <LoadingSpin />}
            {text}
        </button>
    )
}