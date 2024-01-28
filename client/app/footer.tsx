import LightDarkMode from "./lightDarkMode"

const Footer = () => {
    return(
        <footer className='bg-bg-2 h-80 w-full flex p-4 items-end justify-between'>
            <div>
                <h3 className='text-light'>BuildSpace</h3>
                <h3 className='text-light'>Clippr. ©</h3>
            </div>
            <LightDarkMode/>
        </footer>
    )
}

export default Footer