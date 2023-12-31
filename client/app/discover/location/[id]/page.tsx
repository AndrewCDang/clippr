import './discover.css'
import Link from 'next/link'
import { useState, useEffect} from 'react'
import { useParams } from 'next/navigation';
import {BarberItem} from '../../../types/barberTypes'
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonBarberCard from './skeletonBarberCard';
import { distanceMatrix } from './googleDistance'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getDistance from '@/app/(components)/getDistance';

type discoverTypes = {
  city:string;
  lat:number;
  lng:number;
}

async function getBarbers({city,lat,lng}:discoverTypes):Promise<BarberItem[] | undefined >{

    const maxLat = lat*1 + 5/111
    const minLat = lat*1 - 5/111
    const maxLng = lng*1 + 5/111
    const minLng = lng*1 - 5/111

    console.log(maxLng)
    console.log(lng)

    const supabase = createRouteHandlerClient({cookies})

    const {data, error} = await supabase.from("BarberTable")
      .select('*,ReviewsTable(*), UserTable(*)')
      .lt('lat',maxLat)
      .gt('lat',minLat)
      .lt('lng',maxLng)
      .gt('lng',minLng)

    if(data){
      return data
    }
  
  }
  type SearchTypes = {
    lat: number;
    lng: number;
  };
  
  type DiscoverProps = {
    params: { id: string };
    searchParams: SearchTypes;
  };
  
  const Discover = async ({ params, searchParams }: DiscoverProps) => {
    const city = params.id

    console.log(city)

    const lat = searchParams.lat
    const lng = searchParams.lng

    let barber;
    barber = await getBarbers({city, lat, lng})
    console.log(barber)

      
    return (
        <main>
            <h1 className="mb-2">Discover your perfect barber</h1>
            <aside className='flex flex-row gap-4'>
              <div className='flex gap-1'>
                  <span className='w-2 h-2 mt-2 rounded-full bg-red'></span>
                  <h3 className='text-third'>Deals</h3>
              </div>
              <div className='flex gap-1'>
                  <span className='w-2 h-2 mt-2 rounded-full bg-yellow'></span>
                  <h3 className='text-third'>Subscriptions</h3>
              </div>
              <div className='flex gap-1'>
                <span className='w-2 h-2 mt-2 rounded-full bg-blue'></span>
                <h3 className='text-third'>Mindful Cuts | 1:1 Mental Health Talk</h3>
              </div>
            </aside>
            {/* <section className='flex flex-col gap-1 mt-4 mb-12'>
              <h3>Barbers near: <a className='personalise-tags'>{state.navData.booking.bookingLocation || address }</a></h3>
              {state.navData.booking.bookingDate.length>0 ?
                <div className='flex gap-2 items-center'>
                <h3>Date(s): </h3>
                {state.navData.booking.bookingDate.map((item,i)=>{
                  return (<a key={i} className='personalise-tags'>{item}</a>)
                })}
              </div> : null  }
              {state.navData.booking.bookingTime.time.hr ?
                <div className='flex gap-2 items-center'>
                <h3>Time: </h3>
                <a className='personalise-tags'>{state.navData.booking.bookingTime.range !== -1 ? `${state.navData.booking.bookingTime.time.hr}:${state.navData.booking.bookingTime.time.min} ±${state.navData.booking.bookingTime.range}hr`: 'Available all day' }</a>
              </div> : null  }
              {state.navData.personalise.ethnicity.length>0 ? 
              <div className='flex gap-2'>
                <h3>Hair type/style:</h3>
                {state.navData.personalise.ethnicity.map((item, i)=>{
                  return (<a key={i} className='personalise-tags'>{item}</a>)
                })}
              </div> : null}
            </section> */}

      <section className="flex-col flex gap-2 ">
        <SkeletonBarberCard cards={3} />
        {!barber ? <SkeletonBarberCard cards={5} /> : null}
          {
            barber ? barber.map((item, index)=>{
              return (
                <section key={index} className='flex-row flex gap-2'>
                <Link  className='width-fit' href={`/barber/${item.id}`}>
                  <div className='overflow-hidden rounded-2xl width-fit relative '>
                      <div className='flex flex-col items-center absolute right-2 top-2'>
                        <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs leading-tight'><strong className='text-lg leading-tight'>{item.reviews_stars}</strong>{`/5`}</h3>
                        <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs'>{`(${item.ReviewsTable && item.ReviewsTable.length})`}</h3>
                      </div>
                      <div className='home-barber relative overflow-hidden width-fit'>
                          <div className='absolute left-0 bottom-0 flex flex-col m-2'>
                              <h3 className=' drop-shadow-2xl z-10 text-white custom-text-shadow'>{`${item.UserTable?.first_name} ${item.UserTable?.last_name}`}</h3>
                              {/* <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>{`${item.address.street}`}</h3> */}
                              <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>{`~${(getDistance(item.lat, item.lng, +lat, +lng)*0.621371).toFixed(1)} miles away`}</h3>
                          </div>
                          <img className='absolute w-full h-full object-cover' src={`${item.UserTable?.profilePicture}`} alt='barber profile img'></img>
                      </div>
                      <div>
                      </div>
                  </div>
                  
                </Link>
                <div className='flex flex-col gap-2 justify-between mb-2'>
                  <div>
                    {item.deals && item.deals.length>0 ? 
                    <div>
                      {item.deals.map((item,index)=>{
                        return (
                          <div key={index} className='flex gap-1'>
                            <span className='w-2 h-2 mt-2 rounded-full bg-red'></span>
                            <h3 className='text-third'>{`${item.description}`}</h3>
                          </div>
                        )
                      })
                    }</div> : null}
                    {item.subscription ? 
                    <div>
                        <div key={index} className='flex gap-1'>
                          <span className='w-2 h-2 mt-2 rounded-full bg-yellow'></span>
                          <h3 className='text-third'>{`£${item.subscription.cost}pm`}</h3>
                        </div>
                    </div> : null}
                    {item.mentalCare ==true ? 
                        <div className='flex gap-1'>
                        <span className='w-2 h-2 mt-2 rounded-full bg-blue'></span>
                        <h3 className='text-third'>Mindful Cuts</h3>
                      </div> : null}
                  </div>
                  <div>
                  {item.service.length>0 ? 
                    <div className='mb-2'>
                      <div className='font-semibold text-sm '>Popular Cuts</div>
                      <div className='flex flex-col gap-1'>
                        {item.service.map((item,index)=>{
                          if(index<2){
                          return (
                          <div key={index} className='flex gap-1'>
                            <span className='w-2 h-2 mt-2 rounded-full bg-primary'></span>
                            <h3 >{`£${item.cutPrice} ${item.cutName}`}</h3>
                          </div>
                          )
                          }
                        })}
                      </div>
                    </div> : null}
                    <button className='book-btn'>
                        <Link href={`/barber/${item.id}`} >
                        Book now                      
                      </Link>
                    </button>
                  </div>
                </div>
                </section>
              )
            }):null}
        </section>
        </main>
    )
}

