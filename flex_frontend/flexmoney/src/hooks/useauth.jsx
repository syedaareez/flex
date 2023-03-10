import { useState } from "react";

const useAuth=()=>{

    var loggedinbool=false;

    const token =localStorage.getItem("access_token");

    if(token){
        loggedinbool=true;
    }

    const user={loggedIN:loggedinbool};

    return user&&user.loggedIN;
}

export default useAuth