import React from 'react'

export default function sideNav(props){
  return (
    <>
        
            <div className="flex items-center justify-center mt-10">
            <span className="text-white text-3xl font-semibold uppercase">
                Dashboard
            </span>
            </div>

            <div className="mt-10">
            <a href="#" className="flex items-center py-2 px-8 text-gray-400 hover:bg-gray-700 hover:text-white">
                <i className="fas fa-chart-line mr-3"></i>
                <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center py-2 px-8 text-gray-400 hover:bg-gray-700 hover:text-white">
                <i className="fas fa-users mr-3"></i>
                <span>Users</span>
            </a>
            <a href="#" className="flex items-center py-2 px-8 text-gray-400 hover:bg-gray-700 hover:text-white">
                <i className="fas fa-cog mr-3"></i>
                <span>Settings</span>
            </a>
            </div>
    
            <div className="absolute bottom-0 mb-10">
                
                <button 
                    className="flex items-center py-2 px-8 text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={(e)=>props.handle_logout(e)}>
                        <i className="fas fa-sign-out-alt mr-3"></i>
                        Logout
                </button>      
            </div>

            
        
    </>
  )
}
