"use client"
import { useState, useEffect, useCallback, useMemo } from 'react'
import { WeeklySchedule } from '@/app/types/barberTypes';

type CalendarData = {
    title: string;
    calendar: (string | number)[];
    monthNum: number;
    year: number;
};

type selectedDateType = {
    month: number | null;
    date: number | null;
    year: number | null;
    day: number | null;
};

type NavMonthProps = {
    dateHandler: (action: selectedDateType) => void;
    selectedDate: selectedDateType | null;
    weeklyBlock: (never[] | WeeklySchedule)[]
};

const BarberBookingTime: React.FC<NavMonthProps> = ({ dateHandler, selectedDate, weeklyBlock }) => {
    const [d, setD] = useState(new Date())

    const daysArray =['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    const [ calPage, setCalPage ] = useState(0)

    type SetMonthCalProps = {
        days: number;
        firstGap: number;
        month: number;
        year: number
    }

    const setMonthCal = ({days, firstGap, month, year}:SetMonthCalProps):CalendarData => {
        const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec']

        const numbersArray = Array.from({ length: days }, (_, i) => i + 1) as (number | string)[];
        for (let i = 0; i < firstGap; i++) {
            numbersArray.unshift('');
        }
        const gapAfter = 35 - days - firstGap;
        for (let i = 0; i < gapAfter; i++) {
            numbersArray.push('');
        }
        return {title: monthArray[month-1], calendar: numbersArray, monthNum:month, year: year};
    };  

        const [daysMonth, setDaysMonth] = useState<CalendarData[]>();

    
        useEffect(() => {
            // Get month and year of next 3 months
            let date = [new Date(d.getFullYear(),+d.getMonth()+1,0),new Date(d.getFullYear(),+d.getMonth()+2,0),new Date(d.getFullYear(),+d.getMonth()+3,0)]
            
            let dateDays = [new Date(d.getFullYear(),+d.getMonth(),1),new Date(d.getFullYear(),+d.getMonth()+1,1),new Date(d.getFullYear(),+d.getMonth()+2,1)]
            // console.log(dateDays[1].getDay())
            const calcGap = (i:number) => {
                if(+dateDays[0+i].getDay() === 0){
                    return 6
                }else{
                    return +dateDays[0+i].getDay()-1
                }
            }
            
            const dates = Array.from({length:3}).map((_,i)=>{
                return ({days: date[0+i].getDate(), firstGap:calcGap(i), month: +date[0+i].getMonth()+1, year: +date[0+i].getFullYear()})
            })

            setDaysMonth([setMonthCal(dates[0]),setMonthCal(dates[1]),setMonthCal(dates[2])]);
        }, []);

        if (!daysMonth) return null;
        
    
        return (
            <section className='overflow-hidden' style={{marginBottom: daysMonth[calPage].calendar.length > 35 ? '0px' : '-2rem', transition: 'all 0.1s ease-in-out' }}>
                <section className="test relative bg-whiteflex-col text-center overflow-hidden w-[100%]">
                    <div className='flex-row flex justify-between items-center'>
                        <svg  onClick={calPage >= 1 ? () => {setCalPage(calPage-1)}: undefined }  className={`stroke-primary w-12 cursor-pointer ${calPage < 1 ? 'none-select' : null}`}   style={{zIndex:100, transition: '0.2s ease-in-out' ,transform: 'rotate(90deg) scaleY(-1)', strokeWidth:'0.2rem', opacity: calPage <1 ? 0 : 1}}  viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='' d="M15.9629 52.1839L36.7809 31.3659C38.5383 29.6085 41.3875 29.6085 43.1449 31.3659L63.9629 52.1839"  strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 className='w-min m-0-auto'></h2>
                        <svg onClick={calPage < daysMonth.length-1 ? () => {setCalPage(calPage+1)}: undefined} className={`stroke-primary w-12 cursor-pointer ${calPage < daysMonth.length-1 ? null : 'none-select'}`} style={{zIndex:100, transition: '0.2s ease-in-out' , transform: 'rotate(90deg)', strokeWidth:'0.2rem', opacity: calPage < daysMonth.length-1 ? 1 : 0}} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.9629 52.1839L36.7809 31.3659C38.5383 29.6085 41.3875 29.6085 43.1449 31.3659L63.9629 52.1839" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className='p-2 w-full'>
                            <div className="flex flex-row !!  w-full justify-between">
                            {
                                [...Array(7)].map((day, dayIndex)=>{
                                return (
                                <div key={dayIndex} className='w-8 h-8 border-primary no-cursor'>
                                    <span>{daysArray[dayIndex]}</span>
                                </div>
                                )
                                })
                            }
                            </div>
                            {[...Array(6)].map((_, weekIndex) => (
                                <div key={weekIndex} className="flex flex-row !!   w-min">
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
                                    <section key={monthIndex} style={{left:`${-100 + (100 * (monthIndex+1)-100*calPage)}%`,top:0, transition:'all 0.2s ease-in-out'}} className="absolute flex-col text-center w-[100%]">
                                        <h2 style={{lineHeight:'3rem'}} className='none-select h-12 '>{monthItem.title}</h2>
                                        <div className='w-full p-2' >
                                            <div className="flex flex-row !! w-full ">
                                            {
                                                daysArray.map((day,index)=>{
                                                    return <div key={index} className='w-8 h-8 border-primary '><a></a></div>
                                                })
                                            }
                                            </div>
                                            {[...Array(6)].map((_, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-row !!  w-full justify-between">
                                                    {monthItem.calendar.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {

                                                        const isDateClickable =
                                                            day !== '' && +day > +d.getDate() - 1 && monthIndex == 0 && weeklyBlock[dayIndex] != '*' ||
                                                            day !== '' && monthIndex !== 0 && weeklyBlock[dayIndex] != '*';

                                                        const isSelectedDate =
                                                            selectedDate?.month === monthItem.monthNum &&
                                                            selectedDate.date === day &&
                                                            weeklyBlock[dayIndex] != '*';

                                                        const isHoverable =
                                                            (selectedDate?.month !== monthItem.monthNum ||
                                                            selectedDate?.date !== day) &&
                                                            day !== '' &&
                                                            +day > +d.getDate() - 1 &&
                                                            monthIndex !== 0 &&
                                                            weeklyBlock[dayIndex] != '*';
                                                        
                                                        let nextMonthDate = new Date()
                                                        nextMonthDate.setDate(nextMonthDate.getDate()+28)
                                                        const nextMonthDay = nextMonthDate.getDate()
                                                        
                                                        let isWithinMonth =
                                                            monthIndex < 1 ||
                                                            +day < nextMonthDay+1 && monthIndex == 1

                                                        const isCursorPointer = isDateClickable || (monthIndex !== 0 && weeklyBlock[dayIndex] != '*');

                                                        const isDatePast = d.getDate() > +day && monthIndex === 0;

                                                        const isDisabled = isDateClickable 

                                                        return(
                                                        <div
                                                        onClick={() => (isDateClickable && dateHandler({month: monthItem.monthNum, date: +day,year: monthItem.year,day: dayIndex}))}
                                                        key={dayIndex}
                                                        className={`
                                                            flex z-10 w-8 h-8 border-primary rounded-full transition-all duration-100
                                                            ${isSelectedDate ? 'bg-primary text-bg' : ''}
                                                            ${isHoverable ? 'hover:bg-light' : ''}
                                                            ${isCursorPointer ? 'cursor-pointer' : 'pointer-events-none'}
                                                            ${isDisabled && isWithinMonth ? '' : 'line-through text-light select-none pointer-events-none cursor-none'}
                                                        `}
                                                        >
                                                        <a className={`w-full place-self-center z-0 ${isDatePast ? 'line-through text-light select-none pointer-events-none cursor-none' : ''}`}>{day}</a>
                                                        </div>
                                                        )
                                                    }
                                                        
                                                    )}
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

export  default BarberBookingTime