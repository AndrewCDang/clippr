import './loadingSpin.css'

type LoadingSpinTypes = {
    colour?: string;
    width?: number;
    strokeWidth?: number
}
const LoadingSpin = ({colour,width,strokeWidth}:LoadingSpinTypes) => {
    return(
        <div id="wrapper">
            <div className="profile-main-loader">
            <div style={{width:`${width || 32}px`}} className="loader">
                <svg className="circular-loader"viewBox="25 25 50 50" >
                <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke={`${colour || 'white'}`} stroke-width={strokeWidth || 4} />
                </svg>
            </div>
            </div>     
        </div>
    )
}
export default LoadingSpin