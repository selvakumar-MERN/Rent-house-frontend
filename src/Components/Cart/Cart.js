import React, { useContext, useState } from 'react';
import Usernav from '../Landingpage/Usernav';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Mycontext from '../../Context';
import Calender from '../Calender';



function Cart(props) {

    const [amount, setamount] = useState('')
    const { item,setitem,userdata } = useContext(Mycontext)
    
    const [user, setusers] = useState("")

    const address=()=>{

    }
    
   

    //increase quantity
    const increase = (id) => {
        const find = item.findIndex((value) => value._id === id)
        if (item[find].quantity !== 5) {
            item[find].quantity += 1
        }
        setitem([...item])
    }

    //decrease quantity
    const decrease = (id) => {
        const find = item.findIndex((value) => value._id === id)
        if (item[find].quantity !== 1) {
            item[find].quantity -= 1
        }
        setitem([...item])
    }

    //remove cart item
    const removeitem = (id) => {

        axios.post(`https://rent-house-backend.onrender.com/user/cart/${id}`,{email:userdata.email})
            .then(res => {
                const find = item.findIndex((value) => value._id === id)
                item.splice(find, 1)
                setitem([...item])
               
            })
            .catch(error => {
                return (error)
            })
       
    }
  console.log(item)
    //total amount
   
  const total = item.reduce((a, b) => {
       return (a = a + b.productPrice * b.quantity * b.hours);

   }, 0);

   const handler=(e)=>{
         const details={
            email: userdata.email,
            address: e.target.value
         }
         setusers(details)
         
   }

    //razor pay payment handler
    const handleRazorpay = (data) => {
        const options = {
            key: "rzp_test_gXkfVOK0D8Ct2S",
            amount: Number(data.amount),
            currency: data.currency,
            name: "Rent House",
            description: "xyz",
            order_id: data.id,
            handler: function (response) {
                console.log(response)

                axios.post('https://rent-house-backend.onrender.com/product/verify', { response: response })
                    .then(res => {

                        //signature verification and creating the customer record            
                        if (res.data.message === 'signature valid') {
                            axios.post('https://rent-house-backend.onrender.com/user/orders', user)
                                .then(res => {
                                    //  setcart("")
                                    return res
                                })
                                .catch(error => {
                                    return error
                                })
                        }

                    })
                    .catch(error => {
                        return error
                    })

            }
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open()
    }
    const handlepayment = (e) => {
        e.preventDefault()
        
        const data = { amount: amount }

        axios.post('https://rent-house-backend.onrender.com/product/payment', data)
            .then(res => {
                handleRazorpay(res.data.data)
            })
            .catch(error => {
                return (error)
            })
    }
    return (
        <div>
            <Usernav />
            <div className='container'>
                <div className='row'>
                    <h2 className='mt-2'>Cart</h2>
                </div>
                {item.length > 0 ? <div>
                    <table className='table table-responsive-sm'>
                        <thead>
                            <tr style={{textAlign:'center'}}>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Date</th>
                                <th>Hours</th>
                                <th>Total Amount</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>

                            {item.map(items =>
                                <tr style={{textAlign:'center'}}>
                                    <td className='d-flex'><img src={items.productImage} height={"100px"} width={"100px"} alt='...'></img><span className='ml-2'>{items.productName}</span></td>
                                    <td>{items.productPrice}</td>
                                    <td className='d-flex-column'><i onClick={() => { decrease(items._id) }} style={{ border: "none",color:'lightcoral',padding:'1px',cursor:'pointer'}} class="fa fa-minus-circle" aria-hidden="true"></i><span>{items.quantity}</span><i onClick={() => { increase(items._id) }} style={{ border: "none",color:'lightcoral',padding:'1px',cursor:'pointer'}} class="fa fa-plus-circle" aria-hidden="true"></i></td>
                                    <td ><Calender id={items._id} /></td>
                                    <td>{items.hours}</td>
                                    <td>{items.productPrice * items.quantity * items.hours}</td>
                                    <td><button className='btn btn-danger' onClick={() => { removeitem(items._id) }}><i class="fa fa-trash" aria-hidden="true"></i></button></td>

                                </tr>)}
                        </tbody>

                    </table>
                    <h4>Total : ₹{total}/-</h4>
                    <button className='btn btn-warning'  data-toggle="modal" data-target="#exampleModal" >Buy now</button>
                </div> : <h4>Cart is Empty</h4>}
            </div>
            <div className='my-5'>
                <Footer />
            </div>
           { /* Modal */}
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Buy</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div>
            <table className='table'>
                <thead>
                    <tr style={{textAlign:'center'}}>
                        <td>Products</td>
                        <td>Hours</td>
                        <td>Quantity</td>
                    </tr>
                </thead>
                <tbody>
                {item.map(items=> <tr style={{textAlign:'center'}}>
                    <td>{items.productName}</td>
                    <td>{items.hours}</td>
                    <td>{items.quantity} No's</td>
                    <td>{items.productPrice * items.quantity * items.hours}</td>
                </tr>
                )}
                </tbody>
            </table>
            
        </div>
        <span>Total : ₹<span style={{color:'green', fontWeight:'bold'}}>{total}</span>/-</span>
        <div>
        <label style={{fontWeight:'bold'}}>Delivery address</label>
        </div> 
        <div>
        <textarea rows={3} placeholder='Enter address' id='address' onChange={handler} style={{width:'100%', outline:'none'}}></textarea> 
        </div>
        <span><a href='/'   onClick={address}>Use Defaut address</a></span>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-warning" onClick={(e) => handlepayment(e, setamount(total))} >Check out</button>
        
      </div>
    </div>
  </div>
</div>
        </div>


    );
}

export default Cart;