export const Getnotes = (token, ticketid) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:5000/api/tickets/${ticketid}/notes/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: 'get_notes',
            payload: data
        })
    } catch  (err) {
        dispatch({
            type: 'note_error',
            payload: err.message
        })
    }

}

export const Addnote = (token, ticketid, formdata) => async (dispatch) => {
    try {
        console.log(token, ticketid, formdata)
        const res = await fetch(`http://localhost:5000/api/tickets/${ticketid}/notes/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
        
        const data = await res.json()
        console.log(data)
        dispatch({
            type: 'add_note',
            payload: data
        })
    } catch  (err) {
        dispatch({
            type: 'note_error',
            payload: err.message
        })
    }

}

 export const noteReset = () => (dispatch) => {
    dispatch({
        type: 'note_reset'
    })
}