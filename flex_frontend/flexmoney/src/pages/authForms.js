import { useState } from "react";
import Login from "../components/login";
import Register from "../components/register";


export default function AuthForms(){

    const [change,setChange]=useState(false);

    function changeChange(){
        setChange(prev=>{
            return !change
        })
    }

    return(
        <>
        {change?(
            <Register changeFunc={changeChange}/>
        ):(
            <><Login changeFunc={changeChange}/></>
        )}
        
        
        </>
    )
}