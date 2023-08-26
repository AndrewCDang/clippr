"use client"
import './discover.css'
import Link from 'next/link'
import { useParams } from 'next/navigation'; // Use next/navigation instead of next/router


export async function getBarbers() {
    const res = await fetch('http://localhost:4000/barbers/', {
        next: {
          revalidate: 0
        }
      })
    const barber = await res.json();
  
    return barber
  }

export default async function discover(){
  const {location} = useParams();
  // const { location } = router.query; // Access the "location" parameter
    const barber = await getBarbers()



    return (
        <main>
            <h2 className="global-title">Discover your perfect barber</h2>

      <section className="flex-col flex gap-2 ">
        {
          barber ? barber.map((item)=>{
            return (
              <Link className='width-fit' href={`/barber/${item.id}`}>
                <div className='overflow-hidden rounded-2xl width-fit '>
                    <div className='home-barber relative overflow-hidden width-fit'>
                        <div className='absolute left-0 bottom-0 flex flex-col m-2'>
                            <h3 className=' drop-shadow-2xl z-10 text-white custom-text-shadow'>{`${item.first_name} ${item.surname}`}</h3>
                            <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>{`${item.address.street}`}</h3>
                            <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>x miles away</h3>
                        </div>

                        <img className='home-b-image' src={`${item.gallery[0]}`}></img>
                    </div>
                    <div>
                    </div>
                </div>
              </Link>

            )
          })
        : null}
        </section>
          
        </main>
    )
}