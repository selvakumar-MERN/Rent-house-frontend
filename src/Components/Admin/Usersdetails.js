import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteuser, getusers, updatestatus } from '../utlis/Apis';
import '../Order/Order.css'
import './Usersdetails.css'
import{FaRegTrashAlt,FaArrowUp, FaFolderOpen} from 'react-icons/fa'

function Usersdetails(props) {
    const [users, setusers] = useState([])
    const[data,setdata]=useState("")
   

    const datechange=(orders)=>{
        const newdata = orders.map((item) => {
            return {
                ...item, orderedDate: new Date(item.orderedDate).toLocaleString(),
                fromDate: new Date(item.fromDate).toLocaleDateString(), toDate: new Date(item.toDate).toLocaleDateString(),
            }
        })
        setusers(newdata)
    }

    useEffect(() => {
        axios.get(getusers)
            .then((res) => {
                const { data } = res
                datechange(data)

            })
            .catch((error) => {
                return (error)
            })

    }, [])
    

    const updateUser =(id)=>{
       
          const value ={status: document.getElementById("status").value,
                        id:id}
                        
          axios.post(updatestatus ,value)
          .then((res)=>{
            const{data}=res.data;
            data.map(item=> item.orderId===id ? item.status=value.status: null)
           datechange(data)
        })
          .catch((error)=>{
            return (error)
          })
    }

    const deleteUser = (id) => {
        axios.delete(`${deleteuser}/${id}`)
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
        <div className='container'>
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
                        <th></th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((items) => {
                        return (
                            <tr key={items._id} className='text-center' style={{fontSize:'13px'}}>
                                <td>{items.userName}</td>
                                <td>{items.userEmail}</td>
                                <td>{items.productName}</td>
                                <td>{items.quantity}</td>
                                <td>{items.fromDate}
                                    <span>--{items.fromTime}</span>   </td>
                                <td>{items.toDate}
                                    <span>--{items.toTime}</span></td>
                                <td style={{ fontWeight: "bold" }}>{items.status === "Order placed" ? <span style={{ color: 'darksalmon' }}>{items.status}</span> : <span style={{ color: 'darkgoldenrod' }}>{items.status}</span>}</td>
                                <td className='status-area'> <select id='status'>
                        <option>Order placed</option>
                        <option>In Transist</option>
                        <option>Delivered</option>
                        <option>Returned</option>
                     </select>
                     <button type="button" class="btn btn-warning" style={{padding:'0.1rem 0.2rem'}} onClick={()=>updateUser(items.orderId)} ><FaArrowUp/> </button>
                     </td>
                                <td>
                                <button className='btn btn-warning'  data-toggle="modal" data-target="#exampleModal" onClick={()=>setdata(items)} ><FaFolderOpen /></button>
                                
                                    <button className='btn btn-warning mx-2' onClick={() => deleteUser(items._id)}><FaRegTrashAlt/></button>
                                </td>
                            </tr>
                        )
                    })

                    }
                </tbody>
            </table>
                   
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Order Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div className='d-flex-column mx-3'>
        <div className='d-flex justify-content-between'>
                     <label>Product Name</label>
                     <span>{data.productName}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>User</label>
                     <span>{data.userName}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Email</label>
                     <span>{data.userEmail}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Ordered On</label>
                     <span>{data.orderedDate}</span>
            </div>
           
            <div className='d-flex justify-content-between'>
                     <label>Delivery address</label>
                     <span>{data.deliveryAddress}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Payment</label>
                     <span style={{color:'green',fontWeight:'bold'}}>{data.payment}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Status</label>
                     <span>{data.status}</span>
            </div>
           
           

        </div>
      </div>
      <div class="modal-footer">
     
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        </div>

    );
}

export default Usersdetails;