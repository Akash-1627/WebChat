import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const Userdata = ({removeClassName}) => {
    const {data} = useContext(ChatContext);

    
    
    return (
        <>
            <div className='userdata'>
                
                <div className='user'>
                    <button onClick={removeClassName}><i className='bx bx-arrow-back'></i></button>
                    <img src={data.user?.photoURL} alt=''></img>
                    <span>{data.user?.displayName}</span>
                </div>
                <div className='usericons'>
                    <div className='video'>
                        <i className='bx bxs-video'></i>
                    </div>
                    <div className='call'>
                        <i className='bx bxs-phone'></i>
                    </div>
                    <div className='menu'>
                        <i className='bx bx-dots-vertical-rounded'></i>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Userdata;
