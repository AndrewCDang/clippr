import './home.css'
import HomeContent from './(homepage)/homeContent'


export default async function Home() {

  return (
    <main className='flex flex-col items-center'>
      <HomeContent/>
      <section className="home-carousel border-primrary border-b pt-8">
        {/* {
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
        } */}
      </section>      
    </main>
  )
}