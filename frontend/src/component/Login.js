import React from "react";

const Login = () => {
  return (
    <div>
      {/* fields */}
      <div>
        <input
          name="Username"
          className="w-full px-4 py-2 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Username"
          //   value={input.username}
          //   onChange={InputHandler}
          required
        />
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
        <input
          name="password"
          className="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Confirm Password"
          //   value={input.password}
          //   onChange={InputHandler}
          required
        />
        <label class="block">
          <span class="sr-only">Choose profile photo</span>
          <input
            type="file"
            class=" mt-5 block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-slate-800 file:text-slate-200
    "
          />
        </label>
        <button className="w-full bg-red-400 rounded-2xl px-8 py-2 mt-5 mb-2">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
