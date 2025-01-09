import React from 'react'
import { FaSearchLocation } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
const Sidebar = () => {

  const [search, setSearch] = useState('');

  const {otherUsers} = useSelector(store=>store.user)  

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const logOutHandler = async () => {
    try {
      const res = await axios.get('/api/user/logout')
      console.log(res)
        toast.success(res.data.message)
        navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const submitSearchHandler = (e) => {
    e.preventDefault();  
    
    const chatUser = otherUsers.find((user)=> user.fullName.toLowerCase()
    .includes(search.toLowerCase()));
      if (chatUser) {
        dispatch(setOtherUsers([chatUser]))
      }
      else{
        toast.error("user not found")
      }
  }

  return (
    <div className='border border-r border-slate-500 p-4 rounded-lg'>
        <form 
        onSubmit={submitSearchHandler}
        className='flex items-center gap-2'>
            <input 
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            type="text" 
            className='input input-bordered rounded-lg'
            placeholder='Search...' />

            <button type='submit' className='btn text-gray-700 hover:opacity-80 bg-gradient-to-r from-green-200 to-yellow-200'>
            <FaSearchLocation size='20px' />
            </button>
        </form>
        <OtherUsers/>
        <div className=''>
        <button
        onClick={logOutHandler}
        type='submit' className='btn text-gray-700 hover:opacity-80 bg-gradient-to-r from-green-200 to-yellow-200'>
                Log out</button>
        </div>
    </div>
  )
}

export default Sidebar
