import { ReactNode } from "react";

type AccountDropType = {
    toggleFunctions: any;
    dropList: string;
    dropSvg: ReactNode;
}

const AccountDropdown = ({toggleFunctions, dropList, dropSvg}:AccountDropType) => {
    return(
        <section onClick={()=>{toggleFunctions()}} className="group flex items-center bg-white hover:bg-light-3 cursor-pointer px-2 border-t justify-between">
            <div className="group-hover:text-primary text-light transition duration-200">{dropList}</div>
            {dropSvg}
        </section>

    )
}

export default AccountDropdown