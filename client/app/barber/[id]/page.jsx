import Link from 'next/link'

function book({params}) {
    const id = params.id


  return (
    <main>
      <p>This page will show barber with ID of <strong>{id}</strong>.</p>
      <h2 className="global-title">Barber Profile</h2>
            <h3>Name</h3>
            <h3>Rating</h3>            
            <h3>Address</h3>            
            <h3>About me</h3>    

            <h2 className="global-title global-margin-top">Barber</h2>
            <h2 className="global-title global-margin-top">Cuts and Prices</h2>
            <Link href={`/barber/${id}/book`}>
                <h2 className="global-title global-margin-top button">Book Now</h2>
            </Link>

    </main>
  );
}

export default book;
