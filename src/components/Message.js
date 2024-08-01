import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    const ref = useRef();


    useEffect(()=>{
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message]);

    const formatTime = (timestamp) => {
        const milliseconds = (timestamp.seconds * 1000) + (timestamp.nanoseconds / 1000000);
        const messageTime = new Date(milliseconds);
        const currentTime = new Date();
        console.log(messageTime);
        console.log(currentTime);
        const diffInSeconds = Math.floor((currentTime - messageTime) / 1000);
        console.log(diffInSeconds);
    
        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (diffInSeconds < 60) {
          return 'Just now';
        } else if (minutes < 60) {
          return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
          return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (days === 1) {
          return 'Yesterday';
        } else if (days <= 2) {
          return `${days} days ago`;
        } else {
          return messageTime.toLocaleDateString();
        }
      };


    return (
        <div ref={ref} className={`message ${message.senderId === currentUser?.uid && "owner"}`}>
            <div className='messageinfo'>
                <img src={message.senderId ===currentUser?.uid ? currentUser?.photoURL : data.user?.photoURL} alt=''></img>
                <span>{formatTime(message.date)}</span>
            </div>
            <div className='messagecontent'>
                {message.text && <p>{message.text}</p>}
                {message.img && <img src={message.img} alt=''></img>}
            </div>
        </div>
    );
}

export default Message;
