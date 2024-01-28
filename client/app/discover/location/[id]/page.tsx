import Link from 'next/link'
import {BarberItem} from '../../../types/barberTypes'
import "react-loading-skeleton/dist/skeleton.css";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getDistance from '@/app/(components)/getDistance';
import SortBtns from './sortBtns';
import IntersectionView from '@/app/(components)/intersectionView';
import TickSVG from '@/app/(svg)/tickSVG';

// export const revalidate = 1800;
export const dynamic = 'force-dynamic'


type discoverTypes = {
  city:string;
  lat:number;
  lng:number;
  ethnicityArray: string[];
  locationArray: string[];
}

  async function getBarbers({city,lat,lng,ethnicityArray,locationArray}:discoverTypes):Promise<BarberItem[] | undefined >{

    const maxLat = lat*1 + 15/111
    const minLat = lat*1 - 15/111
    const maxLng = lng*1 + 15/111
    const minLng = lng*1 - 15/111

    const supabase = createRouteHandlerClient({cookies})

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
      .overlaps('ethnic_type', ethnicityArray)
      .in('appointment_location', locationArray)

    if(data){
      return data
    }else{
      console.log(error)
    }


  }

  

  type SearchTypes = {
    lat: number;
    lng: number;
    sort: string;
    searchLocation:string;
    ethnicity: string;
    barberLocation:string
  };
  
  type DiscoverProps = {
    params: { id: string };
    searchParams: SearchTypes;
  };
  
  const Discover = async ({ params, searchParams }: DiscoverProps) => {
    const city = params.id

    const lat = searchParams.lat
    const lng = searchParams.lng
    const searchLocation = searchParams.searchLocation.split(' ').map(item => {
        return item.length > 0 ? item[0].trim().toUpperCase() + item.slice(1) : ''
    }).join(' ')
    const ethnicity = searchParams.ethnicity
    const ethnicityArray = searchParams.ethnicity.split('_')
    const sortBy = searchParams.sort
    const locationArray = searchParams.barberLocation.split('_')


    const barberList = await getBarbers({city, lat, lng, ethnicityArray, locationArray}) as BarberItem[]
    

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
                <h3 className='bg-light-2 w-fit px-2 rounded-md h-fit'>Barbers in <span className='font-semibold'>{city}</span></h3>
                <h3 className='bg-light-2 w-fit px-2 rounded-md h-fit'>Hair style/type: <span className=''>{ethnicity.split('_').map((item,i)=>{return(<span key={i} className='font-semibold'>{item}<span className={`${i===ethnicity.split('_').length-1 && 'hidden'} font-light`}> or </span></span>)})}</span></h3>
                <h3 className='bg-light-2 w-fit px-2 rounded-md h-fit'>Venue: <span className=''>{locationArray.map((item,i)=>{return(<span key={i} className='font-semibold'>{item}<span className={`${i===locationArray.length-1 && 'hidden'} font-light`}> or </span></span>)})}</span></h3>
              </div>

            </section>

            <SortBtns searchLocation={searchLocation} locationArray={locationArray} city={city} lat={lat} lng={lng} sortBy={sortBy} ethnicity={ethnicity} />
              <section className="flex-col flex gap-2 my-8  ">
                  {
                    barber ? barber.map((item, index)=>{

                      const BarberItem = () => {
                        return(
                        <section key={index} className='flex-row flex gap-2'>
                          <Link  className='[width:_clamp(160px,_calc(124px_+_10vw),240px)]' href={`/barber/${item.profile_url}`}>
                            <div className='overflow-hidden rounded-2xl width-full aspect-square relative '>
                                <div className='flex flex-col items-center absolute right-2 top-2'>
                                  <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs leading-tight'><strong className='text-lg leading-tight'>{item.reviews_stars ? item.reviews_stars.toFixed(2) : '--'}</strong>{`/5`}</h3>
                                  <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs'>{`(${item.ReviewsTable && item.ReviewsTable.length})`}</h3>
                                </div>
                                <div className='w-full h-full  overflow-hidden'>
                                    <div className='absolute left-0 bottom-0 flex flex-col m-2'>
                                        <h3 className=' drop-shadow-2xl z-10 text-white custom-text-shadow'>{`${item.UserTable?.first_name} ${item.UserTable?.last_name}`}</h3>
                                        <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>{item.user_address.postcode}</h3>
                                        <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>{`~${(getDistance(item.lat, item.lng, +lat, +lng)*0.621371).toFixed(1)} miles away`}</h3>
                                    </div>
                                    <img className='absolute w-full h-full object-cover bg-light-2' loading="lazy"  decoding="async" src={`${item.UserTable?.profilePicture}`} alt='barber profile img'></img>
                                </div>
                                <div>
                                </div>
                            </div>
                            
                          </Link>
                          <section className='flex flex-col gap-2 justify-between mb-2'>
                            <div>
                              {item.deals && item.deals.length>0 ? 
                              <div>
                                {item.deals.map((item,index)=>{
                                  if(index<1)
                                  return (
                                    <div key={index} className='flex gap-1 items-center'>
                                      <span className='w-2 h-2 rounded-full bg-red'></span>
                                      <h3 className='text-third text-sm'>{`${item.discount}% (${item.days})`}</h3>
                                    </div>
                                  )
                                })
                              }
                              {item.deals.length>1 && <h3 className='text-third text-sm'> and more...</h3>}
                              </div> : null}
                              {item.subscription ? 
                              <div>
                                  <div key={index} className='flex gap-1 items-center'>
                                    <span className='w-2 h-2 rounded-full bg-yellow'></span>
                                    <h3 className='text-third text-sm'>{`${item.subscription.numCuts} cuts pm at £${item.subscription.cost}pm`}</h3>
                                  </div>
                              </div> : null}
                              {item.mental_care ==true ? 
                                  <div className='flex gap-1 items-center'>
                                  <span className='w-2 h-2 rounded-full bg-blue'></span>
                                  <h3 className='text-third text-sm'>Mindful Cuts</h3>
                                </div> : null}
                            </div>
                            <div>
                            {item.service.length>0 ? 
                              <div className='mb-1'>
                                <div className='flex flex-col gap-1'>
                                  {item.service.map((item,index)=>{
                                    if(index<1){
                                    return (
                                    <div key={index} className='flex gap-1 items-center h-fit'>
                                      <span className='w-2 h-2 rounded-full bg-primary self-center'></span>
                                      <h3 className='text-sm' >{`£${item.cutPrice} ${item.cutName}`}</h3>
                                    </div>
                                    )
                                    }
                                  })}
                                </div>
                              </div> : null}
                              <div className='mb-2'>
                                {
                                  item.ethnic_type.map((item,i)=>{
                                      if(ethnicity.split('_').includes(item))
                                      return(
                                        <div  key={i} className='flex gap-2 items-center'>
                                          <h3 className='text-sm relative'>Cuts {item} hair</h3>
                                          <div className='h-3 aspect-square fill-secondary '>
                                            <TickSVG/>
                                          </div>
                                        </div>
                                      )
                                    })
                                }
                              </div>
                              <button className='md:block hidden bg-primary py-2 px-4 rounded-lg text-bg hover:scale-[98%] transition-transform duration-100 ease-in-out'>
                                  <Link href={`/barber/${item.profile_url}`} >
                                  Book now                      
                                </Link>
                              </button>
                            </div>
                          </section>
                        </section>
                        )
                      }

                      return (
                        <IntersectionView key={item.profile_url} children={<BarberItem/>} classNameInView='animate-appearIn' classNameNotInView='opacity-0' threshold={0.5}/>
                      )
                    }):null}
                    {barber.length === 0 && <h2 className='text-lg'>No nearby barbers within ~ 10 miles...</h2>}
                </section>
        </main>
    )
}

export default Discover