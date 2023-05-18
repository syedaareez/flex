import React from 'react';

import { FaRegUserCircle } from 'react-icons/fa';
import {RxHamburgerMenu} from 'react-icons/rx'

export default function header(props) {
  return (
    <>
    <header className="w-full bg-gray-800 py-5">
        <div className=" items-center  px-10">
        <button
            className="float-left bg-gray-600 text-white p-2 rounded shadow-md text-lg"
            onClick={()=>props.HandleToggleSidebar()}
        >
            <h1><RxHamburgerMenu /></h1>
        </button>
        <button onClick={(e)=>props.Handle_logout(e)} className=" shadow-md float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Logout
        </button>
        <div className="float-right text-white flex items-center shadow-md  bg-gray-600 rounded text-center p-2 mr-6">
        <FaRegUserCircle />
            <div className="ml-2">{props.UserDetails?.[0]?.username} </div>
        </div>
        
        </div>
    </header>
    </>
  )
}
