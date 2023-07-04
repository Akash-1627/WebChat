import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


const Login = () => {
    const [err,setErr] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    
    function handlePassChange (e) {
        setPassword(e.target.value);
    }
    
    const handlesubmit = async (e)=>{
        e.preventDefault()
        
        const email = e.target[0].value;
        const password = e.target[1].value;

        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");

        

        
    }
    catch(err){
        setErr(true);
    }
         
    }
    return (
        <>
        <div className='container'>
            <div className='box'>
                <div className='boxdata'>
                    <h1 className='heading'>WebChat</h1>
                    <h4 className='minihead'>Login</h4>
                    <form onSubmit={handlesubmit}>
                    <input type='email' placeholder='Enter your E-Mail' required></input>
                    <div className='pass'>

                    <input style={{position : 'relative', left : '1rem'}} type={passwordVisible ? 'text' : 'password'} placeholder='Enter your Password' onChange={handlePassChange} value={password}></input>
                    <button type='button' style={{background: 'transparent',border :'none', width : '2rem',position : 'relative', left : '-1rem', fontSize : '1.2rem', fontWeight : '400', color : '#777'}} onClick={handleTogglePasswordVisibility}>
                        {passwordVisible ? <i class='bx bxs-hide'></i> : <i class='bx bx-show'></i>}
                    </button>
                    </div>
                    <button>Log In</button>
                    </form>
                    <p className='changepage'>Don't have an Account? <Link className='link' to="/register">Register</Link></p>
                </div>
            </div>
        </div>
            
        </>
    );
}

export default Login;
