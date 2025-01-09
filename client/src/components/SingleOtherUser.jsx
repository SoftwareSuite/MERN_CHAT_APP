import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'

const SingleOtherUser = ({user}) => {

  const dispatch = useDispatch()
  const { selectedUser} = useSelector(store=>store.user)

  
  const selectedUserHandler = (user)=> {
    dispatch(setSelectedUser(user))
    
  }

  return (
    <div className="mt-10">
      <div
      onClick={()=>selectedUserHandler(user)}
      className={`${selectedUser?._id === user?._id ? 'bg-green-200 flex justify-start items-center gap-2 p-2 rounded cursor-pointer' : '' }flex justify-start items-center gap-2 hover:bg-blue-200 p-2 rounded cursor-pointer`}>
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={user?.profilePhoto}
              alt=""
            />
          </div>
        </div>

        <div className=" font-semibold">
          <p>{user?.fullName}</p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </div>
  )
}

export default SingleOtherUser;