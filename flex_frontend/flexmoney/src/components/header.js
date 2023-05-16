import React from 'react';

import { FaRegUserCircle } from 'react-icons/fa';

export default function header(props) {
  return (
    <>
    <header className="w-full bg-gray-100 py-5">
        <div className=" items-center  px-10">
        <button
            className="float-left bg-gray-700 text-white p-2 rounded"
            onClick={()=>props.HandleToggleSidebar()}
        >
            <i className="fas fa-bars"></i>
            <h1>Side</h1>
        </button>
        <button onClick={(e)=>props.Handle_logout(e)} className=" float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Logout
        </button>
        <div className="float-right flex items-center  border-2 text-center p-2 mr-6">
        <FaRegUserCircle />
            <div className="ml-2">{props.UserDetails?.[0]?.username} </div>
        </div>
        
        </div>
    </header>
    </>
  )
}
