
import React from 'react'

import { useNavigate } from 'react-router-dom';
import "./fail.css";
const Failed = () => {

  const navigate=useNavigate();
  return (
    <>
       <div className="">
        <div className="">
            <div className="card shadow-sm border-0 rounded-lg mt-5" style={{width:'30rem'}}>
                <h3 className="card-header display-4 text-muted text-center">
                    No Result
                </h3>
    
                <span className="card-subtitle mb-2 text-muted text-center">
                    Sorry, couldn't quite catch that! 
                </span>
    
                <div className="card-body mx-auto">
                    
                    <button className='button' onClick={()=>navigate("/")} style={{backgroundColor:'#242424'}}>Try again</button>
                
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Failed