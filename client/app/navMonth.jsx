"use client"

import { useState, useEffect } from 'react'


export  default function NavMonth(){
    const daysArray =['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    const [ month, setMonth ] = useState('Aug')

    const [ daysSelect, setDaysSelect ]  = useState()


    const setMonthCal = (days, firstGap) => {
        const numbersArray = Array.from({ length: days }, (_, i) => i + 1);
        for (let i = 0; i < firstGap; i++) {
            numbersArray.unshift('');
        }
        const gapAfter = 35 - days - firstGap;
        for (let i = 0; i < gapAfter; i++) {
            numbersArray.push('');
        }
        console.log([...Array(5)])
        return numbersArray;
    };




        const [daysMonth, setDaysMonth] = useState();
    
        useEffect(() => {
            setDaysMonth(setMonthCal(31, 1));
        }, []);
    
        if (!daysMonth) return null;
    
        return (
            <section className="flex-col text-center">
                <h2>{month}</h2>
                {[...Array(5)].map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-row nav-cal-row">
                        {daysMonth.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={`w-8 h-8 border-primary ${day !== '' ? 'nav-cal-btn' : ''}`}
                            >
                                <a>{day}</a>
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        );

}