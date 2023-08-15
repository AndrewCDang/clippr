import './discover.css'
import Link from 'next/link'


export default function discover(){
    const exampleID = '1'
    const exampleID2 = '2'



    return (
        <main>
            <h2 className="global-title">Discover your perfect barber</h2>
            <h3>Carousel of barber profiles</h3>

            <section className='discover-carousel'>
                {/* Each Barber item will contain BarberId which will be used in in GET request  */}
                <Link href={`/barber/${exampleID}`}>
                    <section className="discover-barber-container">
                        <div>Barber Name</div>
                        <div>Barber location</div>
                    </section>
                </Link>
                <Link href={`/barber/${exampleID2}`}>
                    <section className="discover-barber-container">
                        <div>Barber Name</div>
                        <div>Barber location</div>
                    </section>
                </Link>
            </section>
          
        </main>
    )
}