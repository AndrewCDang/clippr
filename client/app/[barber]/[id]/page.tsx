import { notFound } from 'next/navigation'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Carousel from '@/app/(components)/carousel'
import LocationSVG from '@/app/(svg)/locationSVG'
import Mobile from '@/app/(svg)/mobileSVG'
import ScissorsSVG from '@/app/(svg)/scissorsSvg'
import Edit from '@/app/(svg)/edit'
import supabase from '@/app/(utils)/supabase'
import BarberForm from './barberForm'
import {starsSVG, starsEmptySVG, reviewStarsSVG } from '@/app/(svg)/starsSVG'
import { BarberItem } from '@/app/types/barberTypes'

export const dynamicParams = true

async function getbarbers(id:string):Promise<BarberItem|undefined>{
  const {data:cutData, error} = await supabase.from('BarberTable')
    .select('*, UserTable("*")')
    .eq('profile_url',id)
    .single()
  
  if(error){
    notFound()
  }
  if(cutData){
    return cutData
  }
}

async function getReviews(id:string){
  const {data:reviewData, error} = await supabase.from('ReviewsTable')
    .select('*, UserTable(first_name, last_name, profilePicture)')    
    .eq('barber_id',id)

  return(reviewData)

}

async function getSession(){
  const supabase = createRouteHandlerClient({cookies})
  const {data, error} = await supabase.auth.getSession()

  if(data){
    return data
  }
}

