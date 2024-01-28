import { ReactNode } from "react";

type AccountDropType = {
    toggleFunctions?: Function;
    dropList: string;
    dropSvg: ReactNode;
    notes?: string;
    notesStart?:boolean;
}

const AccountDropdown = ({toggleFunctions, dropList, dropSvg, notesStart,notes}:AccountDropType) => {
    return(
        <section onClick={()=>{toggleFunctions?toggleFunctions():null}} className="group flex items-center hover:bg-light-3-f cursor-pointer transition-all duration-200 px-2 border-t justify-between">
            <div className="group-hover:text-primary-f text-light-f transition-all duration-200 flex flex-col flex-3 flex-grow">
                {dropList}
                {notes && <span className={`text-light-f group-hover:text-secondary-f text-sm transition-text duration-200 ${notesStart ? null : 'self-end'}`}>{notes}</span>}
            </div>
            <div className="w-10 flex justify-center items-center aspect-square p-1 group-hover:fill-primary-f  group-hover:stroke-primary-f cursor-pointer transition duration-200 group-hover:scale-90 ease-in-out">
                {dropSvg}
            </div>
        </section>

    )
}

export default AccountDropdown