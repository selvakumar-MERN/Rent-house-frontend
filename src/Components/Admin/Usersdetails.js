import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Usernav from '../Landingpage/Usernav';

function Usersdetails(props) {
    const [users, setusers] = useState([])

    useEffect(() => {
        axios.get('https://rent-house-backend.onrender.com/admin/users')
            .then((res) => {
                const { data } = res
                setusers(data)

            })
            .catch((error) => {
                return (error)
            })

    }, [])

    const deleteUser = (id) => {
        axios.delete(`https://rent-house-backend.onrender.com/user/deleteUser/${id}`)
            .then((res) => {
                if (res.data.deletedCount === 1) {
                    setusers(users.filter((user) => user._id !== id))
                }
            })
            .catch((error) => {
                return (error)
            })

    }
    return (
        <div>
            <Usernav />
            <div className='container mt-4'>
                <h4>Customers</h4>
                <table className='table table-striped table-responsive'>
                    <thead >
                        <tr className='text-center'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((items) => {
                            return (
                                <tr key={items._id} className='text-center'>
                                    <td>{items.userName}</td>
                                    <td>{items.userEmail}</td>
                                    <td>{items.productName}</td>
                                    <td>{items.quantity}</td>
                                    <td>{items.fromDate}
                                     <span className='mx-1'>Time: {items.fromTime}</span>   </td>
                                    <td>{items.toDate}
                                    <span className='mx-1'> Time: {items.toTime}</span></td>
                                    <td style={{fontWeight:"bold"}}>{items.status==="Order placed" ? <span style={{color:'darksalmon'}}>{items.status}</span> : <span style={{color:'darkgoldenrod'}}>{items.status}</span> }</td>
                                    <td>
                                        <button className='btn btn-warning mx-2' onClick={() => deleteUser(items._id)}>Update</button>
                                    </td>
                                </tr>
                            )
                        })

                        }
                    </tbody>
                </table>
            </div>
            <div className='my-5'>
                <Footer />
            </div>

        </div>
    );
}

export default Usersdetails;