type ArrowTypes={
  stroke?:string
}

function FrontArrowSVG({stroke}:ArrowTypes) {
  return (
    <svg className={`stroke-[8px] rotate-90`} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.9629 52.1839L36.7809 31.3659C38.5383 29.6085 41.3875 29.6085 43.1449 31.3659L63.9629 52.1839" strokeLinecap="round" strokeLinejoin="round" />
    </svg>    
  )
}

export default FrontArrowSVG