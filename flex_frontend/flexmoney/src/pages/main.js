import {useEffect,useState} from "react"
export default function Main(){

    const [allUsers,setAllUsers]=useState([])
    const [allBlogs,setAllBlogs]=useState([])

    const [blogTitle,setBlogTitle]=useState("")
    const [blogContent,setBlogContent]=useState("")
    const [blogAuthor,setBlogAuthor]=useState("")

    function fetchAllUsers(){
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/createuser`
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setAllUsers(data);
        })
    }

    function fetchAllBlogs(){
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/blogs`
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setAllBlogs(data);
        })
    }

    function createBlog(){
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/blogs`

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: blogTitle, content:blogContent, author:blogAuthor })
        };

        fetch(url,requestOptions)
        .then((res) => res.json())
        .then((data) => {
            console.log(data," came after creating the blog!!! ")
        })
        .catch((error)=>{
            console.log(error," error from post blog ")
        })
    }

    useEffect(()=>{
        fetchAllUsers();
        fetchAllBlogs();
    },[])


    return(
        <>
        <h1>All Users</h1>
        <div style={{border:"2px solid black", padding:"20px", width:"screen", }}>
            {allUsers.map((value,id)=>(
                <div key={id}>
                <span>Name = {value.username} </span>{" "}
                <span>Email = {value.email} </span>{" "}
                </div>
            ))}
        </div>
        
        <br></br><br></br>        
        <h1>All Blogs</h1>
        <div style={{border:"2px solid black", padding:"20px", width:"screen", }}>
            {allBlogs.map((value,id)=>(
                <div key={id}>
                <span>Name = {value.title}{id} </span>{" "}
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
        </form>
        </>
    ) 
}