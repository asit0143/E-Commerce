import React from 'react';
import hand_icon from '../Assets/Frontend_Assets/hand_icon.png'
import arrow_icon from '../Assets/Frontend_Assets/arrow.png'
import hero_img from '../Assets/Frontend_Assets/hero_image.png'
import './Hero.css'
const Hero = () => {
    return (
    <div className="hero">
        <div className="hero-left">
            <h2> NEW ARRIVALS ONLY </h2>
            <div>   
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt=""/>
                </div>
                <p> collections </p>
                <p> for everyone </p>
            </div>
            <div className="hero-latest-btn">
                <div> Latest Collection </div>
                <img src={arrow_icon} alt=''/>
            </div>
        </div>
        <div className="hero-right">
             <img src={hero_img} alt=''/>
        </div>
    </div>
    );
}

export default Hero;
