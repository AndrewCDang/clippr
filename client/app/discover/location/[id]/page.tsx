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
import SortBy from '@/app/(svg)/sortBy';
import SortBtns from './sortBtns';

type discoverTypes = {
  city:string;
  lat:number;
  lng:number;
  ethnicityArray: string[];
}

async function getBarbers({city,lat,lng,ethnicityArray}:discoverTypes):Promise<BarberItem[] | undefined >{

    const maxLat = lat*1 + 10/111
    const minLat = lat*1 - 10/111
    const maxLng = lng*1 + 10/111
    const minLng = lng*1 - 10/111

    const supabase = createRouteHandlerClient({cookies})
    console.log(ethnicityArray)

    if(ethnicityArray[0] === ''){
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

    const {data, error} = await supabase.from("BarberTable")
      .select('*,ReviewsTable(*), UserTable(*)')
      .lt('lat',maxLat)
      .gt('lat',minLat)
      .lt('lng',maxLng)
      .gt('lng',minLng)
      .overlaps('ethnic_type', ethnicityArray); 

    if(data){
      return data
    }


    }

  

  type SearchTypes = {
    lat: number;
    lng: number;
    sort: string;
    searchLocation:string;
    ethnicity: string;
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
    const searchLocation = searchParams.searchLocation.split(' ').map(item=> {return item[0].toUpperCase()+item.slice(1)}).join(' ')
    const ethnicity = searchParams.ethnicity
    const ethnicityArray = searchParams.ethnicity.split('_')
    const sortBy = searchParams.sort


    const barberList = await getBarbers({city, lat, lng, ethnicityArray}) as BarberItem[]

    function sortBarbers(sortBy:string, barberList:BarberItem[], lat:number, lng:number) {
      if (!sortBy) {
        return barberList;
      }
    
      if (sortBy === 'location') {
        return barberList.sort((a, b) => 
          (getDistance(a.lat, a.lng, lat, lng) * 0.621371) - 
          (getDistance(b.lat, b.lng, lat, lng) * 0.621371)
        );
      }
    
      if (sortBy === 'price') {
        return barberList.sort((a, b) => 
          a.service[0].cutPrice - b.service[0].cutPrice
        );
      }

      if (sortBy === 'reviews') {

        const weightedReviews = (score:number, amount:number) => {
          return ( score + 0.1 * amount)
        }


        return barberList.sort((a, b) => 
          weightedReviews(b.reviews_stars || 0, b.ReviewsTable?.length || 0) - weightedReviews(a.reviews_stars || 0, a.ReviewsTable?.length || 0)
        );
      }
        
      return barberList
    }
    
    const barber = sortBarbers(sortBy, barberList, lat, lng);


    console.log(barber)

      
    return (
        <main>
            <section className='mb-4'>
              <h1>Discover your perfect barber</h1>
              <div>
                <h2 className='text-xl mb-2 text-third'>near {searchLocation}</h2>
              </div>
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
              <div className='flex gap-2'>
                <h3 className='bg-light-2 w-fit px-2 rounded-md'>Barbers in <span className='font-semibold'>{city}</span></h3>
                <h3 className='bg-light-2 w-fit px-2 rounded-md'>Hair style/type: <span className='font-semibold'>{ethnicity.split('_').join(' | ')}</span></h3>
              </div>

            </section>

            <SortBtns searchLocation={searchLocation} city={city} lat={lat} lng={lng} sortBy={sortBy} ethnicity={ethnicity} />
      <section className="flex-col flex gap-2 my-8">
          {
            barber ? barber.map((item, index)=>{
              return (
                <section key={index} className='flex-row flex gap-2'>
                <Link  className='width-fit' href={`/barber/${item.profile_url}`}>
                  <div className='overflow-hidden rounded-2xl width-fit relative '>
                      <div className='flex flex-col items-center absolute right-2 top-2'>
                        <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs leading-tight'><strong className='text-lg leading-tight'>{item.reviews_stars ? item.reviews_stars : '--'}</strong>{`/5`}</h3>
                        <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs'>{`(${item.ReviewsTable && item.ReviewsTable.length})`}</h3>
                      </div>
                      <div className='home-barber relative overflow-hidden width-fit'>
                          <div className='absolute left-0 bottom-0 flex flex-col m-2'>
                              <h3 className=' drop-shadow-2xl z-10 text-white custom-text-shadow'>{`${item.UserTable?.first_name} ${item.UserTable?.last_name}`}</h3>
                              <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>{item.user_address.postcode}</h3>
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
                            <h3 className='text-third'>{`${item.discount}% (${item.days})`}</h3>
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
                    {item.mental_care ==true ? 
                        <div className='flex gap-1'>
                        <span className='w-2 h-2 mt-2 rounded-full bg-blue'></span>
                        <h3 className='text-third'>Mindful Cuts</h3>
                      </div> : null}
                  </div>
                  <div>
                  {item.service.length>0 ? 
                    <div className='mb-2'>
                      <div className='font-semibold text-sm '>Standard Trim</div>
                      <div className='flex flex-col gap-1'>
                        {item.service.map((item,index)=>{
                          if(index<1){
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
                        <Link href={`/barber/${item.profile_url}`} >
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
