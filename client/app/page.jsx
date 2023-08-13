import './home.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h2 className="global-title">Home Page</h2>
      <h3>Sliding card banner profiles of barbers (air-bnb style)</h3>
      <section className="home-carousel">
        <Link href={`/barber/420424024024`}>
          <div>
            <p>id: 420424024024</p>
          </div>
        </Link>
        <Link href={`/barber/420424024024`}>
          <div>
            <p>id: 423412415513</p>
          </div>
        </Link>  
        <Link href={`/barber/420424024024`}>
          <div>
            <p>id: 616161616611</p>
          </div>
        </Link>  
        <Link href={`/barber/420424024024`}>
          <div>
            <p>id: 444211929888</p>
          </div>
        </Link>
  
      </section>
    </main>
  )
}
