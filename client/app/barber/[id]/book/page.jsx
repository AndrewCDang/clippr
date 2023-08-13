import Link from 'next/link'

function book({params}) {
    const id = params.id


  return (
    <main>
      <p>This page will show barber with ID of <strong>{id}</strong>.</p>
      <h2 className="global-title">Appointment Details</h2>
            <h3>Hair-Cut</h3>
            <h3>Time</h3>            
            <h3>Price</h3>            

            <Link href={`/`}>
                <h2 className="global-title global-margin-top button">Book / Confirm</h2>
            </Link>

    </main>
  );
}

export default book;
