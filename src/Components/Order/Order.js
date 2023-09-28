import React, { useContext, useEffect, useState } from 'react';
import Usernav from '../Landingpage/Usernav';
import Mycontext from '../../Context';
import axios from 'axios';
import './Order.css'

function Order(props) {
  const{userdata}=useContext(Mycontext)
    const[order,setorder]=useState("")
    const [item,setitem]= useState("")
    const handle=(items)=>{
          setitem(items)
    }

    useEffect(()=>{
      
        axios.post('https://rent-house-backend.onrender.com/user/getorder',{email:userdata.email})
        .then(res=>{
             setorder(res.data)
        })
        .catch(error=>{
            return error
        })
    },[userdata.email])
    return (
        <div>
            <Usernav/>
            {order.length>0 ? <div className='container'>
                <h3 className='mt-4'>My orders</h3>
               { order.map(items=> 
                 <div className='card m-3 mt-4' >
                    <h6 >{items.productName}</h6>
                     <div className='d-flex justify-content-between'>
                        <div>
                         <img alt='order' src={items.productImage} width={"50px"} height={"50px"}></img>
                         </div>
                         <div>{items.quantity} No's</div>
                         <span>{items.orderedDate}</span>
                         <span style={{fontWeight:"bold"}}>{items.status==="Order placed" ? <span style={{color:'darksalmon'}}>{items.status}</span> : <span style={{color:'darkgoldenrod'}}>{items.status}</span> }</span>
                         <span>{items.payment}</span>
                      </div>
                      <div className='d-flex justify-content-end'>
                     <button className='btn btn-secondary' onClick={()=>{handle(items)}} data-toggle="modal" data-target="#exampleModal" >Details</button>
                     </div>
                 
            </div>)}
            </div> : null}
            {/*!-- Modal --*/}
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{item.productName}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div className='d-flex-column mx-3'>
            <div className='d-flex justify-content-between'>
                     <label>Quantity</label>
                     <span>{item.quantity}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Ordered On</label>
                     <span>{item.orderedDate}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Rented from</label>
                     <span>{item.fromDate}{item.fromTime}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Rented upto</label>
                     <span>{item.toDate}{item.toTime}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Delivery address</label>
                     <span>{item.deliveryAddress}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Payment</label>
                     <span style={{color:'green',fontWeight:'bold'}}>{item.payment}</span>
            </div>
            <div className='d-flex justify-content-between'>
                     <label>Status</label>
                     <span>{item.status}</span>
            </div>
           
           

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}

export default Order;