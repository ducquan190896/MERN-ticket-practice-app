export const Createticket = (formdata, token) => async (dispatch) => {
    try {
        console.log(formdata, token)
        const res = await fetch('http://localhost:5000/api/tickets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formdata)
            
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: 'create_ticket',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'ticket_error',
            payload: err.message
        })
    }
}

export const ticketReset = () => (dispatch) => {
    dispatch({
        type: 'ticketReset'
    })
}

export const Gettickets = (token) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/tickets/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        dispatch({
            type: 'get_tickets',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'ticket_error',
            payload: err.message
        })
    }
}
export const Updateticket = (token, ticketid) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/tickets/${ticketid}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: 'closed'})
        })
        const data = await res.json()
        dispatch({
            type: 'update_ticket',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'ticket_error',
            payload: err.message
        })
    }
} 
export const Getticket = (token, ticketid) => async (dispatch) => {
    try {
        console.log(token, ticketid)
        const res = await fetch(`http://localhost:5000/api/tickets/${ticketid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
                
            }
            
        })
        const data = await res.json()
        dispatch({
            type: 'get_ticket',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'ticket_error',
            payload: err.message
        })
    }
} 