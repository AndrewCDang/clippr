"use client"
import './barberCuts.css'
import { useEffect, useRef, useState} from "react"
import BarberCutItem from "./barberCutItem";
import autoAnimate from '@formkit/auto-animate'


type BarberCutsProps={
    page:number;
    updateValidBarberPages:Function
    updateAccountDetails:Function
}

export default function BarberCuts({page,updateValidBarberPages, updateAccountDetails}:BarberCutsProps){

    type cutInterface = {
        cutName: string;
        cutPrice: number;
        cutDuration: number;
        objectId: number;
        
    }

    const parent = useRef<HTMLDivElement>(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const [ objectCount, setObjectCount ] = useState(1)
    const [ objectArray, setObjectArray ] = useState<cutInterface[]>([{cutName:'',cutPrice:0,cutDuration:0, objectId:0}])
    const [ objectCollection, setObjectCollection ] = useState<cutInterface[]>([])

    const [centerItems, setCenterItems] = useState(true)
    
    const checkItemFit = () => {
        if(parent.current){
            if(parent.current.scrollHeight > parent.current.clientHeight && centerItems===true){
                setCenterItems(false)
            }else if(parent.current.scrollHeight == parent.current.clientHeight){
                setCenterItems(true)
            }
        }
    }

    const addBtnClick = () => {
        const newObjectArray = [...objectArray, {cutName:'',cutPrice:0,cutDuration:0, objectId:objectCount}]
        setObjectArray(newObjectArray)
        setObjectCount((prevState)=>prevState + 1)
        checkItemFit()
    }

    const delItemFromArray = (delId:number) => {
        const newObjectArray = objectArray.filter((item)=>{
            return item.objectId !== delId
        })
        setObjectArray(newObjectArray)
        checkItemFit()
    }


    const addToCollection = (object:cutInterface) => {
        let updatedState;
        if(objectCollection.some((obj)=>obj.objectId === object.objectId)){
            const newArray = objectCollection.map((item)=>
                item.objectId === object.objectId ? object : item
            );
            updatedState =  newArray
        }else{
            updatedState = [...objectCollection, object ]
        }
        updateAccountDetails('hairServices', updatedState)
        setObjectCollection(updatedState)
    }

    const delFromCollection = (object:cutInterface) => {
        let updatedState;
        const newArray = objectCollection.filter((item)=>{
            return item.objectId !== object.objectId 
        })
        updatedState = newArray
        updateAccountDetails('hairServices', updatedState)
        setObjectCollection(updatedState)
    }


    return(
        <section className="items-center h-[100%] relative pt-10">
            <div ref={parent} className={`barberScroll flex flex-col gap-4 overflow-y-auto h-[calc(100%-120px)] pb-4 ${ centerItems ? 'justify-center' : ''}`}>
                {objectArray && objectArray.map((item:cutInterface)=>{
                    return(
                        <BarberCutItem page={page} updateValidBarberPages={updateValidBarberPages} key={item.objectId} disabled={item.objectId == 0 ? true : false} id={item.objectId} delItemFromArray={delItemFromArray} addToCollection={addToCollection} delFromCollection={delFromCollection}/>
                        )
                })}
            </div>
            <button onClick={()=>addBtnClick()} className="top-[100%] border border-secondary border-3 w-min rounded-full mt-8 hover:scale-[0.95] transition-all duration-200">
                <h3></h3>
                <svg width="40px" height="40px" viewBox="-7 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>plus</title>
                    <path d="M17.040 15.16h-7.28v-7.24c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v7.28h-7.24c-0.48-0.040-0.84 0.32-0.84 0.8s0.36 0.84 0.84 0.84h7.28v7.28c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-7.32h7.28c0.48 0 0.84-0.36 0.84-0.84s-0.44-0.8-0.88-0.8z"></path>
                </svg>
            </button>
        </section>
        
    )
}
