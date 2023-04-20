import { useState } from "react"
import { fetchwrapper } from "../helpers/fetchwrapper";

export default function Register({changeFunc}){

    const [userName,setuserName]=useState("")
    const [userPassword,setuserPassword]=useState("")
    const [userEmail,setuserEmail]=useState("")


    function createUser(e){
        e.preventDefault();

        if(userName!=="" && userPassword!=="" && userEmail!==""){

            const url=`${process.env.REACT_APP_PRODUCTION_URL}app/createuser`

            const requestOptions = {name: userName, password:userPassword, email:userEmail };

            fetchwrapper.post(url,requestOptions)
            .then((data) => {
                changeFunc();
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
        {/* <div>
        <h1>Register!</h1>
        <form onSubmit={createUser}>
            <input type="text" onChange={e=>setuserName(e.target.value)} placeholder="name" value={userName}/>
            <input type="password" onChange={e=>setuserPassword(e.target.value)} placeholder="password" value={userPassword}/>
            <input type="email" onChange={e=>setuserEmail(e.target.value)} placeholder="email" value={userEmail}/>
            <input type="submit" value="Submit"/>
        </form>
        </div> */}

        <div>
            <div className="bg-gradient-to-r from-gray-900 to-violet-900 flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-100">
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-lg sm:max-w-md sm:rounded-lg">
                    <form onSubmit={createUser}>
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
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input 
                                    type="email" 
                                    name="email"
                                    className="block w-full outline-none bg-gray-100 p-1 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={e=>setuserEmail(e.target.value)} placeholder="email" value={userEmail}/>

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
                 onClick={()=>changeFunc()}>Already a member? login</button>
            </div>
        </div>
        </>
    )
}