export default Discover


// const { state } = useAppContext()

// const [travelDistance, setTravelDistance ] =  useState()

// const { id } = useParams();

// let address = id

// if(typeof id === 'string'){
//   address = id.replace(/-/g,' ')
// }

//     const [barber, setBarber] = useState<BarberItem[]>([]);

//     useEffect(() => {
//         const fetchBarbers = async () => {
//             const data = await getBarbers();
//             const barberDataPromises =  data.map(async(item:any)=>{
//               const barberItem = item
              
//               let userLocation = state.navData.booking.bookingLocation || address;
//               if (Array.isArray(userLocation)) {
//                 userLocation = userLocation[0];
//               }
              
//               const barberLocation = `${item.address.street}, ${item.address.city}, ${item.address.post_code} `
      
//               if(userLocation){
//                 barberItem.distance = ((await distanceMatrix(userLocation, barberLocation ))*0.621371/1000).toFixed(1) // userLocation - Argument of type 'string | string[]' is not assignable to parameter of type 'string'.
//               }

//               return barberItem
//             })
//             const barberData = await Promise.all(barberDataPromises)
//             setBarber(barberData);
//         };
//         fetchBarbers();
//     }, []);

//   useEffect(()=>{
//     if(barber.length>0){
//       console.log(barber)
//     }
//   },[barber])
