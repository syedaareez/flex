import { useState } from "react"
import { fetchwrapper } from "../helpers/fetchwrapper";

import {Buffer} from 'buffer';
import { useLocation, useNavigate } from "react-router-dom/dist";

import { Link } from "react-router-dom";

export default function Login({changeFunc}){

    const [userName,setuserName]=useState("")
    const [userPassword,setuserPassword]=useState("")

    const navigate=useNavigate();
    const location= useLocation();

    function loginUser(e){
        e.preventDefault();

        if(userName!=="" && userPassword!==""){

            const url=`${process.env.REACT_APP_PRODUCTION_URL}api/token/`

            const requestOptions = { username: userName, password:userPassword };

            fetchwrapper.post(url,requestOptions)
            .then((data) => {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                // console.log(data,JSON.parse(Buffer.from(data.access.split('.')[1],"base64"))," came after logging the user!!! ")

                fetchwrapper.post(`${process.env.REACT_APP_PRODUCTION_URL}app/userdetails`,{id:JSON.parse(Buffer.from(localStorage.getItem("access_token").split('.')[1],"base64")).user_id})
                .then((data)=>{
                    localStorage.setItem("userdetails",JSON.stringify(data) )              
                }).then(()=>{
                    if(location.state?.from){
                        navigate(location.state?.from);
                    }else{
                        navigate('/dashboard');
                    }
                })

                
                
                
            })
            .catch((error)=>{
                console.log(error," error from loginuser!!! ")
            })

        }else{
            alert("Enter valid credentials!");
        }
    }

    return(
    <>
    {/* <h1>Login</h1>
    <form onSubmit={loginUser}>
        <input type="text" onChange={e=>setuserName(e.target.value)} placeholder="name" value={userName}/>
        <input type="password" onChange={e=>setuserPassword(e.target.value)} placeholder="password" value={userPassword}/>
        <input type="submit" value="Submit"/>
    </form>

    <button
    className="mt-4 text-blue-600 text-semibold"
     onClick={()=>changeFunc()}>New user? Register</button> */}


    <div>

            <div className="bg-gradient-to-r from-gray-900 to-violet-900 flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-100">
                
                <Link
                to="/"
                className="text-white fixed top-5 left-5"
                >
                {`< Home`}
                </Link>
                
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-lg sm:max-w-md sm:rounded-lg">
                    <form onSubmit={loginUser}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input 
                                    name="name"
                                    className="block outline-none bg-gray-100 p-1 w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    type="text" 
                                    onChange={e=>setuserName(e.target.value)} 
                                    placeholder="name" 
                                    value={userName}/>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input 
                                type="password" 
                                name="password"
                                className="block w-full outline-none bg-gray-100 p-1 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={e=>setuserPassword(e.target.value)} placeholder="password" value={userPassword}/>

                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end mt-4">
                            
                            <input 
                                type="submit" 
                                className="cursor-pointer inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                                value="Submit"/>
                        </div>
                    </form>
                </div>

                <button
                    className="mt-4 text-white text-semibold"
                 onClick={()=>changeFunc()}>New user? Register</button>
            </div>
        </div>
    </>
    )
}