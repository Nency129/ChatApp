import React from "react";
import Register from "../component/Register";
import logo from "../assets/logo.png";
import Login from "../component/Login";

const Homepage = () => {
  return (
    <div className="mx-auto my-20">
      <div className="border-black border-2 p-4 bg-black text-slate-200 rounded-2xl w-80">
        <img src={logo} className="h-12 w-12 mx-auto" />
        <div className="grid grid-cols-2 gap-2 mt-5">
          <div>
            <button className="bg-slate-800 px-8 py-2 w-full rounded-2xl">
              Signup
            </button>
          </div>
          <div>
            <button className="bg-slate-800 px-8 py-2 w-full rounded-2xl">
              Login
            </button>
          </div>
        </div>

        <Register/>
        {/* <Login /> */}
      </div>
    </div>
  );
};

export default Homepage;
