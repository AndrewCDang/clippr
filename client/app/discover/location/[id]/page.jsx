"use client"
import './discover.css'
import Link from 'next/link'
import { useState, useEffect} from 'react'
import { useParams } from 'next/navigation'; // Use next/navigation instead of next/router
import { DistanceMatrixService, geoco} from '@react-google-maps/api'
import { useAppContext } from '../../../Context/store'



export async function getBarbers() {
    const res = await fetch('http://localhost:4000/barbers/', {
        next: {
          revalidate: 0
        }
      })
    const barber = await res.json();
  
    return barber
  }

  
  export default function discover(){
  const { state } = useAppContext()

  const [travelDistance, setTravelDistance ] =  useState()
  const {id} = useParams();
  const address = id.replace(/-/g,' ')
  const inputStreet = id.replace(/-/g,'+')

    // const barber = await getBarbers()

    const getDistanceFromAddresses = async (originStreet, destCity) => {
      try {
          const originResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${originStreet},+${'london'}&key=AIzaSyC43wYCk49X0y4RdsCfVCkLOMZP1HDA_Q4`);
          const originData = await originResponse.json();

          const destResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${destCity},+${'london'}&key=AIzaSyC43wYCk49X0y4RdsCfVCkLOMZP1HDA_Q4`);
          const destData = await destResponse.json();

          
          if (originData.status === "OK" && destData.status === "OK") {
              const originLatLng = `${originData.results[0].geometry.location.lat},${originData.results[0].geometry.location.lng}`;
              const destLatLng = `${destData.results[0].geometry.location.lat},${destData.results[0].geometry.location.lng}`;

              const distanceResponse = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originLatLng}&destinations=${destLatLng}&key=AIzaSyC43wYCk49X0y4RdsCfVCkLOMZP1HDA_Q4`);
              const distanceData = await distanceResponse.json();

              if (distanceData.status === "OK") {
                  // alert(`Distance between addresses: ${distanceData.rows[0].elements[0].distance.text}`);
                  return (distanceData.rows[0].elements[0].distance.text)
              } else {
                  alert("Error calculating distance");
              }

          } else {
              alert("Error geocoding addresses");
          }

      } catch (error) {
          console.error("Error fetching data:", error);
          alert("There was an error processing your request. Please try again.");
      }
  };

 
      const [barber, setBarber] = useState(null);

      useEffect(() => {
          const fetchBarbers = async () => {
              const data = await getBarbers();
              setBarber(data);
          };

          fetchBarbers();
      }, []);

      // useEffect(() => {
      //     if (!barber) return; // Ensure barber data is available.

      //     try{
      //       const test = async () => {
      //         const originResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${barber[0].address.street.replace(/ /g,'+')},+${'london'}&key=AIzaSyC43wYCk49X0y4RdsCfVCkLOMZP1HDA_Q4`);
      //         const originData = await originResponse.json();
  
      //         if (originData.status === "OK"){
      //           console.log(originData.results[0].geometry.location.lat)
      //         }
      //       }
      //       test()

      //     }catch(err){
      //       console.log(err)
      //     }

      //     // const fetchDistance = async () => {
      //     //     const distance = await getDistanceFromAddresses(inputStreet, barber[0].address.street.replace(/ /g,'+'));
      //     //     setTravelDistance(distance);
      //     // };

      //     // fetchDistance();
      // }, [barber]); // Depend on barber. This useEffect will run whenever barber changes.
      
    return (
        <main>
            <h1 className="mb-2">Discover your perfect barber</h1>
            <section className='flex flex-col gap-1 mb-24'>
              <h3>Barbers near: <a className='personalise-tags'>{address} </a>  </h3>
              {state.navData.booking.bookingDate.length>0 ?
                <div className='flex gap-2 items-center'>
                <h3>Date(s): </h3>
                {state.navData.booking.bookingDate.map((item,i)=>{
                  return (<a key={i} className='personalise-tags'>{item}</a>)
                })}
              </div> : null  }
              {state.navData.booking.bookingTime.time.hr ?
                <div className='flex gap-2 items-center'>
                <h3>Time: </h3>
                <a className='personalise-tags'>{state.navData.booking.bookingTime.range !== -1 ? `${state.navData.booking.bookingTime.time.hr}:${state.navData.booking.bookingTime.time.min} ±${state.navData.booking.bookingTime.range}hr`: 'Available all day' }</a>
              </div> : null  }
              {state.navData.personalise.ethnicity.length>0 ? 
              <div className='flex gap-2'>
                <h3>Hair type/style:</h3>
                {state.navData.personalise.ethnicity.map((item, i)=>{
                  return (<a key={i} className='personalise-tags'>{item}</a>)
                })}
              </div> : null}
            </section>


      <section className="flex-col flex gap-2 ">
          {
            barber ? barber.map((item, index)=>{
              return (
                <section key={index} className='flex-row flex gap-2'>
                <Link  className='width-fit' href={`/barber/${item.id}`}>
                  <div className='overflow-hidden rounded-2xl width-fit relative '>
                      <div className='flex flex-col items-center absolute right-2 top-2'>
                        <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs leading-tight'><strong className='text-lg leading-tight'>{item.reviews.rating}</strong>{`/5`}</h3>
                        <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-xs'>{`(${item.reviews.amount})`}</h3>
                      </div>
                      <div className='home-barber relative overflow-hidden width-fit'>
                          <div className='absolute left-0 bottom-0 flex flex-col m-2'>
                              <h3 className=' drop-shadow-2xl z-10 text-white custom-text-shadow'>{`${item.first_name} ${item.surname}`}</h3>
                              <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>{`${item.address.street}`}</h3>
                              <h3 className='drop-shadow-2xl z-10 text-white custom-text-shadow text-sm font-light'>X miles away</h3>
                          </div>

                          <img className='home-b-image' src={`${item.profile}`} alt='barber profile img'></img>
                      </div>
                      <div>
                      </div>
                  </div>
                  
                </Link>
                <div className='flex flex-col gap-2 justify-between mt-2 mb-2'>
                  <div>
                    <div className='flex flex-row gap-4'>
                      {item.deals.length >0 ? <div className='deal-tag'>Deal</div> : null}
                      {item.subscription.length >0 ? <div className='subscribe-tag'>Subscribe</div> : null}
                      {item.mentalCare ==true ? <div className='mentalCare-tag'>Mindful Cuts</div> : null}
                    </div>

                    {item.deals.length>0 ? 
                    <div>
                      {item.deals.map((item,index)=>{
                        return <h3 key={index}><em>{`"${item}"`}</em></h3>
                      })}
                    </div> : null}
                    {item.subscription.length>0 ? 
                    <div>
                      {item.subscription.map((subItem,index)=>{
                        return <h3 key={index}><em>{`"£${subItem.cost}pm ~ ${subItem.deal}"`}</em></h3>
                      })}
                    </div> : null}
                    {item.mentalCare ==true ? 
                    <div>
                    </div> : null}
                  </div>

                  <div>
                  {item.service.length>0 ? 
                    <div>
                      <div className='font-semibold text-sm '>Popular Cuts</div>
                      <div className='flex flex-row gap-4'>
                        {item.service.map((item,index)=>{
                          if(index<2){
                          return <h3 key={index}>{`£${item.price} ${item.name}`}</h3>
                          }
                        })}
                      </div>
                    </div> : null}
                    <button className='book-btn'>
                        <Link href={`/barber/${item.id}`} >
                        Book now                      
                      </Link>
                    </button>
                  </div>
                </div>
                
                </section>
              )
            })
          : null}
        </section>
          
        </main>
    )
}