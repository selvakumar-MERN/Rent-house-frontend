import React from 'react';
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import Usernav from '../Landingpage/Usernav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import Mycontext from '../../Context';




function Products() {
    const {item,userdata} = useContext(Mycontext);
   
    const [loading,setloading]=useState(false)
    const notify = () => toast("Added to Cart");
    const [product, setproduct] = useState([])
    const [records, setrecords] = useState([])
    const[key,setkey]= useState(0)


    useEffect(() => {

        axios.get('https://rent-house-backend.onrender.com/product/products')
            .then(res => {

                setloading(true)
                setproduct(res.data)
                setrecords(res.data)
            })
            .catch(error => {
                return (error)
            })
    }, [])

    const submit= (id,productId)=>{
        const email={email: userdata.email}
      const token= window.localStorage.getItem("usertoken")
      if(!token){
       return  alert("please login as a user to add items to cart")
      }
       axios.post(`https://rent-house-backend.onrender.com/product/products/${id}`,email)
        .then(res => {
            const value= key+1;
            setkey(value)
            notify()
            
        
           
           
        
          
               
        })
        .catch(error => {
            return (error)
        })
        
        
    }
    
    const handlerChange = (e) => {
        setrecords(product.filter(item => item.productName.toLowerCase().includes(e.target.value)))
    }

  
   console.log(item)

    return (
        <section key={key}>
            <Usernav />
            <ToastContainer />
            <div className="container px-4 px-lg-5 mt-5">
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

                <h2 className='mt-4'>Products</h2>
                { loading ? <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 mt-4 ">


                    {records.map((items) =>
                        <div key={items._id} className="col-12 col-md-3 my-2">
                            <div className="card h-100">
                                {/*Product image*/}
                                <img className="card-img-top" src={items.productImage} alt="..." height={"200px"} width={"300px"}></img>
                                { /*Product details*/}
                                <div className="card-body p-2">
                                    <div className="text-left">
                                        {/*Product name*/}
                                        <h6 className="fw-bolder">{items.productName}</h6>
                                        {/*Product price*/}
                                        <div className="text-decoration-line-through">Rs.{items.productPrice}</div>

                                    </div>
                                </div>
                                {/*Product actions*/}
                                <div className="card-footer p-1 pt-0 border-top-0 bg-transparent " >

                                    <button className="btn btn-warning mt-auto m-1"
                                    disabled={item.some((obj) => obj.productId === items.productId)} 
                                    onClick={()=>{ submit(items._id,items.productId)} }
                                    ><i className="fa fa-shopping-cart" ></i> 
                                    {item.some((obj) => obj.productId === items.productId)
                                        ? "Added to cart"
                    : "Add to cart"}
                                        </button>


                                </div>


                            </div>
                        </div>

                    )}
                </div>:<section >
                    <div className='container mt-3 text-center'> 
                 <div className='spinner-border text-primary ' role='status'>
                <span className='sr-only'>Loading...</span>
                </div>
                </div>
                </section>}


            </div>
            <div className='my-5'>
                <Footer/>
            </div>


        </section>
    );
}

export default Products;