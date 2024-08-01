import React, { useContext, useState } from 'react';
import imgadd from '../Images/imageadd.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { ref } from 'firebase/storage';
import { Timestamp, arrayUnion, updateDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from "uuid";
import { storage } from '../firebase';
import { uploadBytesResumable } from 'firebase/storage';
const Input = () => {
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    const handleSend = async () => {

        try {


            if (img) {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, img);

                await uploadBytesResumable(storageRef, img).then(() => {

                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
                );

            } else {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    })
                })
            }

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp(),
            })

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp(),
            })


            setText("");
            setImg(null);
        } catch (err) {
            setErr(true);
        }
    }
    return (
        <div className='input'>
            <input type='text' placeholder='Type Something...' onChange={e => setText(e.target.value)} value={text} onKeyDown={handleKeyPress}></input>
            <div className='send'>


                <input type='file' style={{ display: "none" }} id='file1' onChange={e => setImg(e.target.files[0])} />
                <label htmlFor='file1'>
                    <img src={imgadd} alt=''></img>
                </label>
                <button onClick={handleSend}><i className='bx bx-send'></i></button>
            </div>

        </div>
    );
}

export default Input;
