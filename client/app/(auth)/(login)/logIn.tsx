"use client"
import {AuthForm} from '../AuthForm'
import {useLogInModal} from '@/app/(hooks)/useLogInModal'
import { useRegisterModal } from '@/app/(hooks)/useRegisterModal'
import XSvg from '@/app/(svg)/XSvg'


export function LogIn(){
    const { logInIsOpen, logInOpen, logInClose } = useLogInModal()
    const { registerIsOpen, registerOpen, registerClose } = useRegisterModal()


    const handleSubmit = async (e:SubmitEvent):Promise<void> => {
        e.preventDefault()
        console.log('submit')
    }

    const registerInstead = () => {
        logInClose()
        registerOpen()
    }

    return(
        <section className={`${logInIsOpen ? 'fixed' : 'hidden' } flex bg-opacity-50 top-0 left-0 z-50 w-full bg-secondary h-full justify-center`}>
            <section className='z-10 relative place-self-center bg-white p-4 flex flex-col h-fit gap-2 rounded-xl max-w-[400px] w-[80%] min-w-[320px]'>
                <div className='mx-auto py-4'>
                    <svg className='nav-logo-svg' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                        <circle className="b fill-light" cx="236.72" cy="399.82" r="33.28"/>
                        <path className="fill-primary" d="M330.79,366.79h.03S218.42,46.72,218.42,46.72C207.08,14.56,173.34-3.39,140.73,4.14c-3.84,.89-6.04,4.96-4.73,8.69l41.51,118.32,58.99,168.21s-.09,0-.14,0c-55.13,0-99.83,44.69-99.83,99.83s44.69,99.83,99.83,99.83,99.83-44.69,99.83-99.83c0-11.34-1.92-22.23-5.4-32.38Zm-94.43,85.62c-29.4,0-53.24-23.84-53.24-53.24s23.84-53.24,53.24-53.24,53.24,23.84,53.24,53.24-23.84,53.24-53.24,53.24Z"/>
                        <path className="fill-primary" d="M452.58,250.44c-10.34,14.4-27.67,23.43-47.03,22.09-26.25-1.81-47.53-23.08-49.34-49.33-2.15-31.11,22.46-57.02,53.11-57.02,18.75,0,35.22,9.7,44.7,24.34,1.71,2.64,5.08,3.67,8,2.5l30.6-12.24c3.76-1.51,5.32-6,3.3-9.52-18.13-31.55-52.99-52.26-92.48-50-48.64,2.79-91.6,46.27-93.84,94.94-2.64,57.28,43.02,104.55,99.72,104.55,37.06,0,69.39-20.19,86.61-50.17,2.02-3.51,.46-8-3.31-9.51l-32.21-12.88c-2.82-1.13-6.06-.21-7.83,2.25Z"/>
                        <path className="fill-primary" d="M177.71,192.03l-45.42-12.95L11.71,144.7c-3.79-1.08-7.73,1.35-8.39,5.24-5.57,32.99,14.36,65.61,47.14,75.02l154.24,44.03-26.99-76.96Z"/>
                    </svg>
                </div>
                <h2>Log in</h2>
                <AuthForm/>
                <h5>Don't have an account? <strong onClick={()=>registerInstead()} className='cursor-pointer'>Sign up</strong> here</h5>
                <a onClick={()=>logInClose()} className='absolute top-0 right-0 m-2'>
                    <XSvg height={8} width={8} fill={'primary'} strokeWidth={12}/>
                </a>
            </section>
            <a onClick={()=>logInClose()} className='absolute w-full h-full z-0'></a>
        </section>
    )
}

