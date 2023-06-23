import { useState } from "react";
import Home from "./Components/Home";
import RootLayout from "./Components/RootLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Success from "./Components/Success";
import Failed from "./Components/Failed";
import ErrorPage from "./Components/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/detected" element={<Success />}  />
      <Route path="/failed" element={<Failed />} />
    </Route>
  )
);

function App() {
  return (
    <>
    
        <RouterProvider router={router} />
      
    </>
  );
}

export default App;
