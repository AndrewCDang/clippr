import { ReactNode } from 'react';
import'./btnSelection.css';

type BtnSelectionTypes = {
    tag: string;
    id?: string;
    children?:React.ReactNode;
    defaultChecked?:boolean;
    type: string;
    colour?:string;
    notes?: string | string[];
    click?:Function;
    name?:string;
    weight?:number,
    size?:string,
    flex?:string,
    bg?:string,
}

const BtnSelection = ({tag, id, children, defaultChecked, type,colour, notes, click, name, weight,size,flex,bg}:BtnSelectionTypes) =>{

return (
<label htmlFor={id || tag} className={`border border-${colour||'light-f'} w-full ${weight? `border-[${weight}px]` :'border-[1px]'} ${bg && bg} flex rounded-xl p-4 gap-4 cursor-pointer items-center justify-between`}>
        {children}
    <div className={`flex ${flex=='row'?'justify-between flex-1':'flex-col'} `}>
        <h2 className='text-secondary-f w-fit'>{tag}</h2>
        {notes && typeof notes === 'string' && <h3 className='text-light-f w-fit'>{notes}</h3>}
        {notes && Array.isArray(notes) && notes.map((note,i)=>{
            return(
                <h3 className='text-secondary-f whitespace-nowrap w-fit' key={i}>{note}</h3>
            )
        })}

    </div>
    <div className={`${type == 'radio' ? `rounded-full  ${size ==='small' ? 'w-6 h-6' :'w-10 h-10'} ` : 'rounded-sm w-6 h-6' } border relative`}>
        <input defaultChecked={defaultChecked} onChange={(e)=>click && (click(tag,e.target.checked))} type={type} id={ id || tag} className={`border-light-f btnSelection absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`} name={name ? name : tag}></input>
    </div>
</label>
)
}

export default BtnSelection