// import React, { useEffect, useRef } from 'react';
import Chat from '../components/Chat';
import './style.css';
import { useState } from 'react';
import Sidebar from '../components/sidebar';


const Home = () => {
    
    const [className, setClassName] = useState('');
    const [className2, setClassName2] = useState('');
    

    const updateClassName = (newClassName) => {
        setClassName(newClassName);
      };
      const updateClassName2 = (newClassName2) => {
        setClassName2(newClassName2);
      };
      const removeClassName = () => {
        setClassName('');
        setClassName2('');
      };

      
      

    
    return (
        
        <>
        <div className='home'>
            <div className='cont'>
                <Sidebar updateClassName={updateClassName} updateClassName2={updateClassName2} className2={className2}/>
                <Chat className={className}  removeClassName={removeClassName}/>
            </div>
        </div>
            
        </>
    );
}

export default Home;
