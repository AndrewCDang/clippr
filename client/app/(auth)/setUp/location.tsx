"use client"
import { useState, Dispatch, SetStateAction } from "react"
import BtnSelection from "@/app/(components)/btnSelection"

type LocationProps={
    page:number;
    updateValidBarberPages:Function;
    setAppointmentLocation:Dispatch<SetStateAction<string>>;
    updateAccountDetails:Function;
}

export default function Location({page,updateValidBarberPages,setAppointmentLocation, updateAccountDetails}:LocationProps){
    
    const btnClick = (tag:string) => {
        updateValidBarberPages(page,true)
        setAppointmentLocation(tag)
        updateAccountDetails('appointmentLocation',tag)
    }
    

    return(
    <section className="grid auto-cols-auto gap-8 justify-center mx-auto my-auto">
        <BtnSelection type={'radio'} name={'radioLocation'} tag={'Studio'} notes={['Appointment at BarberShop']}  click={btnClick}/>
        <BtnSelection type={'radio'} name={'radioLocation'} tag={'Home'} notes={['Appointment at barber house']} click={btnClick}/>
        <BtnSelection type={'radio'} name={'radioLocation'} tag={'Mobile'} notes={['Appointment at customer house']} click={btnClick}/>



    </section>
    )
}


{/* <div className="flex flex-col-reverse">
<input type="checkbox" id="bShop" name="bShop" ></input>
<label  className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center  justify-center items-center mb-4 " htmlFor="bShop">
    <h3 className="place-self-center text-white custom-text-shadow  font-semibold z-10 pointer-events-none label-text ">Barber Shop</h3>
    <h3 className="place-self-center text-white custom-text-shadow  font-medium text-xs z-10 pointer-events-none label-text">Get the classic experience</h3>
    <div style={{backgroundImage: `url("/clippr_shop.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
</label>
</div>
<div className="flex flex-col-reverse">
<input type="checkbox" id="bHome" name="bHome" ></input>
<label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center  justify-center items-cente mb-4" htmlFor="bHome">
    <h3 className="place-self-center text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Barber Home</h3>
    <h3 className="place-self-center text-white custom-text-shadow font-medium text-xs z-10 pointer-events-none label-text">Unique and great value</h3>
    <div style={{backgroundImage: `url("/clippr_home.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
</label>
</div>
<div className="flex flex-col-reverse">
<input type="checkbox" id="mobile" name="mobile" ></input>
<label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center justify-center items-center mb-4" htmlFor="mobile">
    <div className="place-self-center z-10 label-text pointer-events-none">
        <h3 className="text-white custom-text-shadow  font-semibold z-10 pointer-events-none ">Mobile</h3>
        <h3 className="text-white custom-text-shadow  font-medium text-xs z-10 pointer-events-none ">Arrange a cut from the comfort of your own home</h3>
    </div>
    <div style={{backgroundImage: `url("/clippr_mobile.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
</label>
</div> */}

{/* <section className="flex flex-row gap-8 flex-wrap justify-center">
<div className="flex flex-col-reverse">
    <input onChange={()=> !barberLocation.includes('bShop') ? setBarberLocation([...barberLocation,'bShop']) : setBarberLocation(barberLocation.filter(item => item !== 'bShop'))} type="checkbox" id="bShop" name="bShop" ></input>
    <label  className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center  justify-center items-center mb-4 " htmlFor="bShop">
        <h3 className="place-self-center text-white custom-text-shadow  font-semibold z-10 pointer-events-none label-text ">Barber Shop</h3>
        <h3 className="place-self-center text-white custom-text-shadow  font-medium text-xs z-10 pointer-events-none label-text">Get the classic experience</h3>
        <div style={{backgroundImage: `url("/clippr_shop.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
    </label>
</div>
<div className="flex flex-col-reverse">
    <input onChange={()=> !barberLocation.includes('bHome') ? setBarberLocation([...barberLocation,'bHome']) : setBarberLocation(barberLocation.filter(item => item !== 'bHome'))}  type="checkbox" id="bHome" name="bHome" ></input>
    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center  justify-center items-cente mb-4" htmlFor="bHome">
        <h3 className="place-self-center text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Barber Home</h3>
        <h3 className="place-self-center text-white custom-text-shadow font-medium text-xs z-10 pointer-events-none label-text">Unique and great value</h3>
        <div style={{backgroundImage: `url("/clippr_home.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
    </label>
</div>
<div className="flex flex-col-reverse">
    <input onChange={()=> !barberLocation.includes('mobile') ? setBarberLocation([...barberLocation,'mobile']) : setBarberLocation(barberLocation.filter(item => item !== 'mobile'))}  type="checkbox" id="mobile" name="mobile" ></input>
    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center justify-center items-center mb-4" htmlFor="mobile">
        <div className="place-self-center z-10 label-text pointer-events-none">
            <h3 className="text-white custom-text-shadow  font-semibold z-10 pointer-events-none ">Mobile</h3>
            <h3 className="text-white custom-text-shadow  font-medium text-xs z-10 pointer-events-none ">Arrange a cut from the comfort of your own home</h3>
        </div>
        <div style={{backgroundImage: `url("/clippr_mobile.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
    </label>
</div>
</section> */}
