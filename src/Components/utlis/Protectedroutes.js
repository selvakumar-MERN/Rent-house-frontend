import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Protectedroutes(props) {
    const tokenvalue = window.localStorage.getItem("admintoken")
    
    return (
        <div>
           {tokenvalue ? <Outlet/> : <Navigate to='/'/> }
        </div>
    );
}

export default Protectedroutes;