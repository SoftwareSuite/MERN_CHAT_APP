import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast"
import {useDispatch} from "react-redux";
import { setAuthUser } from '../redux/userSlice';
const SignIn = () => {
     const [user, setUser] = useState({
        username: "",
        password: ""
      });

      const navigate = useNavigate()
      const dispatch = useDispatch();
    
      const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`/api/user/login`, user, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
          console.log(res)
          if(res.data){
          navigate("/");
          toast.success(res.data.message)
          dispatch(setAuthUser(res.data));
        }
    
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }

      };
  return (
    <div className="min-w-96 mx-auto">
      <h1 className="text-3xl text-center font-bold text-gray-700 tracking-tighter">
        Sign in
      </h1>

    <form onSubmit={submitHandler} className="mt-10" action="">

        <div>
            <label className="label p-2">
                <span className="text-base label-text">Username</span>
            </label>
            <input 
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full input input-bordered h-10" type="text" placeholder=". . . . ." />
        </div>

        <div>
            <label className="label p-2">
                <span className="text-base label-text">Password</span>
            </label>
            <input 
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full input input-bordered h-10" type="password" placeholder=". . . . ." />
        </div>

        <div>
            <button 
            type="submit"
            className="font-semibold p-2 rounded-lg mt-8 mb-4 w-full bg-gradient-to-r from-fuchsia-300 to-green-300 hover:opacity-80 transition-all duration-5    00">
                Sign In
            </button>
        </div>

        <div className="flex gap-2">
            <p>Dont have an account?</p>
            <Link className="font-semibold" to='/register'>Sign up</Link>
        </div>
    </form>

    </div>
  );
};

export default SignIn;
