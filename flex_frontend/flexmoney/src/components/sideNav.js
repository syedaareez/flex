import React, { useEffect, useState } from 'react'
import { fetchwrapper } from '../helpers/fetchwrapper';
import {MdDeleteOutline} from 'react-icons/md'


export default function SideNav(props){

    const tasks=["Task1","Task2","Task3"];

    return (
        <div className='relative h-screen'>

            <br />
            <div className="flex items-center justify-center">
            <span className="text-white text-3xl font-semibold uppercase">
                Dashboard
            </span>
            </div>
            <br />

            <div className='w-full'>
                <form className="mx-auto w-[90%] flex justify-center align-middle" onSubmit={props.createProject}>
                    <input className="px-2 text-gray-900 py-2 rounded shadow-md mr-1 outline-none w-[90%] text-base" type="text" onChange={e=>props.setProjectTitle(e.target.value)} placeholder="Project Name" value={props.ProjectTitle}/>
                    <input className='rounded text-gray-300 shadow-md px-1 py-0 bg-gray-700' type="submit" value="Create" />
                </form>
            </div>
            <br />
            <h1 className='text-white text-xl p-2 pl-4 '>Personal</h1>

            <div 
                onClick={()=>props.setActiveProjectFunc(null)} 
                className={`relative pl-4 flex items-center p-2 ${props.activeProject===null&&"bg-gray-700 "} hover:bg-gray-700  text-gray-400 hover:text-white`}>
                    <span>Personal Boards</span>
            </div>

            <div className="mt-4">

                <h1 className='text-white text-xl p-2 pl-4 '>All Projects</h1>
                {props.allProjects?.map((value,id)=>(
                
                <div key={id} onClick={()=>props.setActiveProjectFunc(value)} className={`relative pl-4 flex items-center p-2 ${props.activeProject===value.id&&"bg-gray-700 "} hover:bg-gray-700  text-gray-400 hover:text-white`}>
                    <span>{value.name}</span>
                    
                    <span 
                        onClick={(e)=>props.deleteProject(e,value.id)}
                        className='absolute right-2 text-lg text-gray-300 hover:text-red-300 hover:bg-gray-800 p-1 rounded-md'><MdDeleteOutline/></span>
                </div>
               
            ))}
           
            </div>



            <div className="mt-4">

                <h1 className='text-white text-xl p-2 pl-4 '>Tasks Assigned</h1>
                {tasks?.map((value,id)=>(
                
                <div key={id} className={`relative pl-4 flex items-center p-2 ${props.activeProject===value.id&&"bg-gray-700 "} hover:bg-gray-700  text-gray-400 hover:text-white`}>
                    <span>{value}</span>
                    
                    
                </div>
               
            ))}
           
            </div>

            
    
            <div className="absolute bottom-0  w-full">
                
                <button 
                    className="flex w-full items-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={(e)=>props.handle_logout(e)}>
                        <i className="fas fa-sign-out-alt mr-3"></i>
                        Logout
                </button>      
            </div>

            
        
    </div>
  )
}
