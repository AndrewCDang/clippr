"use client"

import {useState, useRef, useEffect} from 'react'

type BarberCutProps = {
    disabled:Boolean;
    id:number;
    delItemFromArray?:Function;
    updateValidBarberPages:Function;
    page:number;
    addToCollection:Function;
    delFromCollection:Function;
}


function BarberCutItem({disabled, id, delItemFromArray, page, updateValidBarberPages, addToCollection, delFromCollection}:BarberCutProps) {

    const refDuration = useRef<HTMLInputElement>(null)
    const [leftConstant,setLeftConstant] = useState<Number>(0)
    const updateLeftGap = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        setLeftConstant(e.currentTarget.value.length)
    }
    const [touched, setTouched] = useState(false)

    type cutInterface = {
        cutName: string;
        cutPrice: number;
        cutDuration: number;
        objectId: number;
    }
    
    const [ cutObject, setCutObject ] = useState<cutInterface>({cutName:'',cutPrice:-1,cutDuration:-1, objectId:id})

    const updateObject = (key:string, value:string|number) =>{
        !touched ? setTouched(true) : null
        switch (key) {
            case 'name':
                setCutObject({...cutObject, cutName:String(value)})
            break;
            case 'price':
                setCutObject({...cutObject, cutPrice:Number(value)})
            break;
            case 'duration':
                setCutObject({...cutObject, cutDuration:Number(value)})
            break;
        
            default:
                break;
        }

    }

    useEffect(()=>{
        if(cutObject.objectId===0 && touched){
            if(cutObject.cutName && cutObject.cutDuration !==-1 && cutObject.cutDuration && cutObject.cutPrice !==-1 && cutObject.cutPrice){
                updateValidBarberPages(page,true)
                console.log('objectupdate')
            }else{
                updateValidBarberPages(page,false)
            }
        }
        if(cutObject.cutName && cutObject.cutDuration !==-1 && cutObject.cutDuration && cutObject.cutPrice !==-1 && cutObject.cutPrice){
            addToCollection(cutObject);
        }
    },[cutObject])




    return (
    <section className="shadow-lg border gap-2 border-light-2 flex flex-row content-center items-center p-2 rounded-lg min-w-[360px] w-[80%] w-[66%] mx-auto">
        <div className="flex-grow ">
            <input onChange={(e)=>updateObject('name',e.target.value)} className="h-12 border-light-2 w-full border border-[1px] p-1 rounded-lg" type="text" placeholder={`${cutObject.objectId === 0 ? 'Standard Trim*' : `Standard Trim` }`}></input>
        </div>
        <div className="flex-grow-0 border-light-2 relative overflow-hidden w-28">
            <input onChange={(e)=>updateObject('price',e.target.value)} placeholder=" " className="h-12 peer/price border border-[1px] w-[100%] py-1 pl-4 rounded-lg overflow-hidden" type="number" required></input>
            <span className="text-xs text-light absolute pointer-events-none select-none pl-2 left-0 translate-x-[-100%] peer-focus/price:translate-x-[-100%] peer-placeholder-shown/price:translate-x-[0%] transition-all duration-500 top-0 translate translate-y-[-50%] top-[50%]">Price</span>
            <span className="text-xs text-light absolute pointer-events-none select-none pl-2 left-0 translate-x-[-100%] peer-focus/price:translate-x-[-100%] peer-placeholder-shown/price:translate-x-[0%] opacity-0  peer-placeholder-shown/price:opacity-[1] peer-focus/price:opacity-0 transition-all duration-500 top-0 translate translate-y-[-50%] top-[50%]"><span className="opacity-0">Price</span>
                <span className="relative">
                    <span className="absolute"><span>(<span className="opacity-0">£</span>)</span></span>
                </span>
            </span>
            <span className="text-base text-primary absolute pointer-events-none select-none pl-2 left-0 translate-x-[-100%] peer-focus/price:translate-x-[-100%] peer-focus/price:text-base peer-placeholder-shown/price:translate-x-[0%] peer-placeholder-shown/price:text-xs peer-placeholder-shown/price:text-light transition-all duration-500 top-0 translate translate-y-[-50%] top-[50%] "><span className="opacity-0">Price</span>
                <span className="relative">
                    <span className="absolute"><span className="opacity-0">(</span><span>£</span><span className="opacity-0">)</span></span>
                </span>
            </span>
        </div>
        <div className="flex-grow-0 border-light-2 relative overflow-hidden w-28">
            <input onChange={(e)=>updateObject('duration',e.target.value)} onKeyUp={(e)=>updateLeftGap(e)} ref={refDuration} placeholder=" " className="h-12 peer/duration border border-[1px] w-[100%] py-1 pl-2 rounded-lg overflow-hidden" type="number" required></input>
            <span className="text-xs text-light absolute pointer-events-none select-none pl-2 left-0 translate-x-[-100%] peer-focus/duration:translate-x-[-100%] peer-placeholder-shown/duration:translate-x-[0%] transition-all duration-500 top-0 translate translate-y-[-50%] top-[50%]">Cut duration</span>
            <span className="text-xs text-light absolute pointer-events-none select-none pl-2 left-0 translate-x-[-100%] peer-focus/duration:translate-x-[-100%] peer-placeholder-shown/duration:translate-x-[0%] opacity-0  peer-placeholder-shown/duration:opacity-[1] peer-focus/duration:opacity-0 transition-all duration-500 top-0 translate translate-y-[-50%] top-[50%]"><span className="opacity-0">Cut duration</span>
                <span className="relative">
                    <span className="absolute"><span>(<span className="opacity-0">mins</span>)</span></span>
                </span>
            </span>
            <span className={`h-4 text-xs text-primary absolute pointer-events-none select-none  pl-2 ${leftConstant == 0 && 'left-2 peer-focus/duration:left-2'}  ${leftConstant == 1 && 'left-4 peer-focus/duration:left-4'} ${leftConstant == 2 && 'left-6 peer-focus/duration:left-6'} ${leftConstant == 3 && 'left-8 peer-focus/duration:left-8'} translate-x-[-100%] peer-focus/duration:translate-x-[-100%] peer-placeholder-shown/duration:left-0 peer-placeholder-shown/duration:translate-x-[0%] peer-placeholder-shown/duration:text-light transition-all duration-500 translate translate-y-[-50%] top-[50%]`}><span className="opacity-0">Cut duration</span>
                <span className="relative">
                    <span className="absolute"><span className="opacity-0">(</span><span>mins</span><span className="opacity-0">)</span></span>
                </span>
            </span>
        </div>
        <svg onClick={()=>delItemFromArray && (delItemFromArray(id), delFromCollection(cutObject))} className={`${disabled ? 'cursor-not-allowed pointer-events-none fill-light-2' : 'cursor-pointer fill-primary hover:scale-[0.95] transition-scale duration-200'}`}  width="32px" height="32px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>close</title>
            <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
        </svg>
</section>  )
}

export default BarberCutItem