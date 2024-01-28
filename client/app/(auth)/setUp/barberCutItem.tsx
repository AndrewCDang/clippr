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


    const barberRef = useRef<HTMLInputElement>(null)
    const [barberWidth, setBarberWidth] = useState<string>('8px')

    const costRef = useRef<HTMLInputElement>(null)
    const [costWidth, setCostWidth] = useState<string>('8px')

    function adjustWidth() {
        barberRef.current && setBarberWidth((barberRef.current.value.length +1)*8 + 'px')
    }
        function adjustCostWidth() {
        costRef.current && setCostWidth((costRef.current.value.length +1)*8 + 'px')
    }



    return (
    <section className="shadow-lg border gap-2 border-light-2 flex flex-row content-center items-center p-2 rounded-lg min-w-[360px] w-[80%] mx-auto">
        <div className="flex-grow ">
            <input onChange={(e)=>updateObject('name',e.target.value)} className="h-12 border-light-2 w-full border-[1px] p-1 rounded-lg" type="text" placeholder={`${cutObject.objectId === 0 ? 'Standard Trim*' : `Standard Trim` }`}></input>
        </div>
        <div className="flex-grow-0 border-light-2 relative overflow-hidden w-28">
            <label onClick={()=>costRef.current?.focus()} htmlFor={`costInput-${id}`} className='h-12 border-[1px] py-1 pl-2 rounded-lg overflow-hidden w-full flex gap-1 items-center cursor-text'>
                <span className='text-light text-sm'>{costRef.current && costRef.current.value.length>0 ? '£' : ''}</span>
                <input style={{width:costWidth}} ref={costRef} className='setCutInput text-primary' onChange={(e)=>{updateObject('price',e.target.value),adjustCostWidth()}} placeholder=" " id={`costInput-${id}`}  type="number" required></input>
                <span className='translate-x-[-8px] text-light text-sm'>{costRef.current && costRef.current.value.length>0 ? '' : 'cost(£)'}</span>
            </label>
        </div>
        <div className="flex-grow-0 border-light-2 relative overflow-hidden w-28">
            <label onClick={()=>barberRef.current?.focus()} htmlFor={`durationInput-${id}`} className='h-12 border-[1px] py-1 pl-2 rounded-lg overflow-hidden w-full flex gap-1 items-center cursor-text'>
                <input style={{width:barberWidth}} ref={barberRef} className='setCutInput text-primary' onChange={(e)=>{updateObject('duration',e.target.value),adjustWidth()}} placeholder=" " id={`durationInput-${id}`}  type="number" required></input>
                <span className='translate-x-[-8px] text-light text-sm'>mins</span>
            </label>
        </div>
        <svg onClick={()=>delItemFromArray && (delItemFromArray(id), delFromCollection(cutObject))} className={`${disabled ? 'cursor-not-allowed pointer-events-none fill-light-2' : 'cursor-pointer fill-primary hover:scale-[0.95] transition-scale duration-200'}`}  width="32px" height="32px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>close</title>
            <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
        </svg>
</section>  )
}

export default BarberCutItem