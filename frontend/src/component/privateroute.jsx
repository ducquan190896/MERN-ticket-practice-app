import { Outlet, Navigate } from "react-router-dom";
import loginform from "./loginform";
import {connect} from 'react-redux'
import { useEffect, useState } from "react";


function Privateroute({auth: {user}}) {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if(user) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [user])

    return (
        <>
        {user ? <Outlet/> : <Navigate to='/login'/>}
        </>
    )


}

const mapPropstoState = state => ({
    auth: state.auth
})

export default connect(mapPropstoState)(Privateroute)