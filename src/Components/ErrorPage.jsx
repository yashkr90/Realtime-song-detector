import React from 'react'
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ error, resetErrorBoundary }) => {

  const navigate= useNavigate();
  return (
    <>
    <div style={{maxWidth:'80vw' ,marginBottom:'200px'}}>
    <div style={{color:'white' ,fontSize:'50px'} } className='mb-5'>Someting went wrong...</div>
    <button onClick={()=>navigate("/")}> Back to home</button>
    </div>
    </>
  )
}

export default ErrorPage;