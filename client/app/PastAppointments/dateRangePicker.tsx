import { useRef, useEffect } from "react"
import TriangleSVG from "../(svg)/triangleSVG";

type DateRangePickerTypes = {
    setMonthTog:React.Dispatch<React.SetStateAction<boolean>>;
    monthTog:boolean;
    setSelMonth:React.Dispatch<React.SetStateAction<string>>;
    selMonth:string;
    yearTog:boolean;
    setYearTog:React.Dispatch<React.SetStateAction<boolean>>;
    setSelYear:React.Dispatch<React.SetStateAction<number>>;
    selYear:number|null;
}

function DateRangePicker({setMonthTog, monthTog, setSelMonth, selMonth,yearTog, setYearTog,setSelYear,selYear}:DateRangePickerTypes) {
    const years = [2024, 2023, 2022, 2021]
    const months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Nov','Dec']

    const monthRef = useRef<HTMLDivElement>(null)
    const yearRef = useRef<HTMLDivElement>(null)


    const toggleOff = (e: MouseEvent) => {
        if (monthTog && monthRef.current && !monthRef.current.contains(e.target as HTMLElement)) {
            setMonthTog(false);
        }
        if (yearTog && yearRef.current && !yearRef.current.contains(e.target as HTMLElement)) {
            setYearTog(false);
        }

    };

    useEffect(() => {
        window.addEventListener('click', toggleOff);

        return () => {
            window.removeEventListener('click', toggleOff);
        };
    }, [monthTog, monthRef.current, yearTog, yearRef.current]);


  return (
    <div className='flex gap-1'>
        <div ref={monthRef} onClick={()=>setMonthTog(state=>{return !state})} className={` ${monthTog ? 'bg-primary' : 'bg-white'} transition-all duration-200 flex justify-between cursor-pointer items-center gap-[0.25rem] border-light border-[0.5px] rounded-md px-6 relative w-fit`}>
            <div className={`${monthTog ? 'text-white' : 'text-primary'} transition-all duration-300` }>{selMonth}</div>
            <div className={`w-4 ${monthTog ? '-rotate-90 fill-white' : 'fill-primary'} transition-all duration-300`}>
                <TriangleSVG/>
            </div>
            <div className={`${monthTog ? 'visible' : 'hidden'} absolute top-[100%] bg-white w-full left-0 border-light border-[0.5px] rounded-md `}>
                {months.map(month=>{
                    return(
                        <h3 onClick={()=>setSelMonth(month)} key={month} className={`px-2 py-[0.25rem] hover:bg-light-3 cursor-pointer`}>{month} </h3>
                    )
                })}

            </div>
        </div>
        <div ref={yearRef} onClick={()=>setYearTog(state=>{return !state})} className={` ${yearTog ? 'bg-primary' : 'bg-white'} transition-all duration-200 flex justify-between cursor-pointer items-center gap-[0.25rem] border-light border-[0.5px] rounded-md px-6 relative w-fit`}>
        <div className={`${yearTog ? 'text-white' : 'text-primary'} transition-all duration-300` }>{selYear}</div>
            <div className={`w-4 ${yearTog ? '-rotate-90 fill-white' : 'fill-primary'} transition-all duration-300`}>
                <TriangleSVG/>
            </div>
            <div className={`${yearTog ? 'visible' : 'hidden'} absolute top-[100%] bg-white w-full left-0 border-light border-[0.5px] rounded-md `}>
                {years.map((year)=>{
                    return(
                        <h3 onClick={()=>setSelYear(year)} key={year} className='px-2 py-[0.25rem] hover:bg-light-3 cursor-pointer'>{year} </h3>
                    )
                })}
            </div>
        </div>
    </div>  
)
}

export default DateRangePicker