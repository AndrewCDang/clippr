"use client"
import { UserDetails } from "./setUpTypes";

import { useEffect } from "react"

type ConfirmProps = {
    userDetails:UserDetails
}

const firstCharUpperCase = (string:string) => {
    if(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}

// {accountType:'customer',barberLevel:'',ethnicType:'',hairServices:'',appointmentLocation:'', userAddress:''})
function Confirm({userDetails}:ConfirmProps) {

    useEffect(()=>{
        console.log(userDetails)
    },[userDetails])
    return (
        userDetails.accountType === 'barber' ? 
            <table className="w-full h-full flex flex-col items-center justify-center py-8">
                <tbody className="rounded-lg border border-light-2 overflow-y-scroll vScroll">
                    <tr className="">
                        <th className="border border-t-0 border-l-0 p-4">Account Type</th>
                        <td className="border border-t-0 border-r-0 pl-4 text-left">{firstCharUpperCase(userDetails.accountType)}</td>
                    </tr>
                    <tr className="">
                        <th className="border border-l-0  p-4">Barber Level</th>
                        <td className="border border-r-0  pl-4 text-left ">{firstCharUpperCase(userDetails.barberLevel)}</td>
                    </tr>
                    <tr className="">
                        <th className="border border-l-0  p-4">Ethnic Hair Expertise</th>
                        <td className="border border-r-0  p-4">
                            <ul className="text-left flex flex-col gap-1">
                                {userDetails.ethnicType?.map((item,i)=>{return <li key={i} className="border px-1 py-0.5 rounded-lg">{item}</li>})}
                            </ul>
                        </td>
                    </tr>
                    <tr className="">
                        <th className="border border-l-0  p-4">Hair Cut Services</th>
                        <td className="border border-r-0  p-4">
                            <ul className=" flex flex-col gap-1 text-left">
                                {userDetails.hairServices?.map((item,i)=>{return(
                                    <div key={i} className="flex gap-3">
                                        <h3 className="border px-1 py-0.5 rounded-lg">{firstCharUpperCase(item.cutName)}<span className="border-l border-light-2 mx-2"></span>{item.cutPrice}mins<span className="border-l border-light-2 mx-2"></span>£{item.cutPrice}</h3>
                                    </div>
                                )})}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th className="border border-l-0  p-4">Image Uploads</th>
                        <td className="border-r-0 p-4 flex  border-0 overflow-auto gap-1 max-w-[200px]">
                        {userDetails.imageUploads.map((item, index) => (
                            <div key={item.name} className="mx-auto border-0 flex-shrink-0 ">
                            <img
                                src={URL.createObjectURL(item)}
                                alt={item.name}
                                className='flex-shrink-0 z-10 rounded-lg overflow-hidden w-14 h-14  object-cover select-none pointer-events-none'
                            />
                            </div>
                        ))}
                        </td>
                    </tr>
                    <tr className="">
                        <th className="border border-l-0  p-4">Appointment Location</th>
                        <td className="border border-r-0  pl-4">
                            <h3 className="text-left">{firstCharUpperCase(userDetails.appointmentLocation)}</h3>
                        </td>
                    </tr>
                    <tr className="">
                        <th className="border border-l-0 border-b-0 p-4">Appointment Address</th>
                        <td className="border border-r-0 border-b-0 p-4">
                            <ul className="flex flex-col text-left">
                                <li>{firstCharUpperCase(userDetails.userAddress.studio)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.addressline1)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.addressline2)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.addressline3)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.city)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.postcode)}</li>
                            </ul>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            :
            <table className="w-full h-full flex flex-col items-center justify-center">
                <tbody className="rounded-lg border border-light-2">
                    <tr className="">
                        <th className="border border-t-0 border-l-0 p-4">Account Type</th>
                        <td className="border border-t-0 border-r-0 pl-4 text-left">{firstCharUpperCase(userDetails.accountType)}</td>
                    </tr>
                    <tr className="">
                        <th className="border border-l-0  p-4">User Ethnic Hair Type</th>
                        <td className="border border-r-0  p-4">
                            <ul className="text-left flex flex-col gap-1">
                                {userDetails.ethnicType?.map((item,i)=>{return <li key={i} className="w-min border px-1 py-0.5 rounded-lg">{item}</li>})}
                            </ul>
                        </td>
                    </tr>
                    <tr className="">
                        <th className="border border-l-0 border-b-0 p-4">User Address</th>
                        <td className="border border-r-0 border-b-0 p-4">
                            <ul className="flex flex-col text-left">
                                <li>{firstCharUpperCase(userDetails.userAddress.studio)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.addressline1)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.addressline2)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.addressline3)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.city)}</li>
                                <li>{firstCharUpperCase(userDetails.userAddress.postcode)}</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>

    )
}

export default Confirm