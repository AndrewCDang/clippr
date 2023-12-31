import BackArrowSVG from "./(svg)/backArrowSVG"
import BackBreadCrumbs from "./backBreadCrumbs"

function BackBtnContainer() {
    return (
        <a className="relative w-12 h-12 [&>.item:has(~.item:hover)]:scale-[0.96] [&:has(.true)]:opacity-100 [&:has(.true)]:pointer-events-auto [&:has(.true)]:cursor-pointer opacity-0  pointer-events-none cursor-default transition-all duration-300 ease-in-out">
            <BackArrowSVG/>
            <BackBreadCrumbs/>
        </a>
    )
}

export default BackBtnContainer