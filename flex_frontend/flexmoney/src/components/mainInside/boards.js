import React,{useEffect, useState} from 'react';
import { fetchwrapper } from '../../helpers/fetchwrapper';

import {MdDeleteOutline} from 'react-icons/md'


export default function Boards(props) {

    const [BoardTitle,setBoardTitle]=useState("")
    const [BoardContent,setBoardContent]=useState("")

    const [allBoards,setAllBoards]=useState([])

    function fetchAllBoards(){
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards`
        fetchwrapper.get(url)
        .then((data)=>{
            // console.log(" ALl bords ",data)
            setAllBoards(data);
        })
        .catch((error)=>{
            console.log(error," error from fetch Board ")
        })
    }

    function createBoard(e){
        e.preventDefault();
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards`;

        var params={};

        if(props.ProjectObject===null){
            params={ title: BoardTitle, description:BoardContent };
        }else{
            params={ title: BoardTitle, description:BoardContent , project:props.ProjectObject.id};
        }
        
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
    {props.ProjectObject===null?<>Personal Boards</>:<><h1 className='text-white text-xsm'>Project View</h1><h1 className="text-[45px]">{props.ProjectObject.name}</h1></>}
    <div className='w-full p-4'>

    <form className=" w-[90%] flex justify-center align-middle" onSubmit={createBoard}>
        <input className="px-2 text-gray-900 py-2 rounded shadow-md mr-1 outline-none w-[30%] text-base" type="text" onChange={e=>setBoardTitle(e.target.value)} placeholder="Board Name" value={BoardTitle}/>
        <input className="px-2 text-gray-900 py-2 rounded shadow-md mr-1 outline-none w-[30%] text-base" type="text" onChange={e=>setBoardContent(e.target.value)} placeholder="Description" value={BoardContent}/>
        <input className='rounded shadow-md px-1 py-0 bg-gray-700' type="submit" value="Create" />
    </form>
    </div>
        <div 
        
        className="flex overflow-x-auto w-full bg-gradient-to-r from-gray-500 to-gray-700 shadow-inner"
        >
            {allBoards?.map((value,id)=>(
                <div key={id}>
                {value.project===(props.ProjectObject?.id||null)
                &&
                <div
                 style={{backgroundImage:`url('/sinewave.jpg')`,backgroundSize:"cover"}}
                 onClick={()=>props.funcToShowBoard(value)}  className='cursor-pointer m-2 my-3 shadow-xl w-[200px] h-[200px] bg-gray-700 rounded flex-shrink-0'>
                    
                    <div className='flex flex-col align-middle w-full h-full backdrop-blur-sm '>
                        <div className='mt-3 text-gray-200 text-[25px] font-semibold'>{value.title}</div>{" "}
                        <div className=' text-xs px-1 text-gray-300 max-h-[90px] mt-1 overflow-clip'>{value.description}
                         </div>{" "}
                        <div className='grow'></div>
                        <div className="bg-gray-800 text-white hover:text-red-300 hover:bg-gray-900 py-1 flex justify-center text-lg bottom-0 backdrop-blur-lg float-right cursor-pointer" onClick={(e)=>deleteBoard(e,value.id)}><MdDeleteOutline /></div>
                    </div>
                </div>}
                
                </div>
            ))}
        </div>
    </>
  )
}