async function barberPage({params}:any) {
    const session = await getSession()
    const barber = await getbarbers(params.id)
    let userId;
    if(session?.session){
      userId = session.session.user.id || null
    }
    const barberId = barber?.id.toString()
    const reviews = barberId ? await getReviews(barberId) : null;

    const writtenReviews = reviews?.filter((review)=>{return review.review !== null})
    const latestReviews = writtenReviews?.slice(0,6).sort((a,b)=>{return b.id - a.id})

    const barberStars = reviewStarsSVG(barber?.reviews_stars)

  return (
      <main className=' my-8 rounded-xl shadow-lg flex-1 flex flex-col justify-between p-4 relative'> 
        <img alt='' src={barber?.bg_banner} className={`absolute h-40 w-full rounded-t-xl z-0  top-0 left-0 bg-light object-cover opacity-[80%]`}></img>
        <section className='z-0'>
          <div className='w-40 h-40 rounded-full overflow-hidden custom-shadow z-10'>
              <img className='w-full aspect-square object-cover' src={`${barber?.UserTable?.profilePicture}`} alt='barber profile picture'></img>
          </div>
          <div className='pb-2 flex flex-wrap justify-between items-start mt-2'>
            <div>
              <h1 className="">{`${barber?.UserTable?.first_name} ${barber?.UserTable?.last_name}`}</h1>
              <div className='flex gap-1'>
                <h2 className="text-secondary">{`${barber?.barber_level.charAt(0).toUpperCase()}${barber?.barber_level.slice(1)} barber`}</h2>
              </div>
              <div className='flex items-center'>
                {barberStars}
                <h3 className='ml-1 font-medium'>{barber?.reviews_stars && barber?.reviews_stars.toFixed(2)}<span className='text-xs text-light'>{`(${reviews && reviews?.length} reviews)`}</span></h3>
              </div>
            </div>
            <section className='flex items-start gap-6 justify-between md:w-fit sm:w-full md:flex-row flex-row-reverse'>
              <aside className='flex flex-col'>
                <div className='stroke-[4] stroke-secondary w-10 aspect-square self-center'>
                  <ScissorsSVG/>
                </div>
                  <h5 className='text-light text-sm'>{`${barber?.appointment_location} barber`}</h5>  
              </aside>

              <aside className='flex flex-col'>
                <div className='w-10 aspect-square self-center'>
                  <Mobile/>
                </div>
                  <h5 className='text-light text-sm'>{`+${barber?.UserTable?.country_code} ${barber?.UserTable?.mobile_number}`}</h5>  
              </aside>

              <aside className='flex flex-col'>
                <div className='w-10 aspect-square self-center'>
                  <LocationSVG/>
                </div>
                <h5 className='text-light text-sm'>{`${barber?.user_address.addressline1}`}</h5>    
                <h5 className='text-light text-sm'>{`${barber?.user_address.city}`}</h5>    
                <h5 className='text-light text-sm'>{`${barber?.user_address.postcode.toUpperCase()}`}</h5>    
              </aside>
            </section>
          </div>
            <section className='mb-4 border-b-2 border-dashed border-light-2 grid sm:grid-cols:1 md:grid-cols-12 '>
              <h3 className='col-span-8 w-full mb-4 text-sm text-light'>
                {barber?.bio}
              </h3>
            </section>
        </section>
        <section className='grid sm:grid-cols-1 md:grid-cols-12'>
          <section className='md:col-span-8 flex flex-col '>
            <Carousel barber={barber}/>
            <section className='mt-8'>
              <h1 className="mb-2">Cuts</h1>
              <aside className='flex flex-col gap-2 bg-white/5'>
                {
                  barber?.service.map((item, i)=>{
                    return (
                      <div key={i} className='border p-2 rounded-lg'>
                        <div className='flex w-full max-w-[400[px] justify-between'>
                          <h3 className='flex-1 font-semibold'>{`${item.cutName}`}</h3>
                          <div className='flex gap-4 justify-between'>
                            <h3>{`£${item.cutPrice}`}</h3>
                            <h3>{`${item.cutDuration}mins`}</h3>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </aside>
            </section>
            <section className='my-8'>
            <h1 className="mb-2">Reviews</h1>
            <section className='grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 mb-4 '>
              {
                latestReviews?.map((review,i)=>{
                  return(
                    <section key={i} className=' flex gap-2'>
                      <div>
                        <div className='w-12 h-12 rounded-full overflow-hidden bg-light '>
                          {review.UserTable.profilePicture ? <img className='w-full h-full object-cover' src={`${review.UserTable.profilePicture}`} alt='user profile picture'/> : null}
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <h2>{`${review.UserTable.first_name} ${review.UserTable.last_name}`}</h2>
                        <div className='flex items-center'>
                          {Array(review.stars).fill(0).map((star)=>{
                              return(starsSVG)
                            })}
                          {Array(5-review.stars).fill(0).map((star)=>{
                            return(starsEmptySVG)
                          })}
                          <h4 className='text-xs text-light'>{`(${review.created_at.slice(8,10)}/${review.created_at.slice(5,7)}/${review.created_at.slice(0,4)})`}</h4>
                        </div>
                        <h3 className='text-sm text-light'>{`${review.review}`}</h3>
                      </div>
                    </section>
                  )
                })
              }
            </section>
            {latestReviews && latestReviews.length>4 && <a className='underline cursor-pointer w-fit mx-auto'>See More</a>}
            {latestReviews?.length==0 && <a className='text-light w-fit mx-auto'>No current reviews</a>}
            </section>
          </section>
          <section className=' md:col-span-4 md:col-start-9 relative md:ml-[calc(100%/6)]'>
            <div className='h-full w-full'>
                <div className='w-full sticky pb-4 top-4 rounded-xl shadow-lg border-light-2 border-[0.5px] bg-white/5'>
                  <BarberForm barber={barber as BarberItem}/>
                </div>
            </div>
          </section>
        </section>
        {
          userId === barberId ? 
          <button className='w-12 shadow-lg aspect-square bg-bg rounded-full overflow-hidden absolute right-2 top-2 flex items-center justify-center cursor-pointer z-20 hover:scale-[0.96] transition-all duration-200'>
            <div className='w-10 t-10'>
              <Edit/>
            </div>
          </button>
          :null
        }
        
      </main>
  );
}

export default barberPage;

