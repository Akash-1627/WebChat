import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = ({updateClassName,updateClassName2, className2}) => {
    
    return (
        <div className={`sidebar ${className2}`}>
            <Navbar/>
            <Search/>
            <Chats updateClassName={updateClassName} updateClassName2={updateClassName2}/>
        </div>
    );
}

export default Sidebar;
