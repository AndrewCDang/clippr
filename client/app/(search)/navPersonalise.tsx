import { useCallback, useEffect } from "react";
import BtnSelection from "../(components)/btnSelection";

type NavPersonaliseProps = {
    ethnicity: string[];
    setEthnicity: React.Dispatch<React.SetStateAction<string[]>>;
    experience: string[];
    setExperience: React.Dispatch<React.SetStateAction<string[]>>;
    barberLocation: string[];
    setBarberLocation: React.Dispatch<React.SetStateAction<string[]>>;
};



const LocationRadio = ({barberLocation, setBarberLocation, location, notes}:{barberLocation:string[], setBarberLocation:React.Dispatch<React.SetStateAction<string[]>>,location:string, notes:string}) => {
    const handler = (tag:string,checked:boolean) => {
            !barberLocation.includes(location) ? setBarberLocation([...barberLocation,location]) : setBarberLocation(barberLocation.filter(item => item !== location))
    }

    const Children = () => {
        return(
            <div className="flex flex-col-reverse">
                <div className="w-16 aspect-square rounded-lg object-cover overflow-hidden">
                    <img className="min-h-full object-cover" src={`/clippr_${location.replace(' ','_')}.jpg`}></img>
                </div>
            </div>
        )
    }
    return(
        <BtnSelection bg="bg-white/5" children={<Children/>} defaultChecked={barberLocation.includes(location)} type={'checkbox'} tag={location} click={handler} notes={notes} name="locationSearch"/>
    )
}

const EthnictyRadio = ({ethnicity, setEthnicity, ethnic}:{ethnicity:string[], setEthnicity:React.Dispatch<React.SetStateAction<string[]>>,ethnic:string}) => {
    const handler = (tag:string,checked:boolean) => {
        setTimeout(()=>{
            !ethnicity.includes(ethnic) ? setTimeout(()=>{setEthnicity([...ethnicity,ethnic])},0)  : setTimeout(()=>{setEthnicity(ethnicity.filter(item => item !== ethnic))},0) 
        },200)
    }

    const Children = () => {
        return(
            <div className="flex flex-col-reverse">
                <div className="w-16 aspect-square rounded-lg object-cover overflow-hidden">
                    <img className="min-h-full object-cover" src={`/clippr_${ethnic}.jpg`}></img>
                </div>
            </div>
        )
    }
    return(
        <BtnSelection bg="bg-white/5"  children={<Children/>} defaultChecked={ethnicity.includes(ethnic)} type={'checkbox'} tag={ethnic} click={handler} notes={'textured'} name="ethnictySearch"/>
    )
}

const NavPersonalise: React.FC<NavPersonaliseProps> = ({ethnicity, setEthnicity, barberLocation, setBarberLocation}) => {

    const SelectedEthnicities = useCallback(() => {
        const ethArray= ['caucasian','asian','afro']
        return(
            ethArray.map((item,i)=>{
                return(
                    <div key={i} className="w-full">
                        <EthnictyRadio ethnicity={ethnicity} setEthnicity={setEthnicity} ethnic={item} />
                    </div>
                )
            })
        )

    },[ethnicity])



    return(
        <form className="bg-primrary flex flex-col items-center">
            <h3 className="mt-4 md:mt-8 text-sm text-secondary-f">Your</h3>
            <h2 className="mb-4 md:mb-8 text-secondary-f">Hair Type(s)</h2>
            <section className="flex flex-row gap-4 flex-wrap justify-center">
                <SelectedEthnicities/>
            </section>
            <h3 className="mt-4 md:mt-8 text-sm text-secondary-f">search by</h3>
            <h2 className=" mb-4 md:mb-8 text-secondary-f">Appointment Location(s)</h2>
            <section className="flex flex-row gap-4 flex-wrap justify-center">
                <LocationRadio location={'Barber Shop'} barberLocation={barberLocation} setBarberLocation={setBarberLocation} notes="the classic"/>
                <LocationRadio location={'Barber Home'} barberLocation={barberLocation} setBarberLocation={setBarberLocation} notes="chill vibes"/>
                <LocationRadio location={'Customer Home'} barberLocation={barberLocation} setBarberLocation={setBarberLocation} notes="mobile barber"/>
            </section>

        </form>
    )
}

export default NavPersonalise
