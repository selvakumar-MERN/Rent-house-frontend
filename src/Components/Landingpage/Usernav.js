import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Mycontext from '../../Context';
import './Usernav.css'
import axios from 'axios';
import { getcart } from '../utlis/Apis';
import user from '../Assests/user.svg'

function Usernav(props) {
    const { userdata, item, setitem } = useContext(Mycontext)


    useEffect(() => {
        const email = { email: userdata.email }
        axios.post(getcart, email)
            .then(res => {
                res.data.map(items => items.hours = 1)
                setitem([...res.data])
            })
            .catch(error => {
                return (error)
            })
    }, [userdata.email, setitem])

    const logout = () => {
        window.localStorage.clear()
        window.location.reload()

    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
                <div className='container mt-2'>
                    <h2 className='text-info text-decoration-none '>Rent House</h2>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">

                        {!userdata.name ? <ul className="navbar-nav mx-4 ml-auto ">
                            <li className="nav-item active mx-3">
                                <Link to='/'
                                    className="nav-link text-primary" ><i class="fa fa-home" aria-hidden="true"></i> <span className="sr-only">(current)</span>
                                </Link>
                            </li>

                            <li className="nav-item mx-3">
                                <Link to='/products'
                                    className="nav-link text-primary" >Products
                                </Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link to='/contactus'
                                    className="nav-link text-primary">contact Us
                                </Link>
                            </li>
                            <li className="mx-3">
                                <button className='logbtn' > <Link to='/login'
                                    className="nav-link text-white">Login
                                </Link></button>
                            </li>
                            <li className="nav-item mx-3">
                                <button className='logbtn' > <Link to='/register'
                                    className="nav-link text-white">Register
                                </Link></button>
                            </li>



                        </ul> :
                            <ul className="navbar-nav mx-4 ml-auto ">
                                <li className="nav-item active mx-3">
                                    <Link to='/'
                                        className="nav-link text-primary" ><i class="fa fa-home" aria-hidden="true"></i> <span className="sr-only">(current)</span>
                                    </Link>
                                </li>

                                <li className="nav-item mx-3">
                                    <Link to='/products'
                                        className="nav-link text-primary" >Products
                                    </Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link to='/cart'
                                        className="nav-link text-primary"><i class="fa fa-shopping-cart cart" aria-hidden="true"><span className='supertext'>{item.length}</span></i>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown no-arrow" >
                                    <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-primary">{userdata.name}</span>
                                        <img className="img-profile rounded-circle" height={"25px"} width={"25px"} src={user} alt='...'></img>
                                    </a>
                                    {/* <!-- Dropdown - User Information --> */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        {userdata.role === 'admin' ? <Link to='/admin/adminpage' className="dropdown-item" href="/">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Dashboard
                                        </Link> :
                                            <Link to='/myorder' className="dropdown-item" href="/">
                                                <i className="fas fa-shopping-cart fa-sm fa-fw mr-2 text-gray-400"></i>
                                                My orders
                                            </Link>}
                                        <Link to='/profile' className="dropdown-item">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to='/' className="dropdown-item" href="/" data-toggle="modal" data-target="#logoutModal" onClick={logout}>
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </Link>

                                    </div>
                                </li>
                            </ul>}
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Usernav;