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
            <h2 className="mb-8">Hair Type(s)</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('caucasian') ? setEthnicity([...ethnicity,'caucasian']) : setEthnicity(ethnicity.filter(item => item !== 'caucasian'))} type="checkbox" id="caucasian" name="caucasian" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="caucasian">
                        <div className="flex flex-col self-end mb-2 ">
                            <h3 className="place-self-center font-semibold text-white custom-text-shadow z-10 pointer-events-none label-text leading-none">Caucasian</h3>
                            <h3 className="place-self-center font-light text-white text-sm custom-text-shadow z-10 pointer-events-none label-text leading-none">textured</h3>
                        </div>
                        <div style={{backgroundImage: `url("/clippr_white.jpg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('asian') ? setEthnicity([...ethnicity,'asian']) : setEthnicity(ethnicity.filter(item => item !== 'asian'))} type="checkbox" id="asian" name="asian" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="asian">
                        <div className="flex flex-col self-end mb-2 ">
                            <h3 className="place-self-center font-semibold text-white custom-text-shadow z-10 pointer-events-none label-text leading-none">Asian</h3>
                            <h3 className="place-self-center font-light text-white text-sm custom-text-shadow z-10 pointer-events-none label-text leading-none">textured</h3>
                        </div>                        
                        <div style={{backgroundImage: `url("/clippr_asian.jpeg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>

                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !ethnicity.includes('afro') ? setEthnicity([...ethnicity,'afro']) : setEthnicity(ethnicity.filter(item => item !== 'afro'))} type="checkbox" id="afro" name="afro" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="afro">
                        <div className="flex flex-col self-end mb-2 ">
                            <h3 className="place-self-center font-semibold text-white custom-text-shadow z-10 pointer-events-none label-text leading-none">Afro</h3>
                            <h3 className="place-self-center font-light text-white text-sm custom-text-shadow z-10 pointer-events-none label-text leading-none">textured</h3>
                        </div>
                        <div style={{backgroundImage: `url("/clippr_black.jpg")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                        
                    </label>
                </div>
            </section>

            <h3 className="mt-8 text-sm">Barber</h3>
            <h2 className="mb-8">Experience(s)</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !experience.includes('student') ? setExperience([...experience,'student']) : setExperience(experience.filter(item => item !== 'student'))} type="checkbox" id="student" name="student" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 rounded-xl overflow-hidden flex flex-col gap-2 justify-center align-center mb-4" htmlFor="student">
                        <div className="absolute flex flex-col bottom-0 w-full text-center mb-2 ">
                            <h3 className="place-self-center font-semibold text-white custom-text-shadow z-10 pointer-events-none label-text leading-none">Student</h3>
                            <h3 className="place-self-center font-light text-white text-sm custom-text-shadow z-10 pointer-events-none label-text leading-none">Cheaper Cuts</h3>
                        </div>
                        <div style={{backgroundImage: `url("/clippr_student.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                    
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !experience.includes('pro') ? setExperience([...experience,'pro']) : setExperience(experience.filter(item => item !== 'pro'))} type="checkbox" id="pro" name="pro" ></input>
                    <label  className="relative lg:bg-blend-lighten cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex justify-center align-center mb-4" htmlFor="pro">
                        <div className="absolute flex flex-col bottom-0 w-full text-center mb-2 ">
                            <h3 className="place-self-center font-semibold text-white custom-text-shadow z-10 pointer-events-none label-text leading-none">Professional</h3>
                            <h3 className="place-self-center font-light text-white text-sm custom-text-shadow z-10 pointer-events-none label-text leading-none">Best Cut</h3>
                        </div>                        
                        <div style={{backgroundImage: `url("/clippr_pro.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
            </section>

            <h3 className="mt-8 text-sm">search by</h3>
            <h2 className="mb-8">Appointment Location(s)</h2>
            <section className="flex flex-row gap-8 flex-wrap justify-center">
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !barberLocation.includes('bShop') ? setBarberLocation([...barberLocation,'bShop']) : setBarberLocation(barberLocation.filter(item => item !== 'bShop'))} type="checkbox" id="bShop" name="bShop" ></input>
                    <label  className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center  justify-center items-center mb-4 " htmlFor="bShop">
                        <div className="absolute flex flex-col bottom-0 w-full text-center mb-2 ">
                            <h3 className="place-self-center font-semibold text-white custom-text-shadow z-10 pointer-events-none label-text leading-none">Barber Shop</h3>
                            <h5 className="place-self-center font-light text-white text-sm custom-text-shadow z-10 pointer-events-none label-text leading-none">Classic Experience</h5>
                        </div>
                        <div style={{backgroundImage: `url("/clippr_shop.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !barberLocation.includes('bHome') ? setBarberLocation([...barberLocation,'bHome']) : setBarberLocation(barberLocation.filter(item => item !== 'bHome'))}  type="checkbox" id="bHome" name="bHome" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center  justify-center items-cente mb-4" htmlFor="bHome">
                        <div className="absolute flex flex-col bottom-0 w-full text-center mb-2 ">
                            <h3 className="place-self-center font-semibold text-white custom-text-shadow z-10 pointer-events-none label-text leading-none">Barber Home</h3>
                            <h5 className="place-self-center font-light text-white text-sm custom-text-shadow z-10 pointer-events-none label-text leading-none">Chill Vibes</h5>
                        </div>                        <div style={{backgroundImage: `url("/clippr_home.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
                <div className="flex flex-col-reverse">
                    <input onChange={()=> !barberLocation.includes('mobile') ? setBarberLocation([...barberLocation,'mobile']) : setBarberLocation(barberLocation.filter(item => item !== 'mobile'))}  type="checkbox" id="mobile" name="mobile" ></input>
                    <label className="relative cursor-pointer nav-personalise-btn w-32 h-32 bg-light-3 rounded-xl overflow-hidden flex flex-col text-center justify-center items-center mb-4" htmlFor="mobile">
                        <div className="absolute flex flex-col bottom-0 w-full text-center mb-2 ">
                            <h3 className="place-self-center font-semibold text-white custom-text-shadow z-10 pointer-events-none label-text leading-none">Mobile Barbers</h3>
                            <h5 className="place-self-center font-light text-white text-sm custom-text-shadow z-10 pointer-events-none label-text leading-none">Appointment at your home</h5>
                        </div>
                        <div style={{backgroundImage: `url("/clippr_mobile.png")`,backgroundSize:'cover'}} className="absolute w-full h-full z-0 brightness-[0.95] label-img"></div>
                    </label>
                </div>
            </section>

        </form>
    )
}

export default NavPersonalise