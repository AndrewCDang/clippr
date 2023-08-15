import './home.css'
import Link from 'next/link'

async function getBarbers(){
  const res = await fetch('http://localhost:4000/barbers/')
  return res.json()
}


export default async function Home() {
  const barber = await getBarbers()

  return (
    <main>
      <h2 className="global-title">Home Page</h2>
      <h3>Sliding card banner profiles of barbers (air-bnb style)</h3>
      <section className="home-carousel">
        {
          barber.map((item)=>{
            return (
              <Link className='home-barber' href={`/barber/${item.id}`}>
                  <h3 className='drop-shadow-2xl z-10 text-white'>{`${item.first_name} ${item.surname}`}</h3>
                  <img className='home-b-image' src={`${item.gallery[0]}`}></img>
              </Link>

            )
          })
        }
        {/* <Link href={`/barber/2`}>
          <div>
            <p>id: 2</p>
          </div>
        </Link>  
        <Link href={`/barber/3`}>
          <div>
            <p>id: 3</p>
          </div>
        </Link>     */}
      </section>
    </main>
  )
}
