import {Gettickets} from '../actions/ticketActions'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'

import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"


function Ticketpage({auth: {user, userSuccess}, Ticket: {tickets, ticket, ticketSuccess, ticketError}, Gettickets}) {

    useEffect(() => {
        Gettickets(user.token)
    }, [user])

    return (
        <div className="w-2/3 flex flex-col items-center justify-center mx-auto">
            <h1 className="font-bold text-4xl mb-6">Tickets</h1>
            <div className="w-full flex items-center justify-start bg-zinc-400 py-2 rounded-lg my-2">
                <h2 className="w-1/4 font-bold text-lg text-center">Date</h2>
                <h2 className="w-1/4 font-bold text-lg text-center">Products</h2>
                <h2 className="w-1/4 font-bold text-lg text-center">Status</h2>
            </div>
            <AnimatePresence>
            {tickets && tickets.map(ticketitem => {
                return (
                <motion.div  initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} key={ticketitem._id} className="w-full flex items-center justify-start bg-zinc-400 py-2 rounded-lg my-2">
                    <h2 className="w-1/4 text-center font-bold text-lg"><Moment date={ticketitem.updatedAt}/></h2>
                   
                    <h2 className="mx-auto w-1/4 font-bold text-lg text-center">{ticketitem.product}</h2>
                    <div className='w-1/4 flex items-center justify-center'>
                        <h2 className="w-20 font-bold text-lg badge badge-success">{ticketitem.status}</h2>
                    </div>
                    <div className='w-1/4 flex items-center justify-center'>
                        <Link  to={`/singleticketview/${ticketitem._id}`} className='w-20 btn btn-info'>View</Link>
                    </div>
                </motion.div>
                )
            })}
            </AnimatePresence>
           
        </div>
    )
}

const mapPropstoState = state => ({
    auth: state.auth,
    Ticket: state.Ticket
})

export default connect(mapPropstoState, {Gettickets})(Ticketpage)