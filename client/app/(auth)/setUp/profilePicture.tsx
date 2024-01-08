"use client"
import "./images.css"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {useState, useEffect} from 'react'

type ImagesProps={
    page:number;
    updateValidBarberPages:Function
    updateAccountDetails:Function
}

function ProfilePicture({page, updateValidBarberPages, updateAccountDetails}:ImagesProps) {
    const [profilePicture, setprofilePicture] = useState<File>()

    useEffect(()=>{
        if(profilePicture){
            profilePicture ? (updateValidBarberPages(page,true), updateAccountDetails('profilePicture',profilePicture)) : null
        }
    },[profilePicture])

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        if(e.target.files && e.target.files[0].type.includes('image')){
            const newProfile = e.target.files[0]
            setprofilePicture(newProfile)
        }
    }

    const handleDragOver: React.DragEventHandler<HTMLDivElement> =(e) => {
        e.preventDefault()
    }

    const handleDragEnd: React.DragEventHandler<HTMLElement> =(e) => {
        e.preventDefault()
        const newFiles = Array.from(e.dataTransfer.files)
        .filter((file,index) => index == 0 && file.type.includes('image'));
        
        if (newFiles.length > 0) {
        setprofilePicture(newFiles[0]);
        }
    }
    const handleDragLeave: React.DragEventHandler<HTMLDivElement> =(e) => {
        e.preventDefault()
    }

    const [parent] = useAutoAnimate(/* optional config */)

{}


return (
    <section className='h-full max-w-[600px] min-w-[calc(96px+20%)] w-[calc(96px+50%)] my-12 mx-auto'>
        <section onDrop={(e)=>handleDragEnd(e)} onDragLeave={handleDragLeave} onDragOver={(e)=>e.preventDefault()} onDragEnter={handleDragOver}  className=' h-full p-12 border-dotted  border-light border-4 flex flex-col gap-2 items-center justify-center'>
            <div ref={parent} className="w-32 h-32  border rounded-full overflow-hidden">
            {!profilePicture ?
                <svg  className={`stroke-none scale-[1.5]`} viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-light-2" d="M58.3013 61.192C53.3935 65.4341 46.9966 68 40.0004 68C33.0041 68 26.6071 65.434 21.6992 61.1918C23.0685 58.9261 25.1923 57.1319 27.8006 56.1934C35.6862 53.3561 44.3142 53.3561 52.1998 56.1934C54.8082 57.1319 56.9321 58.9262 58.3013 61.192Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path className="fill-light-2" d="M44.9581 46.1552C48.0026 44.6538 50.2028 41.8537 50.9413 38.5404L51.0113 38.2265C51.7558 34.8862 50.9692 31.388 48.8665 28.688L48.7564 28.5466C46.6536 25.8465 43.4227 24.2676 40.0004 24.2676C36.5781 24.2676 33.3472 25.8465 31.2445 28.5466L31.1344 28.688C29.0316 31.388 28.245 34.8862 28.9895 38.2265L29.0595 38.5404C29.798 41.8537 31.9982 44.6538 35.0427 46.1552C38.1682 47.6964 41.8327 47.6964 44.9581 46.1552Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                :
                <div key={profilePicture.name} className=" border-0 w-full h-full  ">
                    <img
                        src={URL.createObjectURL(profilePicture)}
                        alt={profilePicture.name}
                        className='w-full h-full z-10 object-cover select-none pointer-events-none'
                    />
                </div>
            }
            </div>
            <label htmlFor='profilePicUpload' className='mt-4 px-4 whitespace-nowrap w-min white-space-none cursor-pointer py-2 rounded-lg font-semibold  bg-light-2 text-primary shadow-lg hover:scale-[0.98] transition-scale duration-200 '>
                Select Files
                <input className='hidden' id='profilePicUpload' type='file' accept="image/*" onChange={(e)=>handleInput(e)}></input>
            </label>
            {!profilePicture ? 
            <h5>{ `Upload profile picture`}</h5>
            :
            <h5>{ `Profile picture uploaded`}</h5>}
        </section>
    </section>
)
}

export default ProfilePicture