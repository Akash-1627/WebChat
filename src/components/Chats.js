import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


const Chats = ({updateClassName, updateClassName2}) => {
    const [chats,setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    const handleClick = () => {
        updateClassName('changePage');
      };
      const handleClick2 = () => {
        updateClassName2('changePage2');
      };


    useEffect(()=>{
        const getChats = () =>{
            
            const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
                setChats(doc.data());
            });
            
            return () =>{
                unsub();
            };
            
        };

        currentUser?.uid && getChats();
        },[currentUser?.uid]);

        const handleSelect = (u)=>{
            dispatch({type: "CHANGE_USER", payload: u })
        }
        

        
    return (
        <>
            <div className='chats'>
                {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
                    <>
                    <div className='userchat' key={chat[0]} onClick={()=>{handleSelect(chat[1].userInfo); handleClick(); handleClick2();}}>
                        <img src={chat[1].userInfo?.photoURL} alt=''></img>
                        <div className='userchatinfo'>
                            <span>{chat[1].userInfo?.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                        
                        
                </div>
                <div className='rule'>

                    <hr className='hrule'/>
                </div>
                </>
                    ))}

                

                
            </div>
            
            

            
        </>
    );
}

export default Chats;
