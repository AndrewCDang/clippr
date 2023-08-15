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
  const res = await fetch('http://localhost:4000/barbers/'+id)

  if(!res.ok){
    notFound()
  }
  return res.json()
}

async function book({params}) {
    const barber = await getBarbers(params.id)

  return (
    <main>
      <p>This page will show barber with ID of <strong>{params.id}</strong>.</p>
      <h2 className="global-title global-margin-top">About me</h2>
      <h3>{`${barber.first_name} ${barber.surname}`}</h3>
      <h3>{`${barber.bio}`.slice(0,300)}{barber.bio.length>300 ? '...' : null}</h3>    

      <h2 className="global-title global-margin-top">Contact me</h2>

      <h3>{`${barber.address.street}`}</h3>    
      <h3>{`${barber.address.city}`}</h3>    
      <h3>{`${barber.address.post_code}`}</h3>    


      <h3>{`${barber.mobile_number}`}</h3>    
      <h2 className="global-title global-margin-top">Gallery</h2>
      <section className='flex gap-2'>
        {
          barber.gallery.map((image)=>{
            return <img className='w-40 h-40 object-cover rounded-md overflow-hidden' src={`${image}`}></img>
          })
        }
        
      </section>

      <h2 className="global-title global-margin-top">Cuts and Prices</h2>
      <section className='flex flex-col gap-2'>
        {
          barber.service.map((item)=>{
            return (
              <div>
                <div className='flex w-1/3 justify-between	'>
                  <h3>{`${item.name}`}</h3>
                  <h3>{`${item.time}mins`}</h3>
                </div>
                <h3>{`£${item.price}`}</h3>
              </div>

            )
          })
        }
        
      </section>

      <h2 className="global-title global-margin-top">Reviews</h2>


      <Link href={`/barber/${params.id}/book`}>
          <h2 className="global-title global-margin-top button">Book Now</h2>
      </Link>

    </main>
  );
}

export default book;
