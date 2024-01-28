"use client"
import {useEffect, useLayoutEffect, useRef, useState} from 'react'

function Carousel({barber}:any) {

    // Dom Ref
    const wrapperRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)
    const corouselItemRef = useRef<(HTMLDivElement|null)[]>([])

    const [isMobile,setIsMobile] = useState(true)

    // Variables
    const currentPosition = useRef<number>(0)
    const clickedPosition = useRef<number>(0)
    const mouseIsDown = useRef<boolean>(false)

    const [gallery, setGallery] = useState(barber.images)

    type CustomScrollBehavior = 'auto' | 'smooth';
    const [scrollToggle, setScrollToggle] = useState<CustomScrollBehavior>('smooth');
    const [snapToggle, setSnapToggle] = useState('x mandatory')

    useEffect(() => {
        if(carouselRef.current && corouselItemRef.current[0]){
        const cardNum = Math.round(carouselRef.current.offsetWidth/corouselItemRef.current[0].offsetWidth)
        const twiceArray = [...barber.images.slice(-cardNum),...barber.images,...barber.images.slice(0,cardNum)]

        setGallery(twiceArray)
        carouselRef.current.scrollLeft = carouselRef.current.offsetWidth
        }
    }, [corouselItemRef.current, carouselRef])

    const mouseDown = (e:MouseEvent) => {
        if(carouselRef.current){
            currentPosition.current = carouselRef.current.scrollLeft
            clickedPosition.current = e.pageX
            mouseIsDown.current = true
            setScrollToggle('auto')
            setSnapToggle('none')
        }
    }

    const mouseOver = (e:MouseEvent) => {
        if (carouselRef.current && mouseIsDown.current) {
            console.log(mouseIsDown)
            carouselRef.current.scrollLeft = currentPosition.current - (e.pageX - clickedPosition.current)
        }
    }

    const mouseUp = (e:MouseEvent) => {
            setScrollToggle('smooth')
            setSnapToggle('x mandatory')
            mouseIsDown.current = false;
    }
    
    const slideRight = () => {
        if(carouselRef.current && carouselRef.current){
            const slideValue = corouselItemRef.current[0]?.offsetWidth
            carouselRef.current.scrollLeft += slideValue && slideValue + 16 || 0 

        }
    }

    const slideLeft = () => {
        if(carouselRef.current && carouselRef.current){
            const slideValue = corouselItemRef.current[0]?.offsetWidth
            carouselRef.current.scrollLeft -= slideValue && slideValue + 16 || 0 
        }
    }

    const autoTimeOut = useRef<NodeJS.Timeout | undefined>();
    
    const timeOutScroll = () => { 
        autoTimeOut.current = setInterval(() => {
            if (carouselRef.current && corouselItemRef.current[0]) {
                carouselRef.current.scrollLeft += corouselItemRef.current[0]?.offsetWidth;
            }
        }, 2000);
    };

    useEffect(()=>{
        if(window.innerWidth>640){
            setIsMobile(false)
        }
        timeOutScroll()
        return () => {
            clearInterval(autoTimeOut.current);
        };
    },[])

    const scrollLimit = () => {
        if(carouselRef.current){
            const scrollDifference = Math.round(carouselRef.current.scrollWidth-(carouselRef.current.offsetWidth))
            if(Math.round(carouselRef.current.scrollLeft) === scrollDifference ){
                // setScrollToggle(prevState => {
                //     setTimeout(() => {
                //         setScrollToggle('auto')
                //         if(carouselRef.current){
                //             carouselRef.current.scrollLeft = carouselRef.current?.offsetWidth;
                //         }
                //     }, 0);
                //     return 'smooth';
                // });

            setScrollToggle('auto');
            setTimeout(() => {
                if (carouselRef.current) {
                    carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
                }
                
                setScrollToggle('smooth')
            }, 10);
                
            }
            else if(carouselRef.current.scrollLeft === 0){
                setScrollToggle('auto')
                setTimeout(()=>{
                    if(carouselRef.current){
                            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth - 2*carouselRef.current?.offsetWidth
                    }
                    setScrollToggle('smooth')
                },10)

            }
        }

    }

    const pauseAuto = () => {
        clearInterval(autoTimeOut.current)
    }
    const resumeAuto = () => {
        timeOutScroll()
    }

    useLayoutEffect(()=>{
            carouselRef.current?.addEventListener("mousemove", mouseOver)
            carouselRef.current?.addEventListener("mousedown", mouseDown)
            carouselRef.current?.addEventListener("mouseup", mouseUp)
            carouselRef.current?.addEventListener("scroll", scrollLimit)
            wrapperRef.current?.addEventListener("mouseover", pauseAuto)
            wrapperRef.current?.addEventListener("mouseleave", resumeAuto)

            return() =>{
                carouselRef.current?.removeEventListener("mousemove", mouseOver)
                carouselRef.current?.removeEventListener("mousedown", mouseDown)
                carouselRef.current?.removeEventListener("mouseup", mouseUp)
                carouselRef.current?.removeEventListener("scroll", scrollLimit)
                wrapperRef.current?.removeEventListener("mouseover", pauseAuto)
                wrapperRef.current?.removeEventListener("mouseleave", resumeAuto)
            }
    },[carouselRef])

    const arrowSVG = (direction:string) =>{
        return(
        <svg className={`fill-primary ${direction === 'left' ? 'scale-x-[-1]' : null }`} viewBox="-12 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>angle-right</title>
            <path d="M0.88 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.76-5.84-5.8-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.4 6.44c-0.2 0.16-0.4 0.24-0.6 0.24z"></path>
        </svg>
        )
    }

    


    return (
        <div className='relative' ref={wrapperRef}>
            <section ref={carouselRef} style={{scrollBehavior: scrollToggle, scrollSnapType:snapToggle}} className={`w-full aspect-[2] md:aspect-[3] overflow-scroll carousel`} >
                <div className='grid grid-flow-col md:auto-cols-[calc(100%/3-(2rem/3))] md:grid-rows-none auto-cols-[calc(100%/2-1rem/2)] grid-rows-1 gap-4 h-full '>
                    {
                    gallery.map((image:any, i:number)=>{
                        return(
                        <div key={i} style={{scrollSnapAlign:'start'}}  ref={el => corouselItemRef.current[i] = el} className='h-full rounded-lg overflow-hidden '>
                            <img className='object-cover h-full w-full aspect-square' draggable={false} src={image}></img>
                        </div>
                        )
                    })
                    }
                </div>
            </section>
            <div className={``}>
                <button className='w-12 aspect-square border-light border-[0.5px] absolute top-[50%] right-0 bg-white/50 hover:bg-white/70 rounded-full overflow-hidden shadow-lg translate-x-[50%] translate-y-[-50%]' onClick={slideRight}>{arrowSVG('right')}</button>
                <button className='w-12 aspect-square border-light border-[0.5px] absolute top-[50%] left-0 bg-white/50 hover:bg-white/70 rounded-full overflow-hidden shadow-lg translate-x-[-50%] translate-y-[-50%]' onClick={slideLeft}>{arrowSVG('left')}</button>
            </div>  
        </div>
    )
}

export default Carousel