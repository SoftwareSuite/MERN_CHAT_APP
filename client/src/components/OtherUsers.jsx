import React from "react";
import SingleOtherUser from "./SingleOtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  
  useGetOtherUsers()

  const {otherUsers} = useSelector(store=>store.user)
  if (!otherUsers) return;
  return (
    <div className="overflow-auto h-[480px]">
      
      {
        otherUsers?.map((user) =>{
          return(
            <SingleOtherUser key={user._id} user={user}/>
          )
        })
      }
      
    </div>
  );
};

export default OtherUsers;
