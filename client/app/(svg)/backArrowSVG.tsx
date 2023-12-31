import React from 'react'

function BackArrowSVG() {
  return (
    <button className='item w-12 h-12 bg-primary rounded-full transition-all duration-600 shadow-xl '>
        <svg className='stroke-[4px] stroke-white -rotate-90' viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9629 52.1839L36.7809 31.3659C38.5383 29.6085 41.3875 29.6085 43.1449 31.3659L63.9629 52.1839" stroke-linecap="round" stroke-linejoin="round" />
        </svg>  
    </button>
)
}

export default BackArrowSVG