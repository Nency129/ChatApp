import axios from "axios";
import React, { useState } from "react";


const Login = () => {
  const [input,setInput]=useState({
    email: "",
    password:"",
  });

  const InputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value)
    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: input.email,
      password: input.password,
    };
    // setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        { ...user},
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
        }
      );
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("chitchatuser",JSON.stringify(user));
      console.log(res.data.token);
    } catch (error) {
      console.log("error form content", error);
    }
    setInput({
     
      email: "",
      password: "",

    });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input
            name="email"
            className="w-full px-4 py-2 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="email"
            placeholder="Email"
              value={input.email}
              onChange={InputHandler}
            required
          />
          <input
            name="password"
            className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
            type="password"
            placeholder="Password"
              value={input.password}
              onChange={InputHandler}
            required
          />
        </div>
        <div>
          <button className="w-full bg-red-400 rounded-2xl px-8 py-2 mt-5 mb-2">
            Login
          </button>
        </div>
      </form>
    </>
    
  );
};

export default Login;
