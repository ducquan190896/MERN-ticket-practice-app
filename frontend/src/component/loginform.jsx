import {Login ,userReset, Logoutfunction} from '../actions/userActions'
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'

function Loginform({Login, userReset, auth, Logoutfunction}) {
    const [formdata, setFormdata] = useState({
       
        email: '',
        password: ''
    })
    const {email, password} = formdata
    const navigate = useNavigate()
    
    useEffect(() => {
        
        if(auth.user) {
            navigate('/ticketpage')
        }
        userReset()
    }, [auth.user])

    const onSubmit = (e) => {
        e.preventDefault()
        if( !email || !password) {
            return toast.error('please fill all information required')
        }
       
        Login(formdata)
        console.log(formdata)
        setFormdata({
            
            email: '',
            password: ''
        })
    }
    const onChange = (e) => {
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    return (
        <div className='w-2/3 mx-auto flex flex-col items-center justify-center' >
            <h1 className='text-4xl font-bold  my-4'>Log In</h1>
            <form className='my-6 flex flex-col items-center justify-center w-full' onSubmit={onSubmit}>
               
                <input placeholder='enter your email' type="email" name='email' onChange={onChange} value={email} className="my-2 w-1/2 focus:outline-none input input-bordered" />
                <input placeholder='enter your password ' type="password" name='password' onChange={onChange} value={password} className="my-2 w-1/2 focus:outline-none input input-bordered" />
               
                <button className=' my-4 btn btn-info w-1/2' type='submit' onSubmit={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

const mapPropstoState = state => ({
    auth: state.auth
})


export default connect(mapPropstoState, {Login, userReset, Logoutfunction})(Loginform)