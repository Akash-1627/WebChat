import React, { useState } from 'react';

import './style.css';
import { Link, useNavigate } from 'react-router-dom';






let memail,mpassword;
const Register = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    // const [emailmessage, setEmailmessage] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    // const [email, setEmail] = useState('');

    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    
    function handlePassChange (e) {
        setPassword(e.target.value);
    }
    // function handleEmailChange (e) {
    //     setEmail(e.target.value);
    // }
    
    
    const handlesubmit = (e)=>{
        e.preventDefault()
        
        let email1 = e.target[0].value;
        
        let password1 = e.target[1].value;
        memail = email1;
        mpassword = password1;
        const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        // const emregExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2-6}$/
        // const emregExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(password === ""){
            setMessage("Please enter Password")
        }
        else if(!regExp.test(password)){
            setMessage('Invalid Pasword. Password must be atleast 8 characters long, must contain one uppercase, one lowercase, one digit and one special character.')
        }
        else if(regExp.test(password)){
            
            navigate('/display');
        }
        else{
            setMessage("")
        }



        // if(email === ""){
        //     setEmailmessage("Please enter E-Mail")
        // }
        // else if(!emregExp.test(email)){
        //     setEmailmessage("Email is not Valid")
        // }
        // else if(emregExp.test(email)){
        //     setEmailmessage("Email is valid")
        // }
        // else{
        //     setEmailmessage("")
        // }
        
        
        
        
        
    }
    


    return (
        <>
        <div className='container'>
            <div className='box'>
                <div className='boxdata'>
                    <h1 className='heading'>WebChat</h1>
                    <h4 className='minihead'>Register</h4>
                    <form onSubmit={handlesubmit}> 
                    <input type='email' placeholder='Enter your E-Mail' required></input>
                    {/* <p style={{color: '#999', fontSize:'0.8rem'}}>{emailmessage}</p> */}
                    <div className='pass'>

                    <input style={{position : 'relative', left : '1rem'}} type={passwordVisible ? 'text' : 'password'} placeholder='Enter your Password' onChange={handlePassChange} value={password}></input>
                    <button type='button' style={{background: 'transparent',border :'none', width : '2rem',position : 'relative', left : '-1rem', fontSize : '1.2rem', fontWeight : '400', color : '#777'}} onClick={handleTogglePasswordVisibility}>
                        {passwordVisible ? <i class='bx bxs-hide'></i> : <i class='bx bx-show'></i>}
                    </button>
                    </div>
                    <p className='mess' style={{color: '#999', fontSize:'0.8rem'}}>{message.substring(0,61)}</p>
                    <p className='mess' style={{color: '#999', fontSize:'0.8rem'}}>{message.substring(61,118)}</p>
                    <p className='mess' style={{color: '#999', fontSize:'0.8rem'}}>{message.substring(118,)}</p>

                    
                    <button type="submit">Next</button>
                    
                    </form>
                    <p className='changepage'>Already have an Account? <Link className='link' to="/login">Login</Link></p>
                </div>
            </div>
        </div>
            
        </>
    );
}
export {memail,mpassword};
// export let myemail = email;
// export let mypassword = password;
export default Register;
