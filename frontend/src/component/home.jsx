import {Link} from 'react-router-dom'

function Home() {
    return (
        <div className="w-2/3 mx-auto flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">What do you need help with</h1>
            <Link to='/createticketform' className='my-8 btn btn-info w-full focus:outline-none text-white'>Create New Ticket</Link>
            <Link to='/ticketpage' className='mb-10 btn btn-info w-full focus:outline-none text-white'>View My Tickets</Link>
        </div>
        
    )
}

export default Home