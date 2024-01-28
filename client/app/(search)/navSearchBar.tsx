import { RefObject } from "react";
import SearchSVG from "../(svg)/searchSVG";
import { useSearchModal } from "../(hooks)/useSearchModal";

type NavSearchBarTypes = {
    navRef: RefObject<HTMLElement>;
    navHeightToggle:(action:string)=>void;
}

function NavSearchBar ({navRef, navHeightToggle}:NavSearchBarTypes){
    const {searchOpen, searchIsOpen} = useSearchModal()

    return(
    <section  ref={navRef} style={{transition: 'all 0.2s ease-in-out', opacity: !searchIsOpen ? 1 : 0, transform: searchIsOpen ? 'translateY(4rem) scale(1.5)' : 'translateY(0px) scale(1)'}} 
        className='z-10 bg-white/10 flex gap-4 px-4 py-2 bg-bg border-[1px] border-light rounded-full h-fit width-fit mx-auto hover:drop-shadow-xl cursor-pointer 
        [&>div]:pr-2 [&>div:nth-last-child(1)]:border-r-0 [&>div]:border-r-[1px] [&>div]:border-r-light
        ' onClick={()=>{searchOpen();setTimeout(()=>{navHeightToggle('personalise')},0)}}>

        <div className="hidden sm:block">Personalise</div>
        <div className="hidden sm:block">Location</div>
        <div className="flex gap-1">Search
        <div className="fill-primary">
            <SearchSVG/>
        </div>
        </div>
    </section>
    )

}

export default NavSearchBar