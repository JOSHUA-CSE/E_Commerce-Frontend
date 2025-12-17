import { useRef } from "react";
import { useState } from "react"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
const Login=()=>{
    const [username,setuserName]=useState('');
    const navigate=useNavigate()
    const handleNameChange=(e)=>{
        setuserName(e.target.value)
    }
    
    const passwordref=useRef('')
    const handleSubmitButton=async (e)=>{
        e.preventDefault()
        console.log(username,passwordref.current.value) 
        const {data}=await axios.post(`http://localhost:3000/auth/login`,{
            email:username,
            password:passwordref.current.value
        })
        console.log("response=>",data)
        toast.success(data.message)
        sessionStorage.setItem('token',data.token)
        sessionStorage.setItem('userId',data.userId)
        sessionStorage.setItem('isLoggedIn',true)
        sessionStorage.setItem('role',data.role)
        localStorage.setItem('userId',data.userId)
        navigate('/admin')
    }

    return(
        <div className="bg-fuchsia-700 h-screen py-60">    
            <div className="flex flex-col justify-center shadow-lg rounded-full bg-pink-300 items-center mx-150">    
                <form className="flex flex-col items-center">
                    <h1 className="text-center text-2xl font-bold my-2">LOGIN</h1>
                    <input type="text" id="email" name="E-MAIL" placeholder="Username" value={username} className="border-2  rounded-lg p-3 w-full my-2 " onChange={handleNameChange}/>
                    <input type="password" id="pass"name="PASSWORD" placeholder="Password" ref={passwordref} className="border-2  rounded-lg p-3 w-full my-2 "/>
                    <button className="bg-slate-950 text-white mx-auto my-2 p-2 rounded-full w-[100px] items-center" onClick={handleSubmitButton}>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}
export default Login