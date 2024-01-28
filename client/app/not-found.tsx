
import "./(svg)/brokeScissorsAni.css"

import BrokenScissors from "./(svg)/brokenScissors"

export default function NotFound() {
  return (
    <div className="w-full h-full flex m-auto justify-center ">
        <div className="self-center w-fit flex flex-col items-center">
            <div className="[width:_clamp(80px,_calc(20px_+_5vw),_160px)] aspect-square mb-8">
                <BrokenScissors/>
            </div>
            <h1>Error 404</h1>
            <h3>Page not found.</h3>
        </div>
    </div>
  )
}
