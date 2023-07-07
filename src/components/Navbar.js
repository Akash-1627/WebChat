import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/register');

            // Additional code to handle successful sign-out, such as redirecting to a login page
        } catch (error) {
            console.log(error);
            // Handle any error that occurs during sign-out
        }
    };
    
    return (
        <div className='navbar'>
            <h2 className='logo'>WebChat</h2>
            <div className='user'>
                {currentUser && currentUser.photoURL && (
                    <img src={currentUser.photoURL} alt='' />
                )}
                {currentUser && currentUser.displayName && (
                    <span>{currentUser.displayName}</span>
                )}
                <button onClick={handleSignOut} title='Sign Out'>
                    <i className='bx bx-log-out'></i>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
