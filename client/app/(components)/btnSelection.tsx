import'./btnSelection.css';

type BtnSelectionTypes = {
    tag: string;
    type: string;
    colour?:string;
    notes?: string | string[];
    click?:Function;
    name?:string;
    weight?:number,
    size?:string,
    flex?:string
}

const BtnSelection = ({tag, type,colour, notes, click, name, weight,size,flex}:BtnSelectionTypes) =>{

return (
<label htmlFor={tag} className={`border border-${colour||'light'} w-full ${weight? `border-[${weight}px]` :'border-[1px]'} flex rounded-xl p-4 gap-4 cursor-pointer items-center justify-between`}>
    <div className={`flex ${flex=='row'?'justify-between flex-1':'flex-col'} `}>
        <h2 className='text-secondary'>{tag}</h2>
        {notes && typeof notes === 'string' && <h3>{notes}</h3>}
        {notes && Array.isArray(notes) && notes.map((note,i)=>{
            return(
                <h3 className='text-third whitespace-nowrap' key={i}>{note}</h3>
            )
        })}

    </div>
    <div className={`${type == 'radio' ? `rounded-full  ${size ==='small' ? 'w-6 h-6' :'w-10 h-10'} ` : 'rounded-sm w-6 h-6' } border relative`}>
        <input onChange={()=>click && click(tag)} type={type} id={tag} className={`border-light btnSelection absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`} name={name ? name : tag}></input>
    </div>
</label>
)
}

export default BtnSelection