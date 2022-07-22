export const Register = (formdata) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: 'register',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'user_error',
            payload: err.message
        })
    }
}

export const userReset = () => (dispatch) => {
    dispatch({
        type: 'user_reset'
    })
}

export const Logoutfunction = () => (dispatch) => {
    dispatch({
        type: 'logout'
    })
}

export const Login = (formdata) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5000/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: 'login',
            payload: data
        })
    } catch (err) {
        dispatch({
            type: 'user_error',
            payload: err.message
        })
    }
}