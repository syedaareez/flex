import React,{useEffect, useState} from 'react';
import { fetchwrapper } from '../../helpers/fetchwrapper';


export default function Boards(props) {

    const [BoardTitle,setBoardTitle]=useState("")
    const [BoardContent,setBoardContent]=useState("")

    const [allBoards,setAllBoards]=useState([])

    function fetchAllBoards(){
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards`
        fetchwrapper.get(url)
        .then((data)=>{
            setAllBoards(data);
        })
        .catch((error)=>{
            console.log(error," error from fetch Board ")
        })
    }

    function createBoard(e){
        e.preventDefault();
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards`;
        const params={ title: BoardTitle, description:BoardContent };
        fetchwrapper.post(url,params)
        .then((data) => {
            setBoardTitle("");
            setBoardContent("");
            fetchAllBoards();
        })
        .catch((error)=>{
            console.log(error," error from post Board ")
        })
    }

    function deleteBoard(e,v){
        e.stopPropagation();
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards`;
        const params={ board_id: v };
        fetchwrapper.delete_(url,params)
        .then((data) => {
            fetchAllBoards();
        })
        .catch((error)=>{
            console.log(error," error from post Board ")
        })
    }

    useEffect(()=>{
        fetchAllBoards();

    },[])



  return (
    <>
    Boards
    <form onSubmit={createBoard}>
        <input type="text" onChange={e=>setBoardTitle(e.target.value)} placeholder="title" value={BoardTitle}/>
        <input type="text" onChange={e=>setBoardContent(e.target.value)} placeholder="Content" value={BoardContent}/>
        <input type="submit" value="Submit"/>
    </form>
    <br /><br />

    <h1>Personal Boards</h1>
        <div style={{border:"2px solid black", padding:"20px", width:"screen", }}>
            {allBoards?.map((value,id)=>(
                <div onClick={()=>props.funcToShowBoard(value)} key={id} className='my-3 border-2 border-red-500'>
                <span>title = {value.title}{value.id} </span>{" "}
                <span>description = {value.description} </span>{" "}
                <span>user id = {value.user} </span>
                <span className="float-right mr-4 cursor-pointer" onClick={(e)=>deleteBoard(e,value.id)}>X</span>
                </div>
            ))}
        </div>
    </>
  )
}
