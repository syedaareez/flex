import {Buffer} from 'buffer';

function getUserToken(){
    const token=localStorage.getItem('access_token');
    const refresh=localStorage.getItem('refresh_token');

    if(token){
        if(JSON.parse(Buffer.from(refresh.split('.')[1],"base64")).exp*1000<Date.now()){
            localStorage.clear();
        }
        else if(JSON.parse(Buffer.from(token.split('.')[1],"base64")).exp*1000<Date.now()){
            const url=`${process.env.REACT_APP_PRODUCTION_URL}api/token/refresh/`
            fetch(url,{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({refresh:refresh}),
            })
            .then((res)=>res.json())
            .then((data)=>{

                localStorage.clear();
                localStorage.setItem('access_token',data.access);
                localStorage.setItem('refresh_token',data.refresh);
            })
            .then(()=>{

                return localStorage.getItem('access_token');
            })
            
        }
        return token;
    }else{
        return null;
    }
}



function getHeaders(){
    var header={
        'Content-Type': 'application/json',
    }

    const token=getUserToken();
    
    if(token){
        header.Authorization=`Bearer ${token}`
    }

    
    return header;
}



// GET REQUEST

function get(url){

    const headers=getHeaders();

    return fetch(url,{
        method:"GET",
        headers:headers,
    })
    .then((res)=>res.json())
    

}



// POST REQUEST

function post(url,params){

    const headers=getHeaders();
    
    return fetch(url,{
        method:"POST",
        headers:headers,
        body:JSON.stringify({...params}),
    })
    .then(response=>{
        return response.json();
    })

}

function delete_(url,params){
    const headers=getHeaders();
    
    return fetch(url,{
        method:"DELETE",
        headers:headers,
        body:JSON.stringify({...params}),
    })
    .then(response=>{
        return response.json();
    })
}

export const fetchwrapper = {
    get,
    post,
    delete_,
};