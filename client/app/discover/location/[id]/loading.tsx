import SkeletonBarberCard from "./skeletonBarberCard"

export default function Loading() {
    return(
        <section className="flex-col flex gap-2 ">
            <section className='mb-12'>
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
            </section>
            <SkeletonBarberCard cards={5} />
        </section>
    )
}