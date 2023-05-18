import React, { useState } from 'react';

import Boards from './mainInside/boards';
import Board from './mainInside/board';

export default function MainInside(props) {

  const [showBoard,setShowBoard]=useState(false);
  const [boardDetails,setBoardDetails]=useState({});
  function funcToShowBoard(v){
    setBoardDetails(v);
    setShowBoard(!showBoard);
  }

  return (
    <div className='h-full bg-gray-600 text-gray-200'>
    {showBoard?(

    <Board value={boardDetails} funcToShowBoard={(v)=>funcToShowBoard(v)}/>
    
    ):(
    <main className="flex-1 overflow-y-auto px-4 py-5 text-center items-center">
          <Boards ProjectObject={props.projectObject} funcToShowBoard={(v)=>funcToShowBoard(v)}/>
    </main>
    )}
    </div>
  )
}
