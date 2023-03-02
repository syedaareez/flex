import { useState } from "react"

export default function Register(){

    const [userName,setuserName]=useState("")
    const [userPassword,setuserPassword]=useState("")
    const [userEmail,setuserEmail]=useState("")


    function createUser(e){
        e.preventDefault();

        if(userName!=="" && userPassword!=="" && userEmail!==""){

            const url=`${process.env.REACT_APP_PRODUCTION_URL}app/createuser`

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userName, password:userPassword, email:userEmail })
            };

            fetch(url,requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data," came after creating the user!!! ")
            })
            .catch((error)=>{
                console.log(error," error from userCreation!!! ")
            })

        }else{
            alert("Enter valid credentials!");
        }
        
    }

    return(
        <>
        <h1>Register!</h1>
        <form onSubmit={createUser}>
            <input type="text" onChange={e=>setuserName(e.target.value)} placeholder="name" value={userName}/>
            <input type="password" onChange={e=>setuserPassword(e.target.value)} placeholder="password" value={userPassword}/>
            <input type="email" onChange={e=>setuserEmail(e.target.value)} placeholder="email" value={userEmail}/>
            <input type="submit" value="Submit"/>
        </form>
        </>
    )
}