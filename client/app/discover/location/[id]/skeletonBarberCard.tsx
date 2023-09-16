import Skeleton from "react-loading-skeleton";
import React from 'react'
interface PostsProps {
    cards: number;
}

const SkeletonBarberCard: React.FC<PostsProps> = ({ cards }) => {
    return(
        Array(cards).fill(0).map((card,i)=>{
            return(
                <section key={i} className="flex-col flex gap-2 ">
                    <section className='flex-row flex gap-2'>
                        <section>    
                                <div className='home-barber '>
                                <Skeleton style={{transform:'translateY(-4px)'}} borderRadius={'0.8rem'} height={240}/>
                                </div>
                        </section>
                        <div className='flex flex-col gap-2 justify-between mb-2 w-full'>
                            <div>
                                <div>
                                    <div className='flex gap-1'>
                                        <Skeleton containerClassName="flex-[0.7]"/>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex gap-1'>
                                        <Skeleton containerClassName="flex-[0.7]"/>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex gap-1'>
                                        <Skeleton containerClassName="flex-[0.7]"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='mb-2'>
                                    <Skeleton width={80} />
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex gap-1'>
                                            <Skeleton containerClassName="flex-[0.5]"/>
                                        </div>
                                        <div className='flex gap-1'>
                                            <Skeleton containerClassName="flex-[0.5]"/>
                                        </div>
                                    </div>
                                </div>
                                <Skeleton height={40} borderRadius={'0.8rem'} className='book-btn' width={100}/>
                            </div>
                        </div>
                    </section>
                </section>
            )

        })
    )
}

export default SkeletonBarberCard