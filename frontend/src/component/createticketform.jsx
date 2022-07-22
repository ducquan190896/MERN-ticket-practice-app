import {connect} from 'react-redux'
import {Createticket, ticketReset, Gettickets} from '../actions/ticketActions'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function Createticketform({auth : {user, userSuccess}, Ticket: {tickets, ticketSuccess}, Createticket, ticketReset, Gettickets}) {
    const [formdata, setFormdata] = useState({
        product: 'IPad',
        description: ''
    })
    const [userdata, setUserdata] = useState({
        name: '',
        email: ''
    })

    const {name, email} = userdata

    useEffect(() => {
        if(user) {
            setUserdata({
                name: user.name,
                email: user.email
            })
            Gettickets(user.token)
        }
    }, [user])

    const navigate = useNavigate()
      useEffect(() => {
            
        ticketReset()
            
    }, [tickets])

    const {product, description} = formdata
    
    const onSubmit = (e) => {
        e.preventDefault()
        if(user) {
            Createticket(formdata, user.token)
            ticketReset()
            toast.success('ticket is created successfully')
            navigate('/ticketpage')
        } else {
            toast.error('please logIn')
        }

        
        setFormdata({
            product: 'IPad',
            description: ''
        })
    }
    const onChange = (e) => {
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }


    return (
        <div className="w-2/3 flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl font-bold">Create New Ticket</h1>
            <form className='my-6 flex flex-col items-center justify-center w-full' onSubmit={onSubmit}>
                <div className='flex flex-col items-left justify-center my-2 w-1/2 mx-auto'>
                <label className='text-lg font-bol'>Customer Name</label>
                <input  type="text" name='name' disabled value={name} className=" my-2 w-full focus:outline-none input input-bordered" />
               </div>

               <div className='flex flex-col items-left justify-center my-2 w-1/2 mx-auto'>
                <label className='text-lg font-bol'>Customer Email</label>
                <input  type="email" name='email' disabled value={email} className=" my-2 w-full focus:outline-none input input-bordered" />
               </div>

               <div className='flex flex-col items-left justify-center my-2 w-1/2 mx-auto'>
                <label className='text-lg font-bol'>Product</label>
                
                <select className=" my-2 w-full focus:outline-none input input-bordered" name="product"  onChange={onChange}>
                    <option value="IPad">IPad</option>
                    <option value="IPhone">IPhone</option>
                    <option value="Macbook">MacBook</option>
                    <option value="IMac">IMac</option>
                </select>

               </div>

               <div className='flex flex-col items-left justify-center my-2 w-1/2 mx-auto'>
                <label className='text-lg font-bol'>Description</label>
                <input  type="text" name='description' onChange={onChange} value={description} className=" my-2 w-full focus:outline-none input input-bordered" />
               </div>
                
                <button className=' my-4 btn btn-info w-1/2' type='submit' onSubmit={onSubmit}>Submit</button>
            </form>    
        </div>
    )
}

const mapPropstoState = state => ({
    auth: state.auth,
    Ticket: state.Ticket
})

export default connect(mapPropstoState, {Createticket, ticketReset, Gettickets})(Createticketform)