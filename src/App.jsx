import { useState } from 'react'
import Home from "./Components/Home";
import RootLayout from './Components/RootLayout';
import {createBrowserRouter, createRoutesFromElements ,Route, RouterProvider} from "react-router-dom"
import './App.css';
import Success from './Components/Success';
import Failed from './Components/Failed';


const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/detected' element={<Success />} />
      <Route path='/failed' element={<Failed />} />

    </Route>
  )
)

function App() {
  return (
    <>

    <RouterProvider router={router} />
      {/* <div className="recording" id="aud-recorder">
      
  
  
      <Home /> */}
     
      {/* <footer className="footers d-flex justify-content-center" 
      // style="color: white;
      // font-weight: 500;
      // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
      >
      made by Yash🍀</footer> */}
  
      
  {/* 
      <form  action="/detected" method="POST" id="detected" >
          
      </form>
      
      <form  action="/failure" method="POST" id="failure" >
          
      </form> */}
      
     
  {/* </div> */}
  </>
    );
}

export default App
