import React from "react";

const Register = () => {
  return (
    <>
      <div>
        <input
          name="Email"
          className="w-full px-4 py-2 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Email"
          //   value={input.username}
          //   onChange={InputHandler}
          required
        />
        <input
          name="password"
          className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Password"
          //   value={input.password}
          //   onChange={InputHandler}
          required
        />
      </div>
      <div>
        <button className="w-full bg-red-400 rounded-2xl px-8 py-2 mt-5 mb-2">
          Login
        </button>
        <span>Don't have an account?Create account</span>
      </div>
    </>
  );
};

export default Register;
