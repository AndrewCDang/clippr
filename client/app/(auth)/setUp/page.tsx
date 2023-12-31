"use client"

import {Controller, useForm} from "react-hook-form"
import { useRouter } from "next/navigation";
import "@/app/(components)/boolean.css"
import { useEffect, useState, useRef } from "react";
import {Button} from "@/app/(components)/button"
import Ethnicity from "./ethnicity";
import Experience from "./experience";
import Location from "./location";
import BarberCuts from "./barberCuts";
import Address from "./address";
import autoAnimate from '@formkit/auto-animate'
import Confirm from "./confirm";
import { error } from "console";
import { UserDetails } from "./setUpTypes";
import Images from "./images";
import ProfilePicture from "./profilePicture"
import { useProfilePicture } from "@/app/(hooks)/useProfilePicture";

export default function SetUp(){
    const router = useRouter()

    const [accountType, setAccountType] = useState('user')
    const [ page, setPage ] = useState<number>(0)
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [confirmBtn, setConfirmBtn] = useState<string>('Confirm')
    const {setProfilePicture} = useProfilePicture()


    const parent = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
        progressRef.current && autoAnimate(progressRef.current)
    }, [parent, progressRef])

    const submitDetails = async(userDetails:UserDetails) => {
        setLoadingState(true)
        const formData = new FormData()
        formData.append('userDetails',JSON.stringify(userDetails))
        console.log(userDetails.imageUploads)
        userDetails.imageUploads.forEach((file,index)=>{
            formData.append(`imageUploads`,file)
        })

        formData.append('profilePicture', userDetails.profilePicture)

        const res = await fetch('/api/setUp',{
            method:"POST",
            body:formData
        })

        const json = await res.json()

        if(json.error){
            console.log(json.error)
        }else{
            console.log(json)
            setLoadingState(false)
            setConfirmBtn('Success')
            setTimeout(() => {
                setProfilePicture(json.profilePic.response)
                router.push('/')
            }, 300);
        }
        

    }

    const clickHandler = () => {
        if(accountType==='barber'){
            page === titles.barbers.length-1 ? submitDetails(userDetails) : setPage(prevState => prevState + 1)
        }else{
            page === titles.customers.length-1 ? submitDetails(userDetails) : setPage(prevState => prevState + 1)
        }
    }

    const clickedBack = () => {
        if(page>=0){
            setPage(prevState => prevState - 1)
        }
    }

    const titles = {barbers:['Are you a Customer or a Barber?','What level best describes you?', 'What ethnic hair-type can you cut?', 'List your hair cut services','Show off your skills. Upload images of past cuts', "Upload a profile picture", 'Where will appointments take place?', `Appointment address`, 'Confirm'],
    customers:['Are you a Customer or a Barber?','What hair-type(s) matches you?', 'What is your home-address?', "Upload a profile picture", 'Confirm']}

    const [ validBarberPages, setValidBarberPages ] = useState([...Array(titles.barbers.length)].map((item,i)=>{
        if(i===0 || i === titles.barbers.length-1){
            return true
        }else{
            return false
        }
    }))

    const [ validUserPages, setValidUserPages ] = useState([...Array(titles.customers.length)].map((item,i)=>{
        if(i===0 || i === titles.customers.length-1){
            return true
        }else{
            return false
        }
    }))

    const updateValidUserPages = (page:number,boolean:boolean) => {
        setValidUserPages((prevValidPages) => {
            const newValidArray = [...prevValidPages];
            newValidArray[page] = boolean;
            return newValidArray;
        });
    }

    const updateValidBarberPages = (page:number,boolean:boolean) => {
        setValidBarberPages((prevValidPages) => {
            const newValidArray = [...prevValidPages];
            newValidArray[page] = boolean;
            return newValidArray;
        });
    }

    const [appointmentLocation, setAppointmentLocation ] = useState<string>('')

    const [userDetails, setUserDetails] = useState<UserDetails>({accountType:'customer',barberLevel:'',ethnicType:[],hairServices:[{cutName:'',cutPrice:0,cutDuration:0, objectId:0}],appointmentLocation:'', imageUploads:[], profilePicture:'', userAddress:{studio:'', addressline1:'', addressline2:'', addressline3:'',city:'',postcode:''}})

    const updateAccountDetails = (object:string,value:any) => {
        switch (object) {
            case 'barberLevel':
                setUserDetails({...userDetails, barberLevel:value})
                break;
            case 'ethnicType':
                setUserDetails({...userDetails, ethnicType:value})
                break;
            case 'hairServices':
                setUserDetails({...userDetails, hairServices:value})
                break;
            case 'appointmentLocation':
                setUserDetails({...userDetails, appointmentLocation:value})
                break;
            case 'userAddress':
                setUserDetails({...userDetails, userAddress:value})
                break;
            case 'imageUploads':
                setUserDetails({...userDetails, imageUploads:value})
                break;
            case 'profilePicture':
                setUserDetails({...userDetails, profilePicture:value})
            default:
                break;
        }
    }
    useEffect(()=>{
        console.log(userDetails)
    },[userDetails])

    return(
        <main className="w-full flex flex-col justify-between flex-1">
            <h2 className='mx-auto text-center'>{ accountType === 'user' ? titles.customers[page] : titles.barbers[page]}</h2>
            <div ref={progressRef} className={`flex flex-row flex-nowrap mt-4 ${ accountType == 'barber' && page >= titles.barbers.length-1 || accountType == 'user' && page >= titles.customers.length-1 ? 'gap-0' : 'gap-1'} h-2 transition-gap duration-200`}>
                {accountType === 'user' ? titles.customers.map((item, i)=>{
                    if(i !== titles.customers.length-1) {return (<span key={i} className={`flex-1 relative bg-light-2 ${ accountType == 'user' && page >= titles.customers.length-1 ? '-skew-x-0 h-1 ' : 'overflow-hidden -skew-x-12 '} transition-all duration-200`}>
                    <span className={`absolute w-full ${ accountType == 'user' && page >= titles.customers.length-1 ? 'h-1' : 'h-2'} bg-secondary ${ page >= i ? 'left-0' : 'left-[-100%]' } transition-left duration-300`}></span>
                    </span>)}
                }) : titles.barbers.map((item, i)=>{
                    if(i !== titles.barbers.length-1) {return (<span key={i} className={`flex-1 relative bg-light-2 ${ accountType == 'barber' && page >= titles.barbers.length-1 ? '-skew-x-0 h-1' : 'overflow-hidden -skew-x-12 '} transition-all duration-200`}>
                        <span className={`absolute w-full ${ accountType == 'barber' && page >= titles.barbers.length-1 ? 'h-1' : 'h-2'} bg-secondary ${ page >= i ? 'left-0' : 'left-[-100%]' } transition-all duration-200`}></span>
                    </span>)}
                })}
            </div>
            <section className=" flex flex-col justify-center relative flex-1">
                <fieldset style={{left:`${0 - (page*100)}%`}} className='mt-0.5 absolute  w-full z-10'>
                    <div className="boolean-toggle">
                        <input onChange={e=>{setAccountType('user'); setUserDetails((prevState)=>({...prevState, accountType:'customer'}))}}  id="user-label"  type="radio" name="user" value="user" checked={accountType==='user'}/>
                        <label htmlFor="user-label"><strong>Customer</strong> <br></br><span className='text-sm'>I want my hair cut</span></label>
                        <input onChange={e=>{setAccountType('barber'); setUserDetails((prevState)=>({...prevState, accountType:'barber'}));}} id="barber-label" type="radio" name="barber" value="barber" checked={accountType==='barber'}/>
                        <label htmlFor="barber-label"><strong>Barber</strong><br></br><span className='text-sm'>I cut hair</span></label>
                    </div>
                </fieldset>
                {accountType=='barber' && 
                <section style={{left: page > 0 ? `0%`:'100%', transition:'all 0.2s '}}  className="absolute w-full h-full">
                    <section className="relative text-center h-full">
                        <div style={{left:`${100 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full h-full text-center flex items-center`}>
                            <Experience page={page} updateValidBarberPages={updateValidBarberPages} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${200 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex flex-col justify-center`}>
                            <Ethnicity page={page} updateValidBarberPages={updateValidBarberPages} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${300 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex flex-col justify-center`}>
                            <BarberCuts page={page} updateValidBarberPages={updateValidBarberPages} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${400 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex flex-col justify-center`}>
                            <Images page={page} updateValidBarberPages={updateValidBarberPages} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${500 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex flex-col justify-center`}>
                            <ProfilePicture page={page} updateValidBarberPages={updateValidBarberPages} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${600 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex content-center`}>
                            <Location page={page} updateValidBarberPages={updateValidBarberPages} setAppointmentLocation={setAppointmentLocation} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${700 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex items-center`}>
                            <Address page={page} updateValidBarberPages={updateValidBarberPages} appointmentLocation={appointmentLocation} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${800 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex content-center`}>
                            <Confirm userDetails={userDetails}/>
                        </div>
                    </section>
                </section>
                }
                {accountType=='user' && 
                <section className="absolute w-full h-full">
                    <section className="relative w-full h-full">
                        <div style={{left:`${100 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full h-full mx-auto flex items-center text-center`}>
                            <Ethnicity page={page} updateValidBarberPages={updateValidUserPages} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${200 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full h-full mx-auto flex items-center text-center`}>
                            <Address page={page} updateValidBarberPages={updateValidUserPages} appointmentLocation={appointmentLocation} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${300 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex flex-col justify-center`}>
                            <ProfilePicture page={page} updateValidBarberPages={updateValidUserPages} updateAccountDetails={updateAccountDetails}/>
                        </div>
                        <div style={{left:`${400 - (page*100)}%`, transition:'all 0.2s '}} className={`absolute w-full text-center h-full flex flex-col justify-center`}>
                            <Confirm userDetails={userDetails}/>
                        </div>
                    </section>
                </section>
                }
            </section>
            <div ref={parent} className="flex justify-center gap-2 mb-16">
                { page>0 && <Button text="Back" clicked={clickedBack} customFit={true}/>}
                {accountType === 'barber' ? <Button disabled={!validBarberPages[page]?true:false} text={`${page === titles.barbers.length-1 ? confirmBtn : 'Next'}`} clicked={clickHandler} customFit={true} loading={loadingState}/> : <Button disabled={!validUserPages[page]?true:false} text={`${page === titles.customers.length-1 ? 'Confirm' : 'Next'}`} clicked={clickHandler} customFit={true} loading={loadingState}/>}
            </div>
        </main>
        
    )

}
