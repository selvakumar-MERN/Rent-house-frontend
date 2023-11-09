import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Privateroutes(props) {
    const tokenvalue = window.localStorage.getItem("usertoken")
    return (
        <div>
        {tokenvalue ? <Outlet/> : <Navigate to={'/login'}/> }
     </div>
    );
}

export default Privateroutes;