import React from 'react';
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addproduct } from '../utlis/Apis';


function Addproduct(props) {
  const notify = () => toast("Product Added");
  const [product, setproduct] = useState({})

  const handler = (e) => {
    const { name, value } = e.target
    setproduct({ ...product, [name]: value })

  }

  const submit = (e) => {
    e.preventDefault()
    axios.post(addproduct, product)

      .then((res) => {
        notify()
        return (res)
      })
      .catch((error) => {
        return (error)
      })

  }
  return (

    <div className="container">

      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Add New Product</h1>
      </div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label >Product Name</label>
            <input type="text" className="form-control" name='productName' onChange={handler} placeholder="Name"></input>
          </div>
          <div className="form-group col-md-6">
            <label >Product Price</label>
            <input type="text" className="form-control" name='productPrice' onChange={handler} placeholder="Product price"></input>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label >category</label>
            <select className="form-control" name='category' onChange={handler}>
              <option selected>Choose...</option>
              <option>Furniture</option>
              <option>Appliances</option>
              <option>Electronics</option>
              <option>Fitness</option>
              <option>WFH Essentials</option>

            </select>
          </div>
          <div className="form-group col-md-6">
            <label >Product Image Url</label>
            <input type="text" className="form-control" name='productImage' onChange={handler} placeholder="Product Image Url"></input>
          </div>
        </div>
        <button type="button" onClick={(e) => { submit(e) }} className="btn btn-primary">Submit</button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Addproduct;