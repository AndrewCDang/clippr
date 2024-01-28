"use client"
import { SetStateAction, useState, Dispatch } from "react"
import BtnSelection from "@/app/(components)/btnSelection"

interface ExperienceProps {
    page:number;
    updateValidBarberPages:Function;
    updateAccountDetails:Function;
}

export default function Experience({page,updateValidBarberPages,updateAccountDetails}:ExperienceProps){
    const [barberLevel, setBarberLevel] = useState<string>('')
    
    const btnClick = (tag:string) => {
        updateValidBarberPages(page,true)
        updateAccountDetails('barberLevel',tag.toLowerCase())
    }

    return(
        <form className="flex flex-row gap-8 flex-wrap justify-center mx-auto">
            <BtnSelection type={'radio'} name={'radioExperience'} tag={'Student'} notes={['Looking to gain Experience']} click={btnClick}/>
            <BtnSelection type={'radio'} name={'radioExperience'} tag={'Professional'} notes={['Certified','Experienced']}  click={btnClick}/>
        </form>
    )
}