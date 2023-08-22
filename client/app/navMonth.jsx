"use client"

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react'


export  default function NavMonth({navHeightToggle}){
    const daysArray =['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    const [ calPage, setCalPage ] = useState(0)


    const setMonthCal = (days, firstGap, month) => {
        const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec']

        const numbersArray = Array.from({ length: days }, (_, i) => i + 1);
        for (let i = 0; i < firstGap; i++) {
            numbersArray.unshift('');
        }
        const gapAfter = 35 - days - firstGap;
        for (let i = 0; i < gapAfter; i++) {
            numbersArray.push('');
        }
        console.log(monthArray[month+1])
        return {title: monthArray[month+1], calendar: numbersArray };


    };



        const [daysMonth, setDaysMonth] = useState();
    
        useEffect(() => {
            setDaysMonth([setMonthCal(31, 1, 8),setMonthCal(30, 4, 9),setMonthCal(31, 6, 10)]);
        }, []);

        // Toggling selected Months

        const [ selectedDate, setSelectedDate ] = useState([])

        const appendSelectedDate = useCallback((targetMonth, targetDate)  =>{
            const selectedArray = [...selectedDate]
            if(selectedArray.some(obj=>obj.month === targetMonth && obj.date === targetDate) && selectedArray){
                const targetIndex =  selectedArray.findIndex(obj=>obj.month === targetMonth && obj.date === targetDate)
                selectedArray.splice(targetIndex,1)
                setSelectedDate(selectedArray)
            }else{
                selectedArray.push({month: targetMonth, date: targetDate})
                setSelectedDate(selectedArray)
            }
        },[selectedDate])
    
        if (!daysMonth) return null;
        
    
        return (
            <section onTransitionEnd={()=>navHeightToggle('day')}  className='overflow-hidden' style={{marginBottom: daysMonth[calPage].calendar.length > 35 ? '0px' : '-2rem', transition: 'all 0.1s ease-in-out' }}>
                <section className="test relative bg-whiteflex-col text-center overflow-hidden w-[100%]">
                    <div className='flex-row flex justify-between items-center'>
                        <svg  onClick={calPage >= 1 ? () => {setCalPage(calPage-1)}: null }  className={`stroke-primary w-12 cursor-pointer ${calPage < 1 ? 'none-select' : null}`}   style={{zIndex:100, transition: '0.2s ease-in-out' ,transform: 'rotate(90deg) scaleY(-1)', strokeWidth:'0.2rem', opacity: calPage <1 ? 0 : 1}}  viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='' d="M15.9629 52.1839L36.7809 31.3659C38.5383 29.6085 41.3875 29.6085 43.1449 31.3659L63.9629 52.1839"  stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <h2 className='w-min m-0-auto'></h2>
                        <svg onClick={calPage < daysMonth.length-1 ? () => {setCalPage(calPage+1)}: null} className={`stroke-primary w-12 cursor-pointer ${calPage < daysMonth.length-1 ? null : 'none-select'}`} style={{zIndex:100, transition: '0.2s ease-in-out' , transform: 'rotate(90deg)', strokeWidth:'0.2rem', opacity: calPage < daysMonth.length-1 ? 1 : 0}} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9629 52.1839L36.7809 31.3659C38.5383 29.6085 41.3875 29.6085 43.1449 31.3659L63.9629 52.1839" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div style={{width:'fit-content'}}  className='mx-auto'>
                            <div className="flex flex-row nav-cal-row w-min">
                            {
                                [...Array(7)].map((day, dayIndex)=>{
                                    return <div style={{cursor:'none'}} className='w-8 h-8 border-primary '><a>{daysArray[dayIndex]}</a></div>
                                })
                            }
                            </div>
                            {[...Array(6)].map((_, weekIndex) => (
                                <div key={weekIndex} className="flex flex-row nav-cal-row  w-min">
                                    {[...Array(7)].map((day, dayIndex) => (
                                        <div
                                            key={dayIndex}
                                            className={`w-8 h-8 border-primary`}
                                        >
                                            <a></a>
                                        </div>
                                    ))}
                                </div>
                            ))}
        {
                            daysMonth.map((monthItem, monthIndex)=>{
                                return (
                                    <section style={{left:`${-100 + (100 * (monthIndex+1)-100*calPage)}%`,top:0, transition:'all 0.2s ease-in-out'}} className="absolute flex-col text-center w-[100%]">
                                        <h2 style={{lineHeight:'3rem'}} className='none-select h-12 '>{monthItem.title}</h2>
                                        <div style={{width:'fit-content'}} className='mx-auto' >
                                            <div className="flex flex-row nav-cal-row w-min ">
                                            {
                                                daysArray.map((day)=>{
                                                    return <div className='w-8 h-8 border-primary '><a></a></div>
                                                })
                                            }
                                            </div>
                                            {[...Array(6)].map((_, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-row nav-cal-row w-min">
                                                    {monthItem.calendar.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                                                        <div onClick={()=>{day !=='' ? appendSelectedDate(monthIndex, day) : null }}
                                                            key={dayIndex}
                                                            className={`${selectedDate.some(obj=>obj.month === monthIndex && obj.date === day) ? 'nav-cal-select' : null} w-8 h-8 border-primary ${day !== '' ? 'nav-cal-btn' : ''}` }
                                                        >
                                                            <a>{day}</a>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                )
                            })
                        } 
                        
                    </div>
                  
                </section>
                

            </section>
        );

}