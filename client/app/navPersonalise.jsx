"use client"
import {useEffect, useState} from 'react'

export default function NavPersonalise({ethnicity, setEthnicity, experience, setExperience, barberLocation, setBarberLocation   }){
    // const [ currentSelected, setCurrentSelected ] = useState({personalise:{ethnicity:[], experience:[], barberLocation:[]}})


    return(
        <form className="bg-primrary flex flex-col items-center">
            <h3 className="mt-8 text-sm">Your</h3>
            <h2 className="mb-8">Hair Type/Style</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !ethnicity.includes('caucasian') ? setEthnicity([...ethnicity,'caucasian']) : setEthnicity(ethnicity.filter(item => item !== 'caucasian'))} type="checkbox" id="caucasian" name="caucasian" ></input>
                    <label className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="caucasian">
                        <h3 className="place-self-center font-semibold">Caucasian</h3>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !ethnicity.includes('asian') ? setEthnicity([...ethnicity,'asian']) : setEthnicity(ethnicity.filter(item => item !== 'asian'))} type="checkbox" id="asian" name="asian" ></input>
                    <label className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="asian">
                        <h3 className="place-self-center font-semibold">Asian</h3>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !ethnicity.includes('african') ? setEthnicity([...ethnicity,'african']) : setEthnicity(ethnicity.filter(item => item !== 'african'))} type="checkbox" id="african" name="african" ></input>
                    <label className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="african">
                        <h3 className="place-self-center font-semibold">African</h3>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !ethnicity.includes('hispanic/latino') ? setEthnicity([...ethnicity,'hispanic/latino']) : setEthnicity(ethnicity.filter(item => item !== 'hispanic/latino'))} type="checkbox" id="hispanic/latino" name="hispanic/latino" ></input>
                    <label className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="hispanic/latino">
                        <h3 className="place-self-center font-semibold">Hispanic/Latino</h3>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !ethnicity.includes('arab') ? setEthnicity([...ethnicity,'arab']) : setEthnicity(ethnicity.filter(item => item !== 'arab'))} type="checkbox" id="arab" name="arab" ></input>
                    <label className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="arab">
                        <h3 className="place-self-center font-semibold">Arab</h3>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !ethnicity.includes('southAsian') ? setEthnicity([...ethnicity,'southAsian']) : setEthnicity(ethnicity.filter(item => item !== 'southAsian'))} type="checkbox" id="southAsian" name="southAsian" ></input>
                    <label className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="southAsian">
                        <h3 className="place-self-center font-semibold">South Asian</h3>
                    </label>
                </div>
            </section>

            <h3 className="mt-8 text-sm">Barber</h3>
            <h2 className="mb-8">Experience</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
            <div className="flex flex-col-reverse">
                     <input onChange={()=> !experience.includes('student') ? setExperience([...experience,'student']) : setExperience(experience.filter(item => item !== 'student'))} type="checkbox" id="student" name="student" ></input>
                    <label style={{backgroundImage: `url("/clippr_student.png")`,backgroundSize:'cover'}} className="cursor-pointer nav-personalise-btn w-32 h-32 rounded-xl overflow-hidden flex flex-col gap-2 justify-center align-center mb-4 " htmlFor="student">
                        <h3 className="place-self-center text-white custom-text-shadow font-semibold">Student</h3>
                        <h3 className="place-self-center text-white custom-text-shadow font-semibold text-xs">Best Value</h3>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !experience.includes('pro') ? setExperience([...experience,'pro']) : setExperience(experience.filter(item => item !== 'pro'))} type="checkbox" id="pro" name="pro" ></input>
                    <label style={{backgroundImage: `url("/clippr_pro.png")`,backgroundSize:'cover'}} className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="pro">
                        <h3 className="place-self-center text-white custom-text-shadow font-semibold">Professional</h3>
                    </label>
                </div>
            </section>

            <h3 className="mt-8 text-sm">search by</h3>
            <h2 className="mb-8">Appointment Location</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !barberLocation.includes('bShop') ? setBarberLocation([...barberLocation,'bShop']) : setBarberLocation(barberLocation.filter(item => item !== 'bShop'))} type="checkbox" id="bShop" name="bShop" ></input>
                    <label  style={{backgroundImage: `url("/clippr_shop.png")`,backgroundSize:'cover'}}  className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center  justify-center items-center mb-4 " htmlFor="bShop">
                        <h3 className="place-self-center text-white custom-text-shadow  font-semibold">Barber Shop</h3>
                        <h3 className="place-self-center text-white custom-text-shadow  font-medium text-xs">Get the classic experience</h3>

                    </label>
                </div>
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !barberLocation.includes('bHome') ? setBarberLocation([...barberLocation,'bHome']) : setBarberLocation(barberLocation.filter(item => item !== 'bHome'))}  type="checkbox" id="bHome" name="bHome" ></input>
                    <label style={{backgroundImage: `url("/clippr_home.png")`,backgroundSize:'cover'}} className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center  justify-center items-cente mb-4" htmlFor="bHome">
                        <h3 className="place-self-center text-white custom-text-shadow  font-semibold">Barber Home</h3>
                        <h3 className="place-self-center text-white custom-text-shadow  font-medium text-xs">Unique and great value</h3>

                    </label>
                </div>
                <div className="flex flex-col-reverse">
                     <input onChange={()=> !barberLocation.includes('mobile') ? setBarberLocation([...barberLocation,'mobile']) : setBarberLocation(barberLocation.filter(item => item !== 'mobile'))}  type="checkbox" id="mobile" name="mobile" ></input>
                    <label style={{backgroundImage: `url("/clippr_mobile.png")`,backgroundSize:'cover'}} className="cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center justify-center items-center mb-4" htmlFor="mobile">
                        <h3 className="place-self-center text-white custom-text-shadow  font-semibold">Mobile</h3>
                        <h3 className="place-self-center text-white custom-text-shadow  font-medium text-xs">Arrange a cut from the comfort of your own home</h3>

                    </label>
                </div>
            </section>

        </form>
    )
}