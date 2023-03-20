// import {useEffect,useState} from "react"
// import { fetchwrapper } from "../helpers/Fetchwrapper"
// import BLogs from "./blogs";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import { fetchwrapper } from "../helpers/Fetchwrapper";

import { Buffer } from "buffer";



export default function Main(){

    // const [allUsers,setAllUsers]=useState([])
    // const [allBlogs,setAllBlogs]=useState([])

    // const [blogTitle,setBlogTitle]=useState("")
    // const [blogContent,setBlogContent]=useState("")
    // const [blogAuthor,setBlogAuthor]=useState("")

    // function fetchAllUsers(){
    //     const url=`${process.env.REACT_APP_PRODUCTION_URL}app/createuser`
    //     fetchwrapper.get(url)
    //     .then((data) => {
    //         setAllUsers(data);
    //     })
    // }

    // function fetchAllBlogs(){
    //     const url=`${process.env.REACT_APP_PRODUCTION_URL}app/blogs`
    //     fetchwrapper.get(url)
    //     .then((data)=>{
    //         setAllBlogs(data);
    //     })
    //     .catch((error)=>{
    //         console.log(error," error from fetch blog ")
    //     })
    // }

    // function createBlog(e){
    //     e.preventDefault();
    //     const url=`${process.env.REACT_APP_PRODUCTION_URL}app/blogs`;
    //     const params={ title: blogTitle, content:blogContent, author:blogAuthor };

    //     fetchwrapper.post(url,params)
    //     .then((data) => {
    //         fetchAllBlogs();
    //     })
    //     .catch((error)=>{
    //         console.log(error," error from post blog ")
    //     })
    // }

    // useEffect(()=>{
    //     fetchAllUsers();
    //     fetchAllBlogs();

    // },[])

    const navigate=useNavigate();


    const [userDetails,setuserDetails]=useState({});

    function fetchUserDetails(det){
        setuserDetails({...det})
    }

    useEffect(()=>{

        const id = JSON.parse(Buffer.from(localStorage.getItem("access_token").split('.')[1],"base64")).user_id

        fetchwrapper.post(`${process.env.REACT_APP_PRODUCTION_URL}app/userdetails`,{id:id})
        .then((data)=>{
            fetchUserDetails(data);               
        })

    },[])


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
        
        <br></br><br></br>        
        <h1>All Blogs</h1>
        <div style={{border:"2px solid black", padding:"20px", width:"screen", }}>
            {allBlogs?.map((value,id)=>(
                <div key={id}>
                <span>Name = {value.title}{value.id} </span>{" "}
                <span>Email = {value.content} </span>{" "}
                <span>Phone Number = {value.author} </span>
                </div>
            ))}
        </div>

        <form onSubmit={createBlog}>
            <input type="text" onChange={e=>setBlogTitle(e.target.value)} placeholder="title" value={blogTitle}/>
            <input type="text" onChange={e=>setBlogContent(e.target.value)} placeholder="Content" value={blogContent}/>
            <input type="text" onChange={e=>setBlogAuthor(e.target.value)} placeholder="Author" value={blogAuthor}/>
            <input type="submit" value="Submit"/>
        </form> */}

       

        
        <h1>MAIN PAGE, Welcome {userDetails?.[0]?.username} {userDetails?.[0]?.email}!</h1>

        <button onClick={(e)=>{

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
        }}>Logout</button>
        </>
    ) 
}