"use client"
import { useEffect, useState } from "react"
import BtnSelection from "@/app/(components)/btnSelection"

type EthnicityProps={
    updateValidBarberPages:Function;
    page:Number;
    updateAccountDetails: Function;
}

export default function Ethnicity({updateValidBarberPages, page, updateAccountDetails}:EthnicityProps){
    const [ethArray, setEthArray] = useState<string[]>([])
    const [touched, setTouched] = useState(false)
    
    const btnClick = (tag:string) => {
        touched == false ? setTouched(true) : null
        setEthArray((prevArray) => {
            if (!prevArray.includes(tag)) {
            return [...prevArray, tag];
            } else {
            return prevArray.filter((item) => item !== tag);
            }
        });

    }

    useEffect(()=>{
        if(touched){
            ethArray.length>0 ? (updateValidBarberPages(page,true), updateAccountDetails('ethnicType',ethArray)) : (updateValidBarberPages(page,false),updateAccountDetails('ethnicType',[]))
            console.log(ethArray)
        }
    },[ethArray])


    return(
        <section className="flex flex-row gap-8 flex-wrap justify-center w-full max-w-[600px] mx-auto">
            <BtnSelection type={'checkbox'} id="radio_caucasian" tag={'caucasian'} click={btnClick}/>
            <BtnSelection type={'checkbox'} id="radio_afro" tag={'afro'} click={btnClick}/>
            <BtnSelection type={'checkbox'} id="radio_asian" tag={'asian'} click={btnClick}/>
        </section>

    )
}
