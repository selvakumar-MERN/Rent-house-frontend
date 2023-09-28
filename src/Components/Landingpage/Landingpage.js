import React from 'react';
import Usernav from './Usernav';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Landingpage(props) {
    return (
        <div>
            <Usernav />
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-6 mt-3'>
                        <h1 className='mt-3'> We offer a handpicked selection of everyday furniture, appliances, and electronics on rent in the city for a daily fee. </h1>
                        <div className='mt-2 mb-5'>
                            <Link to='/products'>
                                <button className='btn btn-primary mt-2 ' >
                                    Explore our Products
                                </button>
                            </Link>

                        </div>
                    </div>
                    <div className='col-12 col-md-6 text-center mt-5'>
                        <img src='logo.jpg' className='img-fluid' height={'300px'} width={'550px'} alt='simpleimage'></img>
                    </div>
                </div>
                <h4 className='mt-3'>Our category</h4>
                <div className='row'>

                    <div className="col-12 col-md-3 my-2">
                        <div className="card h-100">
                            <div className="card-body p-2 d-flex">
                                <i className="fa fa-bed fa-3x" aria-hidden="true"></i>
                                <div className="text-center ml-3 mt-3">
                                    <h6 className="fw-bolder">Furniture</h6>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-12 col-md-3 my-2">
                        <div className="card h-100">
                            <div className="card-body p-2 d-flex">
                                <i className="fa fa-television fa-3x" aria-hidden="true"></i>
                                <div className="text-center ml-3 mt-3">
                                    <h6 className="fw-bolder">Appliances</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 my-2">
                        <div className="card h-100">
                            <div className="card-body p-2 d-flex">
                                <i className="fa fa-laptop fa-3x" aria-hidden="true"></i>
                                <div className="text-center ml-3 mt-3">
                                    <h6 className="fw-bolder">Electronics</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3 my-2">
                        <div className="card h-100">
                            <div className="card-body p-2 d-flex">
                                <i className="fa fa-trophy fa-3x" aria-hidden="true"></i>
                                <div className="text-center ml-3 mt-3">
                                    <h6 className="fw-bolder">Fitness</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='container mt-5 bg-light'>
                <div className='row'>
                    <div className='col-12'>
                        <h4>About Us</h4>
                        <p>Do you want the best furniture, appliances, or electronics in the market at a budget monthly fee? If the answer is yes, make RentHome your go-to service in Chennai! We are a leading Indian rental company with tens of thousands of satisfied customers all over the country. We provide essential everyday items on rent at a discounted monthly price.

                            RentHome allows you to rent furniture, appliances, and electronics for your home. Our inventory includes all the latest products in the market, made by reputable brands. You can choose to rent from us for short term or long term. Our long-term plans offer maximum savings.

                            If you rent any item from us, you receive benefits like free relocation, damage waiver, and free maintenance. These are benefits you won’t find at a retailer. You can rent from us online in Chennai. The process is simple and takes just 5 minutes of your time. We’ll deliver your rental item to any neighborhood in Chennai, including Guduvanchery, Karlapakkam, Medavakkam, Kelambakkam, and Kovur.</p>
                    </div>

                </div>

            </div>
            <div className='my-5'>
                <Footer />
            </div>

        </div>







    );
}

export default Landingpage;