import './home.css'
import Link from 'next/link'
import { BarberItem }  from '../app/types/barberTypes'
import HomeContent from './(homepage)/homeContent'

async function getBarbers() {
  const res = await fetch('http://localhost:4000/barbers/', {
      next: {
        revalidate: 0
      }
    })
  const barber = await res.json();

  return barber
}

async function getRandom(){
  const res = await fetch('https://jsonplaceholder.typicode.com/users',{
    next:{
      revalidate:0
    },
    cache:'no-store'}
  )
  const random = await res.json()
  return random
}

export default async function Home() {
  const barber = await getBarbers()
  const randomUsers = await getRandom()

  const numArray:Number[] = []
  while (numArray.length !==5 ){
    const numIndex = Math.floor(Math.random()*10) + 1
    if(!numArray.includes(numIndex)){
      numArray.push(numIndex)
    }
  }  

  return (
    <main className='flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <h1>Barbers  of the Week.</h1>
        <h3>find the perfect barber</h3>
        <h3>near you</h3>
        {
          randomUsers.slice(0, 11).map((item: any, i: number) => {
            if (numArray.includes(i+1)) {
              return <h3 key={i}>{item.id}</h3>;
            }
            return null; // Return null for cases where the condition is not met
          })
        }
        <br></br>
           {
          numArray.slice(0,5).map((item: any, i: number) => {
              return <h3 key={i}>{item}</h3>;
    
          })
        }
        
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
      <HomeContent/>
      
    </main>
  )
}
