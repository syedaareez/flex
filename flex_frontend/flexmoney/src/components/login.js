import { useState } from "react"
import { fetchwrapper } from "../helpers/Fetchwrapper";

import {Buffer} from 'buffer';
import { redirect, useLocation, useNavigate } from "react-router-dom/dist";

export default function Login(){

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

                if(location.state?.from){
                    navigate(location.state?.from);
                }else{
                    navigate('/');
                }
                
                
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
    <h1>Login</h1>
    <form onSubmit={loginUser}>
        <input type="text" onChange={e=>setuserName(e.target.value)} placeholder="name" value={userName}/>
        <input type="password" onChange={e=>setuserPassword(e.target.value)} placeholder="password" value={userPassword}/>
        <input type="submit" value="Submit"/>
    </form>
    </>
    )
}