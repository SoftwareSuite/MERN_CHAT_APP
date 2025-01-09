import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate()

  const handleCheckBox = (gender) => {
    setUser({ ...user, gender });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(res)
      if (res.data) {
        navigate("/login");
        toast.success(res.data.message);
      }

    } catch (error) {
        console.log(error);
    }
    
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <h1 className="text-3xl text-center font-bold text-gray-700 tracking-tighter">
        Sign up
      </h1>

      <form onSubmit={submitHandler} className="mt-10" action="">
        <div>
          <label className="label p-2">
            <span className="text-base label-text">Full Name</span>
          </label>
          <input
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            className="w-full input input-bordered h-10"
            type="text"
            placeholder=". . . . ."
          />
        </div>

        <div>
          <label className="label p-2">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            className="w-full input input-bordered h-10"
            type="text"
            placeholder=". . . . ."
          />
        </div>

        <div>
          <label className="label p-2">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            className="w-full input input-bordered h-10"
            type="password"
            placeholder=". . . . ."
          />
        </div>

        <div>
          <label className="label p-2">
            <span className="text-base label-text">Confirm Password</span>
          </label>
          <input
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            value={user.confirmPassword}
            className="w-full input input-bordered h-10"
            type="password"
            placeholder=". . . . ."
          />
        </div>
        <div className="my-4 flex items-center gap-10 ">
          <div className="flex items-center justify-center gap-3">
            <p>Male</p>
            <input
              checked={user.gender === "male"}
              onChange={() => handleCheckBox("male")}
              type="checkbox"
              className="checkbox checkbox-success"
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <p>Female</p>
            <input
              checked={user.gender === "female"}
              onChange={() => handleCheckBox("female")}
              type="checkbox"
              className="checkbox checkbox-secondary"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="font-semibold p-2 rounded-lg my-3 w-full bg-gradient-to-r from-green-300 to-fuchsia-300 hover:opacity-80 transition-all duration-5    00"
          >
            Register
          </button>
        </div>

        <div className="flex gap-2">
          <p>Already have an account?</p>
          <Link className="font-semibold" to="/login">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
