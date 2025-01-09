import {Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SignIn from './components/SignIn';
import './index.css'
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

export default function App() {
  
  // const [socket, setSocket] = useState(null);
  // const {authUser} = useSelector(store=> store.user);

  // useEffect(() => {
  //   if (authUser) {
  //     console.log('Attempting socket connection...');
  //     const socket = io('http://localhost:3000');
  //     setSocket(socket);
  //     socket.on('connect', () => {
  //       console.log('Socket connected:', socket.id);  // Should log when connected
  //     });
  //     socket.on('disconnect', () => {
  //       console.log('Socket disconnected');
  //     });
  //   }
  // }, [authUser]);
  
  return (

    <div className='p-4 flex items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-yellow-100'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/login' element={<SignIn/>}/>
    </Routes>
    </div>
  )
}