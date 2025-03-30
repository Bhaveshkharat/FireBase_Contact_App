import React from 'react'
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Model = ({onClose, isOpen, children}) => {
  return createPortal( 
  <>{isOpen && (
  
  < div  className='grid place-items-center backdrop-blur z-40 h-screen w-screen absolute top-0'>
  <div className='m-auto min-h-[200px] min-w-[80%] relative z-50 bg-white p-4'>
    
    <div className='flex justify-end'>
      <AiOutlineClose onClick={onClose} className='text-2xl self-end'/>
    </div>
    {children}
    
    </div> 
    
    </div>
  )}
    </>,
 document.getElementById("model-root")
)
};


export default Model
