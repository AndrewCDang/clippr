import './home.css'
import Link from 'next/link'
import { BarberItem }  from '../app/types/barberTypes'


async function getBarbers() {
  const res = await fetch('http://localhost:4000/barbers/', {
      next: {
        revalidate: 0
      }
    })
  const barber = await res.json();

  return barber
}

export default async function Home() {
  const barber = await getBarbers()

  return (
    <main className='flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <h1>Barbers  of the Week.</h1>
        <h3>find the perfect barber</h3>
        <h3>near you</h3>
      </div>
      <section className="home-carousel border-primrary border-b pt-8">
        {
          barber.map((item:BarberItem, i:number)=>{
            return (
              <Link className='home-barber' key={i} href={`/barber/${item.id}`}>
                  <div className='flex flex-col items-center absolute right-2 top-2'>
                    <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs leading-tight'><strong className='text-lg leading-tight'>{item.reviews.rating}</strong>{`/5`}</h3>
                    <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs'>{`(${item.reviews.amount})`}</h3>
                  </div>

                  <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow'><strong>{`${item.first_name} ${item.surname}`}</strong></h3>
                  <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow'>{`${item.address.city} ${item.address.post_code}`}</h3>
                  <img alt='barber_profile_pic_img' className='home-a-image' src={`${item.profile}`}/>
              </Link>

            )
          })
        }
      </section>
      <div className='flex flex-col items-center pt-24  pb-8'>
        <h5>Customers</h5>
        <h2 className="global-title">Personalised matches.</h2>
        <h3>quickly find and book your perfect barber, matches are always personalised to you</h3>
      </div>
      <section className="w-[80%] flex border-primrary pb-24  gap-2 mx-auto margin-0 flex justify-center">
        <article className='w-1/3'>
          <div className='bg-light h-32 rounded-2xl '>
          </div>
          <div className='text-center w-[90%] mx-auto mt-2'>
            <h2 className='width-fit   mx-auto'>1. Create your character</h2>
            <h3 >Set your hair type, style, location, barber-preferences</h3>
          </div>
        </article>
        <article className='w-1/3'>
          <div className='bg-light h-32 rounded-2xl '>
          </div>
          <div className='text-center w-[90%] mx-auto mt-2'>
            <h2 className='width-fit   mx-auto'>2. Discover</h2>
            <h3 >Discover a selection of barbers matched to you</h3>
          </div>
        </article>
      </section>

      <div className='flex flex-col items-center pb-8 text-center'>
        <h5>Barbers</h5>
        <h2 className="global-title">Celebrating the Barbers behind the Barber-shop.</h2>
        <h3>gain more visibility to you,</h3>
        <h3>build-up recommendations to you,</h3>
        <h3>stand out with your custom portfolio page to you</h3>

      </div>
      <section className="w-[80%] flex border-primrary pb-24  gap-2 mx-auto margin-0 flex justify-center">
        <article className='w-1/3'>
          <div className='bg-light h-32 rounded-2xl '>
          </div>
          <div className='text-center w-[90%] mx-auto mt-2'>
            <h2 className='width-fit   mx-auto'>Custom web-page</h2>
            <h3 >Create a memorable design and first impression to your brand</h3>
          </div>
        </article>
        <article className='w-1/3'>
          <div className='bg-light h-32 rounded-2xl '>
          </div>
          <div className='text-center w-[90%] mx-auto mt-2'>
            <h2 className='width-fit   mx-auto'>Connect</h2>
            <h3 >Connect with your barber-shop, while showing your own skills</h3>
          </div>
        </article>
        <article className='w-1/3'>
          <div className='bg-light h-32 rounded-2xl '>
          </div>
          <div className='text-center w-[90%] mx-auto mt-2'>
            <h2 className='width-fit   mx-auto'>Online booking</h2>
            <h3 >Easily manage online bookings through Clippr.</h3>
          </div>
        </article>
      </section>

      <div className='flex flex-col items-center pb-8 text-center'>
        <h5>Appointment Location</h5>
        <h2 className="global-title">Pick your Stage</h2>
      </div>
      <section className="w-[80%] flex border-primrary pb-24  gap-2 mx-auto margin-0 flex justify-center">
        <article className='w-1/3'>
          <img width={480} height={480} alt='barber_shop_img' src={"/clippr_shop.png"} style={{backgroundSize:'cover'}} className='bg-light h-48 w-48 mx-auto rounded-2xl '/>          
          <div className='text-center w-[90%] mx-auto mt-2'>
            <h2 className='width-fit   mx-auto'>Barber-shop</h2>
            <h3 >Get the classic experience</h3>
          </div>
        </article>
        <article className='w-1/3'>
          <img width={480} height={480} alt='barber_home_img' src={"/clippr_home.png"} className='bg-light h-48 w-48 mx-auto rounded-2xl object-cover'/>          
          <div className='text-center w-[90%] mx-auto mt-2'>
            <h2 className='width-fit   mx-auto'>Barber-Home</h2>
            <h3 >Great value with unique vibes</h3>
          </div>
        </article>
        <article className='w-1/3'>
          <img width={480} height={480} alt='mobile_img' src={"/clippr_mobile.png"} style={{backgroundSize:'cover'}} className='bg-light h-48 w-48 mx-auto rounded-2xl '/>
          <div className='text-center w-[90%] mx-auto mt-2'>
            <h2 className='width-fit   mx-auto'>Mobile Barber</h2>
            <h3 >Arrange an appointment at the comfort of your home</h3>
          </div>
        </article>
      </section> 
      <section className='w-[100%] m-8 flex flex-wrap gap-4 justify-center items-center'>
        <div className='flex-grow-[100%] max-w-[600px]  bg-light-2 rounded-xl overflow-hidden relative'>
          <img alt='mental_cuts_img' src='https://images.unsplash.com/photo-1593702282967-96c9f195befa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'/>
        </div>
        <div className='mt-2 max-w-[500px]' >
          <h2>Mindful Cuts | Mental Health Awareness</h2>
          <h3>In our commitment to promote mental health awareness among men, barbers can sign-up and be promoted to provide a sympathetic ear to those grappling with mental health challenges.</h3>
        </div>
      </section>
    </main>
  )
}
