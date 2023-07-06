import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';


const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    
    return (
        <>
            <div className='navbar'>
                <h2 className='logo'>WebChat</h2>
                <div className='user'>
                    <img src={currentUser.photoURL} alt=''></img>
                    <span>{currentUser.displayName }</span>
                    <button onClick={()=>signOut(auth)} title='Sign Out'><i className='bx bx-log-out'></i></button>
                    <Navigate to="/register"></Navigate>
                </div>
            </div>
        </>
    );
}

export default Navbar;
