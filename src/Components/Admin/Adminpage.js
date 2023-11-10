import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { deleteproduct, showproduct, verifylogin } from '../utlis/Apis';


function Adminpage(props) {
    const notify = () => toast("Product Deleted");
    const [product, setproduct] = useState([])
    const [records, setrecords] = useState([])

    useEffect(() => {
        const usertoken = {
            token: ""
        }
        const tokenvalue = window.localStorage.getItem("admintoken")
        usertoken.token = tokenvalue
        const postdata = async () => {
            const res = await axios.post(verifylogin, usertoken)
            try {

                if (res) {
                    const productdata = async () => {
                        const res = await axios.get(showproduct)
                        try {
                            const { data } = res
                            setproduct(data)
                            setrecords(data)
                        }
                        catch (error) {
                            return (error)
                        }
                    }
                    productdata()
                }
            }
            catch (error) {
                return error
            }

        }
        postdata()
    }, [])

    const handlerChange = (e) => {
        setrecords(product.filter(item => item.productName.toLowerCase().includes(e.target.value)))
    }

    const deleteProduct = (id) => {
        axios.delete(`${deleteproduct}/${id}`)
            .then((res) => {
                if (res.data.deletedCount === 1) {
                    setproduct(product.filter((product) => product._id !== id))
                    notify()
                }
            })
            .catch((error) => {
                return (error)
            })

    }


    return (
        <section>
            <div className="container px-4 px-lg-5">
                <div className='row'>
                    <div className='col-12 col-md-12 text-right '>
                        <ul className="mx-4 d-flex justify-content-end">
                            <li className=" mx-3 ">
                                <Link to='/admin/addproduct'
                                    className="nav-link text-primary" >Add Products
                                </Link>
                            </li>
                            <li className=" mx-3 ">
                                <Link to='/admin/userdetails'
                                    className="nav-link text-primary">Customer list
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-8'>
                        <form className="d-flex ml-auto"> <input className="form-control mr-2" type="search" placeholder="Search" onChange={handlerChange}></input>
                            <select className="form-control" name='category' >
                                <option selected>Choose...</option>
                                <option>Furniture</option>
                                <option>Appliances</option>
                                <option>Electronics</option>
                                <option>Fitness</option>
                                <option>WFH Essentials</option>

                            </select>
                            <button className="btn btn-outline-success mx-2" type="submit" >Search</button> </form>
                    </div>

                </div>
                <h2 className='mt-2'>Products</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 mt-4 ">


                    {records.map((items) =>
                        <div className="col-12 col-md-3 my-2">
                            <div key={items._id} className="card h-100">
                                {/*Product image*/}
                                <img className="card-img-top" src={items.productImage} alt="..." height={"200px"} width={"300px"}></img>
                                { /*Product details*/}
                                <div className="card-body p-2">
                                    <div className="text-left">
                                        {/*Product name*/}
                                        <h6 className="fw-bolder">{items.productName}</h6>
                                        {/*Product price*/}
                                        <div className="text-decoration-line-through">Rs.{items.productPrice}/Hr</div>

                                    </div>
                                </div>
                                {/*Product actions*/}
                                <div className="card-footer p-1 pt-0 border-top-0 bg-transparent " >
                                    <Link to='/admin/editproduct'>
                                        <button className="btn btn-warning mt-auto m-1" onClick={() => { props.userdata(items) }}
                                        ><i className="fa fa-pencil-square-o m-1" ></i></button>
                                    </Link>
                                    <button
                                        className="btn btn-danger mt-auto m-1" onClick={() => { deleteProduct(items._id) }}>
                                        <i className="fa fa-trash m-1" ></i></button>  <ToastContainer />

                                </div>


                            </div>
                        </div>

                    )}
                </div>
            </div>
        </section>
    );
}

export default Adminpage;
