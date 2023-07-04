import React, { forwardRef } from 'react';
import Userdata from './Userdata';
import Messages from './Messages';
import Input from './Input';

const Chat = forwardRef(({className, removeClassName},ref) => {
    return (
        <div className={`chat ${className}`}>
            <Userdata removeClassName={removeClassName}/>
            <Messages ref={ref}/>
            <Input/>
        </div>
    );
});

export default Chat;
