"use client"
import { useState, useEffect, useCallback, useMemo } from 'react'

type NavMonthProps = {
    navHeightToggle: (action: string) => void;
    setBookingDate: React.Dispatch<React.SetStateAction<string[]>>;
    bookingDate:string[];
} 


const NavMonth: React.FC<NavMonthProps> = ({navHeightToggle, setBookingDate, bookingDate}) => {
    // Get current Date to format calander
    const [d, setD] = useState(new Date())

    useEffect(()=>{
        let date = [new Date(d.getFullYear(),+d.getMonth()+1,0),new Date(d.getFullYear(),+d.getMonth()+2,0),new Date(d.getFullYear(),+d.getMonth()+3,0)]
        const dates = Array.from({length:3}, (_,i)=>i+1).map((month,i)=>{
            return ({days: date[0+i].getDate(), firstGap:date[0+i].getDay()-1, month: +date[0+i].getMonth()+1})
        })

    },[])

    const daysArray =['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    const [ calPage, setCalPage ] = useState(0)
    const currentDate = new Date()

    type SetMonthCalProps = {
        days: number;
        firstGap: number;
        month: number;
    }
    type CalendarData = {
        title: string;
        calendar: (string | number)[];
        monthNum: number
    }

    const setMonthCal = ({days, firstGap, month}:SetMonthCalProps):CalendarData => {
        const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec']

        const numbersArray = Array.from({ length: days }, (_, i) => i + 1) as (number | string)[];
        for (let i = 0; i < firstGap; i++) {
            numbersArray.unshift('');
        }
        const gapAfter = 35 - days - firstGap;
        for (let i = 0; i < gapAfter; i++) {
            numbersArray.push('');
        }
        return {title: monthArray[month-1], calendar: numbersArray, monthNum:month};


    };  

        const [daysMonth, setDaysMonth] = useState<CalendarData[]>();
    
        useEffect(() => {
            let date = [new Date(d.getFullYear(),+d.getMonth()+1,0),new Date(d.getFullYear(),+d.getMonth()+2,0),new Date(d.getFullYear(),+d.getMonth()+3,0)]
            let dateDays = [new Date(d.getFullYear(),+d.getMonth(),1),new Date(d.getFullYear(),+d.getMonth()+1,1),new Date(d.getFullYear(),+d.getMonth()+2,1)]
            const calcGap = (i:number) => {
                if(+dateDays[0+i].getDay() === 0){
                    return 6
                }else{
                    return +dateDays[0+i].getDay()-1
                }
                
            }
        
            const dates = Array.from({length:3}, (_,i)=>i+1).map((month,i)=>{
                return ({days: date[0+i].getDate(), firstGap:calcGap(i), month: +date[0+i].getMonth()+1})
            })
            console.log(dates)
            console.log(dateDays[0])
            console.log(new Date(d.getFullYear(),+d.getMonth()+1,0))
            console.log(new Date(d.getFullYear(),+d.getMonth(),1))

            console.log(dateDays[0].getDay())

            setDaysMonth([setMonthCal(dates[0]),setMonthCal(dates[1]),setMonthCal(dates[2])]);
        }, []);

        // Toggling selected Months

        type selectedDateType = {
            month: number;
            date: number;
        }

        const [ selectedDate, setSelectedDate ] = useState<selectedDateType[]>([])

        const dateHandler = (monthIndex:number, day:number, monthItem:CalendarData) => {
            appendSelectedDate(monthIndex, day)
            updateBookingState(day, monthItem)
        }

        const appendSelectedDate = useCallback((targetMonth:number, targetDate:number)  =>{
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

        const updateBookingState = useCallback((day:number,monthItem:CalendarData)=>{
            if(!bookingDate.includes(`${day}/${monthItem.monthNum}/${currentDate.getFullYear()}`)){
                setBookingDate([...bookingDate, `${day}/${monthItem.monthNum}/${currentDate.getFullYear()}`])
            }else{
                const removedDate = bookingDate.filter((item)=> item !== `${day}/${monthItem.monthNum}/${currentDate.getFullYear()}` )
                setBookingDate(removedDate)
            }
        },[bookingDate])

    
        if (!daysMonth) return null;
        
    
        return (
            <section onTransitionEnd={()=>navHeightToggle('day')}  className='overflow-hidden' style={{marginBottom: daysMonth[calPage].calendar.length > 35 ? '0px' : '-2rem', transition: 'all 0.1s ease-in-out' }}>
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
                    <div style={{width:'fit-content'}}  className='mx-auto'>
                            <div className="flex flex-row nav-cal-row w-min">
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
                                    <section key={monthIndex} style={{left:`${-100 + (100 * (monthIndex+1)-100*calPage)}%`,top:0, transition:'all 0.2s ease-in-out'}} className="absolute flex-col text-center w-[100%]">
                                        <h2 style={{lineHeight:'3rem'}} className='none-select h-12 '>{monthItem.title}</h2>
                                        <div style={{width:'fit-content'}} className='mx-auto' >
                                            <div className="flex flex-row nav-cal-row w-min ">
                                            {
                                                daysArray.map((day,index)=>{
                                                    return <div key={index} className='w-8 h-8 border-primary '><a></a></div>
                                                })
                                            }
                                            </div>
                                            {[...Array(6)].map((_, weekIndex) => (
                                                <div key={weekIndex} className="flex flex-row nav-cal-row w-min">
                                                    {monthItem.calendar.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                                                        <div onClick={()=>day !=='' && +day > +d.getDate()-1 || monthIndex !==0 ? dateHandler(monthIndex,+day,monthItem) : null}
                                                            key={dayIndex}
                                                            className={`${selectedDate.some(obj=>obj.month === monthIndex && obj.date === day) ? 'nav-cal-select' : null} w-8 h-8 border-primary ${day !=='' && +day > +d.getDate() -1 || monthIndex !==0  ? 'nav-cal-btn' : ''}` }>
                                                            <a className={+d.getDate() > +day && monthIndex === 0 ? `line-through text-light select-none pointer-events-none` : undefined}>{day}</a>
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

export  default NavMonth