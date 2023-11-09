import React from 'react';
import './Footer.css'

function Footer(props) {
    return (
        <footer className="footer sticky-footer bg-dark ">
    <div className="container my-auto">
        <div className="copyright text-center my-auto">
            <span style={{color:'white'}}>Copyright © RentHouse 2023</span>
        </div>
    </div>
</footer>
    );
}

export default Footer;