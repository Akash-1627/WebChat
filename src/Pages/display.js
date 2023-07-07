import React from 'react';
import { useState } from 'react';

import add from '../Images/imageadder.png';
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth,storage,db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { memail, mpassword } from './Register';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import ClipLoader from "react-spinners/ClipLoader";  


const Display = () => {
    const navigate = useNavigate();
    const [err,setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const override: CSSProperties = {
        paddingTop: '10px'
      };
    
    const hndlesubmit = async (e)=>{
        e.preventDefault()
        const displayName = e.target[0].value;
        const file = e.target[1].files[0];
        const email= memail;
        console.log(email);
        const password = mpassword;
        console.log(password);

        try{

        setLoading(true);

        const res = await createUserWithEmailAndPassword(auth, email,password);
        console.log(res);


        const storageRef = ref(storage, displayName);
        console.log(storageRef);

        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed', 
        
        
        () => {
            
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user,{
                
                displayName,
                photoURL: downloadURL,
            })
            await setDoc(doc(db, "users" , res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats" ,res.user.uid),{
                
            })
            setLoading(false);
            navigate('/')
        });
        }
        );
    }
    catch(err){
        setErr(true);
    }
         
    }


    return (
        <>
        {/* {loading && <ClipLoader />} */}
        <div className={`container ${loading ? 'loading' : ''}`}>
            <div className='box'>
                <div className='boxdata'>
                    <h1 className='heading'>WebChat</h1>
                    <h4 className='minihead'>Register</h4>
                    <form onSubmit={hndlesubmit}>
                    <input type='text' placeholder='Enter your Display Name' required></input>
                    <input style={{display: "none"}} type='file' id='file'/>
                    <label htmlFor='file'>
                        <img src={add} alt=''></img>
                        <span>Add an Avatar</span>
                    </label>
                    {loading  ? <ClipLoader color='#fff' cssOverride={override} /> :<button disabled={loading}>Submit</button>}
                    
                    </form>
                    {/* <p className='changepage'>Already Registered? Login</p> */}
                </div>
            </div>
        </div>
            
        </>
    );
}

export default Display;
