import {BsBoxArrowRight} from 'react-icons/bs'
import {BiUser} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {Logoutfunction} from '../actions/userActions'

function Navbar({auth : {user}, Logoutfunction}) {
    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
        if(user) {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    }, [user])

    return (
       <div className="w-full h-20 flex px-10 py-4 items-center justify-between bg-sky-400 mb-8">
            <Link to='/' className='text-2xl font-bold text-white'>Support Desk</Link>
            
            {isUser ? <button onClick={() => Logoutfunction()} className='btn bg-zinc-600 border-none text-white'><BsBoxArrowRight className='mr-4'/> Log Out</button> : (
                <div className='flex inline-flex justify-center text-white'>
                <Link to='/login' className='flex inline-flex justify-center items-center mr-10'>
                    <BsBoxArrowRight className='text-2xl font-bold mr-2'/>
                    <h1 className='font-bold text-lg'>Login</h1>
                </Link>
                <Link to='/register' className='flex inline-flex justify-center items-center'>
                    <BiUser className='text-2xl font-bold mr-2'/>
                    <h1 className='font-bold text-lg'>Register</h1>
                </Link>
                
            </div>
            )}
       </div>
    )
}

const mapPropstoState = state => ({
    auth: state.auth
})

export default connect(mapPropstoState, {Logoutfunction})(Navbar)