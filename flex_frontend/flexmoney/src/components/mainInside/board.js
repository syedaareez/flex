import React, { useEffect, useState } from 'react'
import { fetchwrapper } from '../../helpers/fetchwrapper';

import {IoIosArrowBack} from 'react-icons/io';
import {MdDeleteOutline } from 'react-icons/md';

export default function Board(props) {

  const [cardName,setCardName]=useState("");
  const [cardBoard,setCardBoard]=useState(props.value.id);

  const [taskName,setTaskName]=useState("");
//   const [taskDetail,setTaskDetail]=useState("");

  const[allCards, setAllcards]=useState([]);

  const[alltasks, setAlltasks]=useState([]);

  function fetchAllCards(){
    const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards/${cardBoard}/cards`;
        fetchwrapper.get(url)
        .then((data)=>{
            // console.log("All cards ",data)
            setAllcards(data);
        })
        .catch((error)=>{
            console.log(error," error from fetch Board ")
        })
  }

  function createcard(e){
    e.preventDefault();
    const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards/${cardBoard}/cards`;
    const params={ name: cardName };
    fetchwrapper.post(url,params)
    .then((data) => {
        setCardName("");
        fetchAllCards();
    })
    .catch((error)=>{
        console.log(error," error from post Board ")
    })
  }
  function deleteCard(e,v){
    e.stopPropagation();
    const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards/${cardBoard}/cards`;
    const params={ card_id: v };
    fetchwrapper.delete_(url,params)
    .then((data) => {
        fetchAllCards();
    })
    .catch((error)=>{
        console.log(error," error from post Board ")
    })
    }



    function fetchAllTasks(){
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards/${cardBoard}/tasks`;
        fetchwrapper.get(url)
        .then((data)=>{
            setAlltasks(data);
        })
        .catch((error)=>{
            console.log(error," error from fetch Board ")
        })
    }

    function createtask(e,card_id){
        e.preventDefault();
        const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards/${cardBoard}/tasks`;

        const params={ name: taskName,card_id:card_id };

        
        fetchwrapper.post(url,params)
        .then((data)=>{
            setTaskName("");
            fetchAllTasks();
            
        })
        .catch((error)=>{
            console.log(error," error from fetch Board ")
        })
    }

    useEffect(()=>{
       fetchAllCards();
       fetchAllTasks();
    },[])


    const [openTaskCreateForm,setOpenTaskCreateForm]=useState(false);
    const [openTaskCreateFormId,setOpenTaskCreateFormId]=useState("");

    function openTaskCreationFucntion(id){

        if(openTaskCreateFormId===id ){
            setOpenTaskCreateForm(false);
            setOpenTaskCreateFormId("");
        }else{
            setOpenTaskCreateForm(true);
            setOpenTaskCreateFormId(id);
        }
       
    }


  return (
    <div className="">
    <div className='relative flex flex-col text-center '>
    <h1 className='text-white text-xsm mt-5'>Board View</h1>
    <div className="text-[45px]">{props.value.title}</div>{" "}
    <div className="max-h-[20px] overflow-clip">{props.value.description} 

</div>{" "}
    <div className="absolute left-3 top-5 border-2 p-2 text-lg rounded-full cursor-pointer" onClick={()=>props.funcToShowBoard({})}><IoIosArrowBack /></div>
    </div><br />
    
    <form className=" w-full flex justify-center align-middle" onSubmit={createcard}>
        <input type="text" className="px-2 text-gray-900 py-2 rounded shadow-md mr-1 outline-none w-[30%] text-base" onChange={e=>setCardName(e.target.value)} placeholder="New Card Title" value={cardName}/>
        <input className='rounded shadow-md px-1 py-0 bg-gray-700' type="submit" value="Create"/>
    </form>
    <br />
        <div className='mx-auto h-full flex overflow-x-auto w-[98%] bg-gradient-to-r from-gray-500 to-gray-700 shadow-inner'>
            {allCards?.map((value,id)=>(
                <div
                style={{backgroundImage:`url('/sinewave.jpg')`,backgroundSize:"cover"}} 
                key={id} className='m-2 my-4 shadow-xl w-[300px] h-[300px] bg-gray-700 rounded flex-shrink-0'>
                    
                    <div className="relative flex flex-col align-middle text-center w-full h-full">
                    <div className='mt-3 text-gray-200 text-[20px] font-semibold'>{value.name}</div>{" "}
                    
                    
                    
                    
                    <button className='absolute top-3 right-3 px-3 py-1 text-lg text-white bg-blue-500 rounded-md' onClick={()=>openTaskCreationFucntion(id)}>+</button>
                    
                    <br />

                    { (openTaskCreateForm && openTaskCreateFormId===id) &&
                    <div className="flex justify-center py-2 w-[96%] mx-auto">
                    <form className="flex">
                        <input className="outline-none p-1 text-gray-900 w-full" type="text" onChange={e=>setTaskName(e.target.value)} placeholder="Task" value={taskName}/>
                       
                        <input className='rounded shadow-md ml-1 px-1 bg-gray-700' onClick={(e)=>createtask(e,value.id)} type="submit" value="Create"/>
                    </form>
                    </div>
                    }

                    <div className=" p-2 max-h-full overflow-y-auto">
                        {alltasks?.reverse().map((tvalue,id)=>(
                            <div key={id}>
                            {tvalue.card===value.id && 
                            <div className='border-[1px] border-gray-500 p-1 shadow-lg rounded-sm backdrop-blur-md flex-shrink-0 h-14 overflow-y-auto align-middle mx-3 mt-2'>
                                <span>{tvalue.name}</span>
                            </div> 
                            }
                            </div>
                        ))}
                    </div>
                    <div className="grow"></div>
                    <div className="bg-gray-800 text-white hover:text-red-300 hover:bg-gray-900 py-1 flex justify-center text-lg bottom-0 backdrop-blur-lg float-right cursor-pointer" onClick={(e)=>deleteCard(e,value.id)}><MdDeleteOutline /></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
  )
}
