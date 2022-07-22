import {Getticket, Updateticket} from '../actions/ticketActions'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Moment from 'react-moment'
import Modal from 'react-modal'
import {Addnote, Getnotes, noteReset} from '../actions/noteActions' 
import { toast } from 'react-toastify'

Modal.setAppElement('#root')

function Singleticketview({Addnote, Getnotes, noteReset, Getticket, Updateticket, Ticket : {ticket, tickets, ticketSuccess, ticketError}, auth, note: {notes}}) {
    const [isOpen, setIsOpen] = useState(false)
    const openfunction = () => {
        
        setIsOpen(prevState => !prevState)
        console.log('hello')
    }
    const customStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          },
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            outline: 'none',
            padding: '20px',
          }
      
    }
    const {ticketid} = useParams()

    useEffect(() => {
        console.log(ticketid)
        if(auth.user) {
            Getticket(auth.user.token, ticketid)
            Getnotes(auth.user.token, ticketid)
        }
    }, [ticketid])

    const [formdata, setFormdata] = useState('')
    

    const onChange = (e) => {
        setFormdata(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formdata)
        if(auth.user) {
            Addnote(auth.user.token, ticketid, {text: formdata})
            toast.success('note is added successfully')
            noteReset()
            openfunction()
        }
        setFormdata('')
    }

    return (
        <>
        {ticket && (
            <div className='w-2/3 flex flex-col items-left justify-center mx-auto relative'>
                <div className=' my-2 flex flex-inline items-center justify-between w-full'>
                    <h1 className=' font-bold text-2xl'>TicketID: {ticket._id}</h1>
                    <div className={ticket.status === 'new' ? 'badge badge-info w-20 h-6' : 'badge bg-red-900 w-20 h-6'}>{ticket.status}</div>
                </div>
                <h1 className='text-lg font-bold my-2'><Moment date={ticket.updatedAt}/></h1>
                <h1 className='text-lg font-bold my-2 border-b-4 border-b-zinc-400 pb-4'>Product: {ticket.product}</h1>
                <div className='my-4 rounded-lg py-4 px-4 border-2 border-gray-400 bg-zinc-400 flex flex-col items-left justify-center w-full'>
                    <h1 className='text-lg font-bold'>Description of Issue</h1>
                    <p className='text-lg mt-2'>{ticket.description}</p>
                </div>
                <h1 className='my-2 text-2xl font-bold'>Notes</h1>
                <button type='button' onClick={openfunction} className='my-2 btn btn-primary w-32 py-2'>Add Note</button>

                <Modal isOpen={isOpen} onRequestClose={openfunction} contentLabel='notemodal' style={customStyle}>
                    <div className='relative flex flex-col items-left justify-center'>
                    <h1 className='text-2xl font-bold my-2'>Add Note</h1>
                    
                    <button className='absolute -top-4 -right-4 btn btn-info w-14'>Close</button>
                    <form onSubmit={onSubmit}>
                    <input type="text" name='text' value={formdata} onChange={onChange} className='input input-bordered rounded-lg focus:outline-none w-full' placeholder='Note text...'/>
                    <button type='submit' className='btn btn-info mt-4'>Submit</button>
                    </form>
                    </div>
                </Modal>    

                {notes && notes.map(noteitem => 
                    <div key={noteitem._id} className=' rounded-lg border-2 border-gray-400 my-2 bg-slate-200 py-4 px-8 flex flex-col items-left justify-center relative'>
                        <h1 className='text-lg font-bold my-2'>Note from {auth.user.name}</h1>
                        <p className='my-2 text-lg'>{noteitem.text}</p>
                        <p className='absolute top-8 right-6'><Moment data={noteitem.updatedAt}/></p>

                    </div>
                
                )}

                <button onClick={() => Updateticket(auth.user.token, ticketid)} className='btn bg-red-900 my-4 w-full py-2'>Close Ticket</button>

            </div>
            )}
        </>
       
    )
}

const mapPropstoState = state => ({
    auth: state.auth,
    Ticket: state.Ticket,
    note: state.note
})

export default connect(mapPropstoState, {Getticket, Updateticket, Addnote, Getnotes, noteReset})(Singleticketview)