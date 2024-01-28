"use client"
import "./images.css"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {useState, useEffect} from 'react'

type ImagesProps={
    page:number;
    updateValidBarberPages:Function
    updateAccountDetails:Function
}

function Images({page, updateValidBarberPages, updateAccountDetails}:ImagesProps) {
    const [selectedImages, setSelectedImages] = useState<File[]>([])

    useEffect(()=>{
        if(selectedImages){
            selectedImages.length > 0 ? (updateValidBarberPages(page,true), updateAccountDetails('imageUploads',selectedImages)) : null
        }
    },[selectedImages])

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        if(e.target.files){
            setSelectedImages(Array.from(e.target.files))
        }
    }

    const handleDragOver: React.DragEventHandler<HTMLDivElement> =(e) => {
        e.preventDefault()
    }

    const handleDragEnd: React.DragEventHandler<HTMLElement> =(e) => {
        e.preventDefault()
        const newFiles = Array.from(e.dataTransfer.files)
        .filter(file =>!selectedImages?.some(existingFile => existingFile.name === file.name) && file.type.includes('image'));
        
        if (newFiles.length > 0) {
        setSelectedImages(prevState => [...prevState, ...newFiles]);
        }
    }

    const handleDragLeave: React.DragEventHandler<HTMLDivElement> =(e) => {
        e.preventDefault()
    }

    const removeUpload = (object:string) => {
        if(selectedImages.length==1){
            updateValidBarberPages(page,false)
        }
        setSelectedImages(prevState=>{
            const filteredState = prevState?.filter((item)=>{
                return item.name !== object
            })
            return filteredState
        })

    }
    const [parent] = useAutoAnimate(/* optional config */)

{}


return (
    <section className='h-full max-w-[600px] min-w-[calc(96px+20%)] w-[calc(96px+50%)] my-12 mx-auto'>
        <section onDrop={(e)=>handleDragEnd(e)} onDragLeave={handleDragLeave} onDragOver={(e)=>e.preventDefault()} onDragEnter={handleDragOver}  className=' h-full p-12 border-dotted border-light border-4 flex flex-col gap-2 items-center justify-center'>
            {selectedImages && selectedImages.length>0 ?
            <div ref={parent} className="imageContainer">
                {selectedImages.map((item,index)=>{
                    return(
                    <div key={item.name} className="flex items-center mx-auto ">
                        <div className="relative">
                        <div className="z-20 absolute h-min left-[100%] top-[0] translate-y-[-50%] translate-x-[-50%]">
                            <button onClick={()=>removeUpload(item.name)} className="bg-bg  shadow-xl w-min rounded-full">
                                <h3></h3>
                                <svg className={`cursor-pointer fill-primary hover:scale-[0.9] transition-scale duration-200`}  width="24px" height="24px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <title>close</title>
                                    <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
                                </svg>
                            </button>
                            </div>
                            <img
                                src={URL.createObjectURL(item)}
                                alt={item.name}
                                className='z-10 rounded-lg overflow-hidden item w-28 h-28  select-none pointer-events-none'
                            />
                        </div>
                    </div>
                )
            })
            }
            </div>:
            <div className='text-light select-none grid grid-cols-2 gap-1'>
                <div className="w-10 h-10 rounded-md bg-light-2"></div>
                <div className="w-10 h-10 rounded-md bg-light-2"></div>
                <div className="w-10 h-10 rounded-md bg-light-2"></div>
                <div className="w-10 h-10 rounded-md bg-light-2"></div>
            </div>
            }
            <label htmlFor='imagesUpload' className='mt-4 px-4 whitespace-nowrap w-min white-space-none cursor-pointer py-2 rounded-lg font-semibold  bg-light-2 text-primary shadow-lg hover:scale-[0.98] transition-scale duration-200 '>
                Select Files
                <input className='hidden' id='imagesUpload' type='file' accept="image/*" multiple onChange={(e)=>handleInput(e)}></input>
            </label>
            {selectedImages && selectedImages.length===1 ? 
            <h5>{ `${selectedImages.length} image uploaded`}</h5>
            :null}
            {selectedImages && selectedImages.length>1 ? 
            <h5>{ `${selectedImages.length} images uploaded`}</h5>
            :null}
            {selectedImages && selectedImages.length==0 ? 
            <h5 className="text-light">{ `Upload at least 1 gallery image`}</h5>
            :null}
        </section>
    </section>
)
}

export default Images