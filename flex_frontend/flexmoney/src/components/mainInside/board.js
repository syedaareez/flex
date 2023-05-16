import React, { useEffect, useState } from 'react'
import { fetchwrapper } from '../../helpers/fetchwrapper';

export default function Board(props) {

  const [cardName,setCardName]=useState("");
  const [cardBoard,setCardBoard]=useState(props.value.id);

  const [taskName,setTaskName]=useState("");
  const [taskDetail,setTaskDetail]=useState("");

  const[allCards, setAllcards]=useState([]);

  const[alltasks, setAlltasks]=useState([]);

  function fetchAllCards(){
    const url=`${process.env.REACT_APP_PRODUCTION_URL}app/boards/${cardBoard}/cards`;
        fetchwrapper.get(url)
        .then((data)=>{
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

        const params={ name: taskName,details:taskDetail,card_id:card_id };

        
        fetchwrapper.post(url,params)
        .then((data)=>{
            setTaskName("");
            setTaskDetail("");
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
    <>
    <div className='border-2 border-red-500'>
    <span>title = {props.value.title}{props.value.id} </span>{" "}
    <span>description = {props.value.description} </span>{" "}
    <span>user id = {props.value.user} </span>
    </div><br /><br />
    <div onClick={()=>props.funcToShowBoard({})}>Back</div>
    <br /><br />
    <div>Create A new Card!!</div>
    <br />
    <form onSubmit={createcard}>
        <input type="text" onChange={e=>setCardName(e.target.value)} placeholder="title" value={cardName}/>
        <input type="submit" value="Submit"/>
    </form>
    <br /><br />
    <h1>All Cards</h1>
        <div className='border-2 border-black p-[20px] max-w-screen flex overflow-x-scroll scrollbar'>
            {allCards?.map((value,id)=>(
                <div key={id} className='flex-shrink-0 mx-3 border-2 border-green-500 p-4'>
                    <span>title = {value.name}{value.id} </span>{" "}
                    <span>Board = {value.board} </span>{" "}
                    <span className="float-right ml-4 cursor-pointer" onClick={(e)=>deleteCard(e,value.id)}>X</span>
                    <br />

                    <button className='px-2 border-2' onClick={()=>openTaskCreationFucntion(id)}>+</button>
                    
                    <br />

                    { (openTaskCreateForm && openTaskCreateFormId===id) &&
                    <div>
                    <form>
                        <input type="text" onChange={e=>setTaskName(e.target.value)} placeholder="title" value={taskName}/>
                        <input type="text" onChange={e=>setTaskDetail(e.target.value)} placeholder="details" value={taskDetail}/>
                        <input onClick={(e)=>createtask(e,value.id)} type="submit" value="Submit"/>
                    </form>
                    </div>
                    }

                    <br /><br />
                    <div className="border-2 border-black p-2">
                        {alltasks?.map((tvalue,id)=>(
                            <div key={id}>
                            {tvalue.card===value.id && 
                            <div className='flex-shrink-0 mx-3 my-1 border-2 border-red-500'>
                                <span>Name= {tvalue.name}</span>
                                <span>Details= {tvalue.details}</span>
                            </div> 
                            }
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </>
    
  )
}
