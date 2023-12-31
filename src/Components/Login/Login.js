import React from 'react';
import axios from 'axios';
import {useEffect, useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import { login } from '../utlis/Apis';


function Login(props) {
    const [sucess, setsucess] = useState("")
    const [error, seterror] = useState("")
    const [users, setuser] = useState({})
    const [load,setload]=useState(true)

        useEffect(() => {
        if (window.localStorage.getItem('usertoken')) {
            window.location.href = '/'
        }
        else if (window.localStorage.getItem('admintoken')) {
            window.location.href = '/'
        }

    }, [])

    const handler = (e) => {
        const { name, value } = e.target;
        setuser({ ...users, [name]: value })

    }
    const submit = (e) => {
        e.preventDefault();
        //API fetching     
        axios.post(login, users)
            .then((res) => {
                seterror("")
                console.log(res.data.token)
                if(res.data.user==="admin"){
                        setsucess("Login sucessfull")
                        setload(true)
                        window.localStorage.setItem("admintoken", res.data.token)
                        window.location.href = "/admin/adminpage"
                }
                else{
                setsucess("Login sucessfull")
                setload(true)
                window.localStorage.setItem("usertoken", res.data.token)
                window.location.href = "/products"
                
                }



            })
            .catch((error) => {

                setsucess("")
                setload(true)
                const { data } = error.response;


                seterror(data)

            })

    }
    return (
    
            <div className='emailarea'>
               
                                    <form className="form">
                                    <h3>Login</h3>
                                        <div className="label">
                                            <label>Email address</label>
                                            </div>
                                            <div>
                                            <input type="email" className="input" onChange={handler} name='email' placeholder="Enter Email Address..."></input>
                                        </div>
                                        <div className="label">
                                        <label>Password</label>
                                            </div>
                                            <div>
                                            <input type="password" className="input" onChange={handler} name='password' placeholder="Password"></input>
                                        </div>
                                        <div className="label">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input"></input>
                                                <label className="custom-control-label" >Remember
                                                    Me</label>
                                            </div>
                                            {error !== null ? <span className='text-danger'>{error}</span> : null}
                                            {sucess !== null ? <span className='text-success'>{sucess}</span> : null}
                                        </div>
                                        <button onClick={(e)=>{submit(e);setload(false)}} className="btn btn-primary btn-block">
                                    { load ? <span> Login</span> : <div className='spinner-border text-primary ' role='status'>
                                             </div>}
                                    </button>
                                        <div className='loginfooter'>
                                            <div >
                                            <span>Not a User ? <Link to='/register'>Register</Link></span>
                                            </div>
                                            <div>
                                            <span><Link to='/register'>Forgot Password</Link></span>   
                                            </div>
                                        </div>
                                        <div className='mt-2'>
                                            <h6>
                                                admin email- admin@gmail.com
                                                password- admin123
                                                user email- selva@gmail.com
                                                password- selva123
                                            </h6>
                                        </div>

                                    </form>

                                </div>
                           
                        
                   


    );
}

export default Login;
