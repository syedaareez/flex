// import {useEffect,useState} from "react"
// import { fetchwrapper } from "../helpers/Fetchwrapper"
// import BLogs from "./blogs";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { fetchwrapper } from "../helpers/fetchwrapper";

import { Buffer } from "buffer";

import{FaRegUserCircle} from 'react-icons/fa';

import SideNav from "../components/sideNav";
import Header from "../components/header";
import MainInside from "../components/mainInside";



export default function Main(){

    // const [allUsers,setAllUsers]=useState([])

    // function fetchAllUsers(){
    //     const url=`${process.env.REACT_APP_PRODUCTION_URL}app/createuser`
    //     fetchwrapper.get(url)
    //     .then((data) => {
    //         setAllUsers(data);
    //     })
    // }

    // useEffect(()=>{
    //     fetchAllUsers();

    // },[])

    const navigate=useNavigate();


    const [userDetails,setuserDetails]=useState({});

    function fetchUserDetails(det){
        setuserDetails({...det})
    }

    useEffect(()=>{

        const updateMyData = () => {
            fetchUserDetails(JSON.parse(localStorage.getItem("userdetails")));
        };
        updateMyData();  

    },[])




    function handle_logout(e){
        
        e.preventDefault();
            
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/logout/`;

        fetchwrapper.post(url,{ refresh_token: localStorage.getItem('refresh_token'), })
        .then(() => {
            // console.log(" loggedout ");
            localStorage.clear();
            navigate("/signin");
        })
        .catch((error)=>{
            console.log(error," error from logout !!! ");
        })
    }





    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    



    return(
        <>
        {/* <h1>All Users</h1>
        <div style={{border:"2px solid black", padding:"20px", width:"screen", }}>
            {allUsers?.map((value,id)=>(
                <div key={id}>
                <span>Name = {value.username} </span>{" "}
                <span>Email = {value.email} </span>{" "}
                </div>
            ))}
        </div>
        
        */}


        <div className="flex h-screen">
            
        <nav className={`${
            isSidebarOpen ? "block" : "hidden"
            } md:w-64 bg-gray-900`}>
                <SideNav handle_logout={(e)=>handle_logout(e)} />
        </nav>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header HandleToggleSidebar={()=>handleToggleSidebar()} Handle_logout={(e)=>handle_logout(e)} UserDetails={userDetails}/>

        <MainInside />
       </div>
    </div>
    </>
    ) 
}