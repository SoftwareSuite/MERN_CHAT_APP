import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {  
  const [message, setMessage] = useState('')
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store => store.user)
  const {messages} = useSelector(store => store.message)

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`/api/message/send/${selectedUser?._id}`, {message}, {
        headers: {
          "Content-Type": "application/json",
        }, 
        withCredentials: true
      });
      console.log(res.data.newMessage)  
      dispatch(setMessages([...messages, res.data.newMessage]))
      
    } catch (error) {
      console.log(error)
    }
    setMessage("")
  };
  
  return (
    <form onSubmit={submitHandler}
    className="px-4 my-2">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e)=> setMessage(e.target.value)}
          type="text"
          placeholder="Type your message"
          className="ml-2 p-4 border text-sm rounded-lg block w-full border-green-500 bg-blue-100 outline-none "
        />
        <button 
        type="submit"
        className="absolute flex items-center inset-y-0 end-0 pr-2">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
