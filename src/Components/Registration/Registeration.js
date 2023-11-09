import React, { useState } from 'react';
import '../Login/Login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Usernav from '../Landingpage/Usernav';
import { register } from '../utlis/Apis';

function Registeration(props) {
   
    const [fieldverify, setfield] = useState("")
    const [usermessage, setusermessage] = useState("");
    const [Users, setuser] = useState("")
    const handler = (e) => {
        const { name, value } = e.target;
        setuser({ ...Users, [name]: value })
        

    }

    const submit = (e) => {
        e.preventDefault()
        axios.post(register, Users)

            .then((res) => {

                const response = res.data
                setusermessage("")
                setfield(response)
            })
            .catch((error) => {
                console.log(error)
                if (Array.isArray(error.response.data.details)) {
                    setfield("")
                    const { details } = error.response.data
                    const { message } = details[0]
                    setusermessage(message)
                }
                else {
                    const response = error.response.data;
                    setusermessage(response)
                }
            })
    }
    return (
        
             <div>
            <Usernav/>
            <div className='emailarea'>
               
                                    <form className="form">
                                    <h3>Registration</h3>
                                        <div className="label">
                                            <label>Email address</label>
                                            </div>
                                            <div>
                                            <input type="email" className="input" onChange={handler} name='email' placeholder="Enter Email Address..."></input>
                                        </div>
                                        <div className="label">
                                            <label>Username</label>
                                            </div>
                                            <div>
                                            <input type="text" className="input" onChange={handler} name='name' placeholder="Username"></input>
                                        </div>
                                        <div className="label">
                                        <label>Password</label>
                                            </div>
                                            <div>
                                            <input type="password" className="input" onChange={handler} name='password' placeholder="Password"></input>
                                        </div>
                                        <div className="label">
                                        <label>Confirm password</label>
                                            </div>
                                            <div>
                                            <input type="password" className="input" onChange={handler} name='confirmPassword' placeholder="Password"></input>
                                        </div>
                                        <div className="label">
                                        {usermessage !== null ? <span className='text-danger'>{usermessage}</span> : null}
                                        {fieldverify !== null ? <span className='text-success'>{fieldverify}</span> : null}
                                        </div>
                                        <button onClick={submit} className="formbutton">
                                            Register
                                        </button>
                                       <div className='loginfooter'>
                                        <span>Already a User ? please <Link to='/login'>Login</Link></span>
                                       </div>

                                    </form>

                                </div>
                            </div>
                        
            
        
    );
}

export default Registeration;