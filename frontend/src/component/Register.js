import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(input, pic);
  }, [input, pic]);

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
      name: input.username,
      email: input.email,
      password: input.password,
    };
    setLoading(true);
    if (input.password !== input.cpassword) {
      alert("password dosen't match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/",
        { ...user, pic },
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
      localStorage.setItem("chitchatuser", JSON.stringify(res.data.user));
      navigate("/chats/0");
      console.log(res.data.token);
    } catch (error) {
      console.log("error form content", error);
    }
    setInput({
      username: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      alert("please select an Image");
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chitchat");
      data.append("cloud_name", "blackfox");
      console.log(data);
      fetch("https://api.cloudinary.com/v1_1/blackfox/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      alert("please select an image");
      setLoading(false);
      return;
    }
  };

  return (
    <div>
      {/* fields */}
      <form onSubmit={submitHandler}>
        <input
          name="username"
          className="w-full px-4 py-2 mt-5 rounded-lg font-medium bg-slate-950 border border-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="text"
          placeholder="Username"
          value={input.username}
          onChange={InputHandler}
          required
        />
        <input
          name="email"
          className="w-full px-4 py-2 mt-5 rounded-lg font-medium bg-slate-950 border border-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Email"
          value={input.email}
          onChange={InputHandler}
          required
        />
        <input
          name="password"
          className="w-full px-4 py-2 rounded-lg font-medium bg-slate-950 border border-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={InputHandler}
          required
        />
        <input
          name="cpassword"
          className="w-full px-4 py-2 rounded-lg font-medium bg-slate-950 border border-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Confirm Password"
          value={input.cpassword}
          onChange={InputHandler}
          required
        />
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            className=" mt-5 block w-full text-sm text-slate-500
            file:border-gray-800
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-slate-950 file:text-slate-500"
            onChange={(e) => {
              postDetails(e.target.files[0]);
              // loading={loading}
            }}
          />
        </label>
        <button className="w-full bg-red-400 rounded-2xl px-8 py-2 mt-5 mb-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
