import React from 'react';
import './DescriptionBox.css'
const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box Fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>An E-Commerce website is on online platiorm that facilitares the 
                    buying and selling of products or services over the intenet. It
                     serves as a virtual Marketplace where businesses and individuals
                     con showcase their Prduccts, internet with customers, and conduct
                     transactions Without the need for physical presence. E-Commerce 
                     websites have gained immense popularity due to thelr convenience, 
                     accessibility, ond the global reach they offer</p>
                     <p>
                        E-Commerce websites typically display products or Services along With
                     detailed descriptions, image, prices,and any available  variations 
                     (e.g., sizes, colors).Each Product usually has its own dedicated page 
                     with relevent information</p>
            </div>
        </div>
    );
}

export default DescriptionBox;
