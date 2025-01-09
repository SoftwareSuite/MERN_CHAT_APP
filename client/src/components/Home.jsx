import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const Home = () => {
  return (
    <div className='border border-r border-slate-500 rounded-lg h-[90vh] p-10 flex '>
      <Sidebar/>
      <MessageContainer/>  
    </div>
  )
}

export default Home