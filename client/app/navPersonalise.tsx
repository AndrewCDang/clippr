type NavPersonaliseProps = {
    ethnicity: string[];
    setEthnicity: React.Dispatch<React.SetStateAction<string[]>>;
    experience: string[];
    setExperience: React.Dispatch<React.SetStateAction<string[]>>;
    barberLocation: string[];
    setBarberLocation: React.Dispatch<React.SetStateAction<string[]>>;
};

const NavPersonalise: React.FC<NavPersonaliseProps> = ({ethnicity, setEthnicity, experience, setExperience, barberLocation, setBarberLocation}) => {
    return(
        <form className="bg-primrary flex flex-col items-center personalise-input">
            <h3 className="mt-8 text-sm">Your</h3>
            <h2 className="mb-8">Hair Type/Style</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('caucasian') ? setEthnicity([...ethnicity,'caucasian']) : setEthnicity(ethnicity.filter(item => item !== 'caucasian'))} type="checkbox" id="caucasian" name="caucasian" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="caucasian">
                        <h3 className="place-self-center font-semibold text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">White</h3>
                        <div style={{backgroundImage: `url("/clippr_white.jpg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('asian') ? setEthnicity([...ethnicity,'asian']) : setEthnicity(ethnicity.filter(item => item !== 'asian'))} type="checkbox" id="asian" name="asian" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="asian">
                        <h3 className="place-self-center font-semibold text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text ">Asian</h3>
                        <div style={{backgroundImage: `url("/clippr_asian.jpeg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>

                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('african') ? setEthnicity([...ethnicity,'african']) : setEthnicity(ethnicity.filter(item => item !== 'african'))} type="checkbox" id="african" name="african" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="african">
                        <h3 className="place-self-center font-semibold text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Black</h3>
                        <div style={{backgroundImage: `url("/clippr_black.jpg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                        
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('hispanic/latino') ? setEthnicity([...ethnicity,'hispanic/latino']) : setEthnicity(ethnicity.filter(item => item !== 'hispanic/latino'))} type="checkbox" id="hispanic/latino" name="hispanic/latino" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="hispanic/latino">
                        <h3 className="place-self-center font-semibold text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Hispanic/Latino</h3>
                        <div style={{backgroundImage: `url("/clippr_hispanic.jpeg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('arab') ? setEthnicity([...ethnicity,'arab']) : setEthnicity(ethnicity.filter(item => item !== 'arab'))} type="checkbox" id="arab" name="arab" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="arab">
                        <h3 className="place-self-center font-semibold text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">Arab</h3>
                        <div style={{backgroundImage: `url("/clippr_arab.jpg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('southAsian') ? setEthnicity([...ethnicity,'southAsian']) : setEthnicity(ethnicity.filter(item => item !== 'southAsian'))} type="checkbox" id="southAsian" name="southAsian" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="southAsian">
                        <h3 className="place-self-center font-semibold text-white custom-text-shadow font-semibold z-10 pointer-events-none label-text">South Asian</h3>
                        <div style={{backgroundImage: `url("/clippr_s-asian.jpg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
            </section>

            <h3 className="mt-8 text-sm">Barber</h3>
            <h2 className="mb-8">Experience</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
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
            </section>

            <h3 className="mt-8 text-sm">search by</h3>
            <h2 className="mb-8">Appointment Location</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
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
            </section>

        </form>
    )
}

export default NavPersonalise