
type Svg = {
    height?:number;
    width?:number;
    fill?:string;
    strokeCol?:string;
    strokeWidth?:number;
}

export default function DropSignUp({height,width, fill}:Svg) {

    return (

    <svg className={` group-hover:fill-primary  ${height ? `h-${height}` : 'h-10'} ${width ? `w-${width}` : 'w-10'} ${fill ? `fill-${fill}` : null }   cursor-pointer transition duration-200 group-hover:scale-90 ease-in-out`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
        <path d="M506.82,381.54c-8.52-4.95-17.46-9.17-26.82-12.54,22-20,36-50,36-82,0-61-50-112-112-112s-112,50-112,112c0,33,14,62,36,82-25,9-47,23-66,43-66,72-62,188-62,193,1,12,10,20,22,20s20-10,20-22c0-1-4-103,53-163,27-28,64-42,110-42,31.15,0,58.16,6.42,80.74,19.26,8.96,5.09,20.27,2.97,26.56-5.19l.29-.38c7.51-9.75,4.87-23.97-5.77-30.16Zm-100.82-24.54c-39-1-70-32-70-70s31-70,70-70,70,31,70,70-31,70-70,70Z"/>
        <path d="M653.91,519.37h-59.73v-59.73c0-11.91-9.65-21.56-21.56-21.56h-1.77c-11.91,0-21.56,9.65-21.56,21.56v59.73h-59.73c-11.91,0-21.56,9.65-21.56,21.56v1.77c0,11.91,9.65,21.56,21.56,21.56h59.73v59.73c0,11.91,9.65,21.56,21.56,21.56h1.77c11.91,0,21.56-9.65,21.56-21.56v-59.73h59.73c11.91,0,21.56-9.65,21.56-21.56v-1.77c0-11.91-9.65-21.56-21.56-21.56Z"/>
    </svg>
    )
}