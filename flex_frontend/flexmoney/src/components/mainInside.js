import React, { useState } from 'react';

import Boards from './mainInside/boards';
import Board from './mainInside/board';

export default function MainInside() {

  const [showBoard,setShowBoard]=useState(false);
  const [boardDetails,setBoardDetails]=useState({});
  function funcToShowBoard(v){
    setBoardDetails(v);
    setShowBoard(!showBoard);
  }

  return (
    <>
    {showBoard?(

    <Board value={boardDetails} funcToShowBoard={(v)=>funcToShowBoard(v)}/>
    
    ):(
    <main className="flex-1 overflow-y-auto bg-gray-200 px-10 py-5 text-center items-center">
          <Boards  funcToShowBoard={(v)=>funcToShowBoard(v)}/>
    </main>
    )}
    </>
  )
}
