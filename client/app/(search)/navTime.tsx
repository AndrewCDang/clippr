"use client"
import {useEffect, useState} from 'react'
import './nav.css'
import { BookingTime } from '../types/barberTypes'


type NavSearchProps = {
    timeAllDay: string;
    setTimeAllDay:React.Dispatch<React.SetStateAction<string>>;
    bookingTime: BookingTime;
    setBookingTime: React.Dispatch<React.SetStateAction<BookingTime>>;
    navHeightToggle: (action:string)=>void;
}

const NavSearch: React.FC<NavSearchProps> = ({ timeAllDay, setTimeAllDay, bookingTime, setBookingTime, navHeightToggle}) => {

    const [range, setRange] = useState(0)


    return(
        <section>
            <fieldset className='mt-0.5'>
            <h2 className='mx-auto text-center'>Are you available at time of the day?</h2>
                <div className="time-toggle">
                    <input onChange={e=> {setTimeAllDay(e.target.value);setTimeout(()=>{navHeightToggle('time')})}} type="radio" name="sizeBy" value="yes" id="yes-label" checked={timeAllDay === 'yes'}/>
                    <label htmlFor="yes-label"><strong>Yes</strong> <br></br><span className='text-sm'>show me all available times throughout day</span></label>
                    <input onChange={e=> {setTimeAllDay(e.target.value);setTimeout(()=>{navHeightToggle('time')})}} type="radio" name="sizeBy" value="no" id="no-label" checked={timeAllDay === 'no'} />
                    <label htmlFor="no-label"><strong>No</strong><br></br><span className='text-sm'>show me selected times only</span></label>
                </div>
            </fieldset>
            <div style={{display: timeAllDay === 'yes' ? 'none' : 'flex'}} className="flex-col flex items-center gap-4">
                <span className='flex w-full h-2 border-light-2 border-t-[1px]'></span>
                <h2 className="">Appointment Time</h2>
                <section className="flex flex-row items-center custom-shadow text-4xl pb-1 p-3 rounded-xl">
                    <div className="relative">
                        <input onChange={(e)=>setBookingTime({...bookingTime,time:{hr:parseInt(e.target.value), min:bookingTime.time.min}})} className="w-16 disable-num " id="hour" placeholder="00" onKeyDown={(evt) => {["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault(); 
                        if(evt.key === '0' && (evt.target as HTMLInputElement).value.length === 0 ){
                            evt.preventDefault()
                        };
                        if(parseInt(`${(evt.target as HTMLInputElement).value}${evt.key}`) >= 25){
                            if(evt.key === '0'){
                                (evt.target as HTMLInputElement).value=''
                            }else{
                                (evt.target as HTMLInputElement).value=evt.key
                            }
                            evt.preventDefault()
                        };
                        if((evt.target as HTMLInputElement).value.length >= 2){
                            (evt.target as HTMLInputElement).value=evt.key
                            evt.preventDefault()
                        }
                    }} type="number"></input>
                        <label form="hour" className="text-xs text-light absolute left-[50%] top-[-30%] translate-x-[-50%] ">hr</label>
                    </div>
                    <span>
                        :
                    </span>
                    <div className="relative">
                        <input onChange={(e)=>setBookingTime({...bookingTime,time:{min:parseInt(e.target.value), hr:bookingTime.time.hr}})} className="w-16 disable-num " id="hour" placeholder="00" onKeyDown={(evt) => {["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault(); 
                            if(+(`${(evt.target as HTMLInputElement).value}${evt.key}`) >= 60){
                                if(evt.key === '0'){
                                    (evt.target as HTMLInputElement).value=''
                                }else{
                                    (evt.target as HTMLInputElement).value=evt.key
                                }
                                evt.preventDefault()
                            };
                            if((evt.target as HTMLInputElement).value.length >= 2){
                                (evt.target as HTMLInputElement).value=evt.key
                                evt.preventDefault()
                            }
                        }} type="number"></input>
                        <label form="minute" className="text-xs text-light absolute left-[50%] top-[-30%] translate-x-[-50%] ">min</label>
                    </div>
                </section>
                <h3 className="">Range</h3>
                <section className="flex-row flex gap-2 mb-4">
                    <button onClick={()=>{setRange(0); setBookingTime({...bookingTime,range:0.5})}} style={{backgroundColor: range === 0 ? 'rgb(211, 211, 211)' : undefined, borderColor: range === 0 ? 'rgb(211, 211, 211)' : undefined, transition:'all 0.2s ease-in-out'}} className="text-lg border border-light p-1 rounded-xl">+- 30<span className="text-xs">mins</span></button>
                    <button onClick={()=>{setRange(1); setBookingTime({...bookingTime,range:1})}} style={{backgroundColor: range === 1 ? 'rgb(211, 211, 211)' : undefined, borderColor: range === 1 ? 'rgb(211, 211, 211)' : undefined, transition:'all 0.2s ease-in-out'}} className="text-lg border border-light p-1 rounded-xl">+- 1<span className="text-xs">hr</span></button>
                    <button onClick={()=>{setRange(2); setBookingTime({...bookingTime,range:2})}} style={{backgroundColor: range === 2 ? 'rgb(211, 211, 211)' : undefined, borderColor: range === 2 ? 'rgb(211, 211, 211)' : undefined,  transition:'all 0.2s ease-in-out'}} className="text-lg border border-light p-1 rounded-xl">+- 2<span className="text-xs">hr</span></button>
                    {/* <button onClick={()=>{setRange(-1); ; setBookingTime({...bookingTime,range:-1})} } style={{backgroundColor: range === -1 ? 'rgb(211, 211, 211)' : undefined, borderColor: range === 3 ? 'white' : undefined}} className="text-lg border border-light p-1 rounded-xl"><span className="text-xs">Free all day</span></button> */}
                </section>
            </div>
        </section>
    )
}

export default NavSearch