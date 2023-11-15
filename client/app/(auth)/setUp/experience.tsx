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




{/* <div className="flex flex-col-reverse">
    <input type="checkbox" id="setStudent" name="setStudent" ></input>
    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 rounded-xl overflow-hidden flex flex-col gap-2 justify-center align-center mb-4" htmlFor="setStudent">
        <h3 className="place-self-center text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Student</h3>
        <h3 className="place-self-center text-white custom-text-shadow font-semibold text-xs z-10 pointer-events-none label-text">Best Value</h3>
        <div style={{backgroundImage: `url("/clippr_student.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
    </label>
</div>
<div className="flex flex-col-reverse">
    <input type="checkbox" id="setPro" name="setPro" ></input>
    <label  className="relative lg:bg-blend-lighten cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="setPro">
        <h3 className="place-self-center text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Professional</h3>
        <div style={{backgroundImage: `url("/clippr_pro.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
    </label>
</div> */}

{/* <section className="flex flex-row gap-8 flex-wrap justify-center">
<div className="flex flex-col-reverse">
    <input onChange={()=> !experience.includes('student') ? setExperience([...experience,'student']) : setExperience(experience.filter(item => item !== 'student'))} type="checkbox" id="student" name="student" ></input>
    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 rounded-xl overflow-hidden flex flex-col gap-2 justify-center align-center mb-4" htmlFor="student">
        <h3 className="place-self-center text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Student</h3>
        <h3 className="place-self-center text-white custom-text-shadow font-semibold text-xs z-10 pointer-events-none label-text">Best Value</h3>
        <div style={{backgroundImage: `url("/clippr_student.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
    </label>
</div>
<div className="flex flex-col-reverse">
    <input onChange={()=> !experience.includes('pro') ? setExperience([...experience,'pro']) : setExperience(experience.filter(item => item !== 'pro'))} type="checkbox" id="pro" name="pro" ></input>
    <label  className="relative lg:bg-blend-lighten cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="pro">
        <h3 className="place-self-center text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Professional</h3>
        <div style={{backgroundImage: `url("/clippr_pro.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
    </label>
</div>
</section> */}