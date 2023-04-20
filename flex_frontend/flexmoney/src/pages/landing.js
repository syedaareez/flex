import React from 'react'
import { Link } from 'react-router-dom'

function landing() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-violet-900 min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full bg-gray-400 bg-opacity-30  backdrop-filter backdrop-blur-md py-3 flex justify-between items-center px-6">
        <h1 className="text-4xl font-bold text-white">Aareez</h1>
        <Link to="/signin" className="text-white hover:text-blue-900 font-medium">
          Log in
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-white">
              Organize your projects more collaboratively and get more done
            </h2>
            <p
                className='text-gray-300 text-center mt-3 leading-tight'
            >Aareez's boards, lists and cards enables you to organize and prioritize your work in a fun, flexible and rewarding way.</p>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
      <footer className="py-3 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 max-w-md mx-auto flex justify-center">
          <p className="text-gray-300 text-sm">&copy; 2023 Aareez. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default landing