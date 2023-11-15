
type Svg = {
    height?:number;
    width?:number;
    fill?:string;
    strokeCol?:string;
    strokeWidth?:number;
}

export default function DropLogIn({height,width, fill}:Svg) {

    return (
    <svg className={` group-hover:fill-primary  ${height ? `h-${height}` : 'h-10'} ${width ? `w-${width}` : 'w-10'} ${fill ? `fill-${fill}` : null }   cursor-pointer transition duration-200 group-hover:scale-90 ease-in-out`} data-name="Layer 1" viewBox="-8 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>user-alt</title>
    <path d="M13.84 16.48c-0.76-0.76-1.64-1.36-2.64-1.72 0.88-0.8 1.44-2 1.44-3.28 0-2.44-2-4.48-4.48-4.48s-4.48 2-4.48 4.48c0 1.32 0.56 2.48 1.44 3.28-1 0.36-1.88 0.92-2.64 1.72-2.64 2.88-2.48 7.52-2.48 7.72 0.040 0.48 0.4 0.8 0.88 0.8s0.8-0.4 0.8-0.88c0-0.040-0.16-4.12 2.12-6.52 1.080-1.12 2.56-1.68 4.4-1.68s3.32 0.56 4.4 1.68c2.28 2.36 2.12 6.44 2.12 6.52-0.040 0.48 0.32 0.84 0.8 0.88h0.040c0.44 0 0.8-0.36 0.84-0.8 0.040-0.2 0.24-4.84-2.56-7.72zM5.44 11.48c0-1.52 1.24-2.8 2.8-2.8 1.52 0 2.8 1.24 2.8 2.8 0 1.52-1.24 2.8-2.8 2.8-1.56-0.040-2.8-1.28-2.8-2.8z"></path>
    </svg>
    )
}
