import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/LoginSignup.css';

const LoginSignup = () => {

    const [state,setState] = useState("Login");
    const [fromData,setFromData] = useState({
        username:"",
        password:"",
        email:""
    })

    const changeHandler = (e) =>{
        setFromData({...fromData,[e.target.name]:e.target.value})
    }

    const login = async () =>{
        console.log("Login function Executed",fromData);
        let responseData;
        try {
            const response = await fetch('http://localhost:4000/login',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(fromData),
            });
            responseData = await response.json();

            if(responseData.success){
                localStorage.setItem('auth-token', responseData.token);
                toast.success('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.replace("/");
                }, 1500);
            } else {
                toast.error(responseData.errors || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login. Please try again.');
        }
    }
    const signup = async () =>{
        console.log("Signup function Executed",fromData);
        let responseData;
        try {
            const response = await fetch('http://localhost:4000/signup',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(fromData),
            });
            responseData = await response.json();

            if(responseData.success){
                localStorage.setItem('auth-token', responseData.token);
                toast.success('Account created successfully! Redirecting...');
                setTimeout(() => {
                    window.location.replace("/");
                }, 1500);
            } else {
                toast.error(responseData.errors || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error('An error occurred during signup. Please try again.');
        }
    }


    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1> {state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input name='username' value={fromData.username} onChange={changeHandler} type='text' placeholder='Your Name' />:<></>}
                    <input name='email' value={fromData.email} onChange={changeHandler} type='email' placeholder='Email Address'/>
                    <input name='password' value={fromData.password} onChange={changeHandler} type='password' placeholder='Password'/> 
                </div>
                <button onClick={()=>{state==="Login"? login():signup()}}> Continue</button>
                {state==="Sign Up"?
                <p className="loginsignup-login">Already have an account ? <span onClick={()=>{setState("Login")}}>Login here</span></p>:
                <p className="loginsignup-login">Create An Account ?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
                
            <div className="loginsignup-agree">
                <input type="checkbox" name='' id='' />
                <p>By Continuing, i agree to the terms of use & privacy police </p> 
            </div>
            </div>
        </div>
    );
}

export default LoginSignup;
