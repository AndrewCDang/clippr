"use client"
import {useState, useRef} from 'react'

export default function NavSearch(){

    const [range, setRange] = useState(0)

    return(
        <section>
            <div className="flex-col flex items-center gap-4">
                <h4 className="mt-4">Appointment Time</h4>
                <section className="flex flex-row items-center custom-shadow text-4xl pb-1 p-3 rounded-xl">
                    <div className="relative">
                        <input className="w-16 disable-num " id="hour" placeholder="00" onKeyDown={(evt) => {["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault(); evt.target.value.length >= 2 && /[0-9]/.test(evt.key) && evt.preventDefault()}} type="number"></input>
                        <label cl form="hour" className="text-xs text-light absolute left-[50%] top-[-30%] translate-x-[-50%] ">hr</label>
                    </div>
                    <span>
                        :
                    </span>
                    <div className="relative">
                        <input className="w-16 disable-num " id="minute" placeholder="00" onKeyDown={(evt) => {["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault(); evt.target.value.length >= 2 && /[0-9]/.test(evt.key) && evt.preventDefault()}} type="number"></input>
                        <label form="minute" className="text-xs text-light absolute left-[50%] top-[-30%] translate-x-[-50%] ">min</label>
                    </div>
                 </section>
                 <h3 className="mt-4">Range</h3>
                <section className="flex-row flex gap-2 mb-4">
                    <button onClick={()=>setRange(0)} style={{backgroundColor: range == 0 ? 'rgb(211, 211, 211)' : null, borderColor: range == 0 ? 'white' : null}} className="text-lg border border-light p-1 rounded-xl">+- 30<span className="text-xs">mins</span></button>
                    <button onClick={()=>setRange(1)} style={{backgroundColor: range == 1 ? 'rgb(211, 211, 211)' : null, borderColor: range == 1 ? 'white' : null}} className="text-lg border border-light p-1 rounded-xl">+- 1<span className="text-xs">hr</span></button>
                    <button onClick={()=>setRange(2)} style={{backgroundColor: range == 2 ? 'rgb(211, 211, 211)' : null, borderColor: range == 2 ? 'white' : null}} className="text-lg border border-light p-1 rounded-xl">+- 2<span className="text-xs">hr</span></button>
                    <button onClick={()=>setRange(3)} style={{backgroundColor: range == 3 ? 'rgb(211, 211, 211)' : null, borderColor: range == 3 ? 'white' : null}} className="text-lg border border-light p-1 rounded-xl"><span className="text-xs">Free all day</span></button>
                </section>
                
            </div>
        </section>
    )
}