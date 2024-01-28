import './home.css'
import HomeContent from './(homepage)/homeContent'


export default async function Home() {

  return (
    <main className='flex flex-col items-center'>
      <HomeContent/>
    </main>
  )
}