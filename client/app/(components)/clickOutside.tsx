

export const clickOutside = (node:any, isOpen:any, closeModal:any) => {
    const handleClickOutside = (e:MouseEvent) => {
        console.log(isOpen)
        if(!node.contains(e.target)){
            if(isOpen){
                console.log('boogga')
            }
        }
    }

    window.addEventListener("click", (e)=>{
        handleClickOutside(e)
    })

    return () => {
        window.removeEventListener("click", (e)=>{
            handleClickOutside(e)
        } )
    }
}