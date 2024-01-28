"use client"

import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'

type CountdownTypes = {
    cutTime:string[] | undefined;
    cutDate:string | undefined;
}

function Countdown({cutTime,cutDate}:CountdownTypes) {
    const router = useRouter()

    const [days, setDays] = useState<number>()
    const [hours, setHours] = useState<number>()
    const [mins, setMins] = useState<number>()
    const [secs, setSecs] = useState<number>()

    const cutDateStart = cutDate
    const cutTimeStart = cutTime?.[0].split('-')[0]

    useEffect(()=>{
        if(cutDateStart && cutTimeStart){
            const setHour = +cutTimeStart.split(':')[0]
            const setMinutes = +cutTimeStart.split(':')[1]
    
    
            const appointmentDate = new Date(cutDateStart)
            appointmentDate.setHours(setHour)
            appointmentDate.setMinutes(setMinutes)
    
    
            const currentDate = new Date()
            
            const timeDifference = appointmentDate.getTime() - currentDate.getTime()
            const daysUntil = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hoursUntil = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minsUntil = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const secsUntil = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
            setDays(daysUntil)
            setHours(hoursUntil)
            setMins(minsUntil)
            setSecs(secsUntil)            
        }
    },[])

    function updateSeconds() {
        setSecs(prevSecs => {
            if (prevSecs && prevSecs > 0) {
                return prevSecs - 1;
            } else {
                updateMinutes();
                return 59;
            }
        });
    }
    
    function updateMinutes() {
        setMins(prevMin => {
            if (prevMin && prevMin > 0) {
                return prevMin - 1;
            } else {
                updateHours();
                return 59;
            }
        });
    }
    
    function updateHours() {
        setHours(prevHours => {
            if (prevHours && prevHours > 0) {
                return prevHours - 1;
            } else {
                updateDays();
                return 23;
            }
        });
    }
    
    function updateDays() {
        setDays(prevDay => {
            if (prevDay && prevDay > 0) {
                return prevDay - 1;
            }
            return prevDay
        });
    }
    
    useEffect(() => {
        const timerId = setInterval(updateSeconds, 1000);
        return () => clearInterval(timerId);
    }, []);


    return (
    <article className="flex justify-evenly text-center [width:_clamp(300px,25vw+200px,1000px)] my-6 gap-4">
    <div className="flex flex-col">
        <div className="font-semibold [font-size:_clamp(2em,3vw+1.8em,200px)] [line-height:1em] ">{days}</div>
        <div className="[font-size:_clamp(1.2em,1.5vw+0.5em,100px)] [line-height:1em] ">Days</div>
    </div>
    <div className="flex flex-col">
        <div className="font-semibold [font-size:_clamp(2em,3vw+1.8em,200px)] [line-height:1em] ">{hours}</div>
        <div className="[font-size:_clamp(1.2em,1.5vw+0.5em,100px)] [line-height:1em] ">Hours</div>
    </div>
    <div className="flex flex-col">
        <div className="font-semibold [font-size:_clamp(2em,3vw+1.8em,200px)] [line-height:1em] ">{mins}</div>
        <div className="[font-size:_clamp(1.2em,1.5vw+0.5em,100px)] [line-height:1em] ">Minutes</div>
    </div>
    <div className="flex flex-col">
        <div className="font-semibold [font-size:_clamp(2em,3vw+1.8em,200px)] [line-height:1em] ">{secs}</div>
        <div className="[font-size:_clamp(1.2em,1.5vw+0.5em,100px)] [line-height:1em] ">Seconds</div>
    </div>
    </article>
)
}

export default Countdown