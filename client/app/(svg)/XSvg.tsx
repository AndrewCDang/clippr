import { useEffect } from "react";

type Svg = {
    height?:number;
    width?:number;
    fill?:string;
    strokeCol?:string;
    strokeWidth?:number;
}

export default function XSvg({height,width, fill}:Svg) {

    return (

    <svg className={`h-${height} w-${width} fill-${fill} cursor-pointer transition duration-200 hover:scale-90 ease-in-out`} viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>close</title>
        <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
    </svg>
    )
}
