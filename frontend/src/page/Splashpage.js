import React from 'react'
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Splashpage() {
    const navigate=useNavigate();
    
    function handletime(){
        navigate('/home');
    }
    const myTimeout = setTimeout(handletime, 800);
  return (
    <div className='mx-auto my-auto'>
        <img src={logo} alt='logo'/>
    </div>
  )
}

export default Splashpage
