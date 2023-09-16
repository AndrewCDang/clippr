import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamicParams = true

// Function gets all ids and objects
export async function generateStaticParams(){
  const res = await fetch('http://localhost:4000/barbers/')
  const barber = await res.json()

  return barber.map((item)=>({
    id: barber.id
  }))
}


async function getBarbers(id){
  const res = await fetch('http://localhost:4000/barbers/'+id, {
    next: {
      revalidate: 0 
    }
  })

  if(!res.ok){
    notFound()
  }
  return res.json()
}

async function BarberPage({params}) {
    const barber = await getBarbers(params.id)

  return (
    <main style={{backgroundColor:barber.webPage.bgMain}} className='bg-white'> 
      <div className='w-40 h-40 rounded-full overflow-hidden custom-shadow'>
          <img src={`${barber.profile}`} alt='barber pp'></img>
      </div>
      <div className='mb-4'>
        <h2 style={{color:barber.webPage.h2}} className="global-title global-margin-top">{`${barber.first_name} ${barber.surname}`}</h2>
        <h3 style={{color: barber.webPage.h3}} className=' z-10 text-xs leading-tight'><strong className='text-lg leading-tight'>{barber.reviews.rating}</strong>{`/5 (${barber.reviews.amount})` }</h3>
      </div>

      <h3 style={{color: barber.webPage.h3}}>{`${barber.bio}`.slice(0,300)}{barber.bio.length>300 ? '...' : null}</h3>    

      <h2 style={{color: barber.webPage.h2}} className="global-title global-margin-top">Contact me</h2>

      <h3 style={{color: barber.webPage.h3}}>{`${barber.address.street}`}</h3>    
      <h3 style={{color: barber.webPage.h3}}>{`${barber.address.city}`}</h3>    
      <h3 style={{color: barber.webPage.h3}}>{`${barber.address.post_code}`}</h3>    


      <h3 style={{color: barber.webPage.h3}}>{`${barber.mobile_number}`}</h3>    
      <h2 style={{color: barber.webPage.h2}} className="global-title global-margin-top">Gallery</h2>
      <section className='flex gap-2'>
        {
          barber.gallery.map((image, i)=>{
            return <img key={i} className='w-40 h-40 object-cover rounded-md overflow-hidden' src={`${image}`}></img>
          })
        }
        
      </section>

      <h2 style={{color: barber.webPage.h2}} className="global-title global-margin-top">Cuts and Prices</h2>
      <section className='flex flex-col gap-2'>
        {
          barber.service.map((item, i)=>{
            return (
              <div key={i}>
                <div className='flex w-1/3 justify-between	'>
                  <h3 style={{color: barber.webPage.h3}}>{`${item.name}`}</h3>
                  <h3 style={{color: barber.webPage.h3}}>{`${item.time}mins`}</h3>
                </div>
                <h3 style={{color: barber.webPage.h3}}>{`£${item.price}`}</h3>
              </div>

            )
          })
        }
        
      </section>

      <h2 style={{color: barber.webPage.h2}} className="global-title global-margin-top">Reviews</h2>


      <Link href={`/barber/${params.id}/book`}>
          <button className="book-btn mt-8">Book Now</button>
      </Link>
      <div style={{zIndex:-1,
        backgroundImage: barber.webPage.bgImage ? `url(${barber.webPage.bgImage})` : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: barber.webPage.bgCol ? barber.webPage.bgCol : null,
      
      }}  className='absolute w-[100%] left-0 top-0 h-[100%] '>

      </div>
    </main>
  );
}

export default BarberPage;

