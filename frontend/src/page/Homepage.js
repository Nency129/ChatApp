import React, { useEffect, useState } from "react";
import Register from "../component/Register";
import logo from "../assets/logo.png";
import Login from "../component/Login";

const Homepage = () => {
  const [login, setLogin] = useState(false);
  return (
    <div className="mx-auto my-20">
      <div className="border-black border-2 p-4 bg-black text-slate-200 rounded-2xl w-80">
        <img src={logo} className="h-14 w-14 mx-auto" />
        <div className="grid grid-cols-2 gap-2 mt-5">
          <div>
            <button
              className=" px-8 py-2 w-full rounded-2xl"
              style={{ backgroundColor: "#181828" }}
              onClick={() => setLogin(!login)}
            >
              Signup
            </button>
          </div>
          <div>
            <button
              className=" px-8 py-2 w-full rounded-2xl"
              style={{ backgroundColor: "#181828" }}
              onClick={() => setLogin(!login)}
            >
              Login
            </button>
          </div>
        </div>

        {login ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default Homepage;
