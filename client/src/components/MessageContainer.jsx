import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { FaSmileWink } from "react-icons/fa";

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch =useDispatch();

  useEffect(()=> {
    return ()=> dispatch(setSelectedUser(null))
  },[])
  
  console.log(selectedUser);
  return (
    <>
      {selectedUser !== null ? (
        <div className="min-w-[550px] flex flex-col">
          <div className="flex justify-start items-center gap-2 bg-zinc-800 text-white rounded px-4 py-2 mb-2 ml-2">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src={selectedUser.profilePhoto} alt="" />
              </div>
            </div>

            <div className=" font-semibold">
              <p>{selectedUser.fullName}</p>
            </div>
          </div>

          <Messages />

          <SendInput />
        </div>
      ) : (
          <div className="min-w-[550px] w-full text-center my-auto flex items-center justify-center gap-2">
        <h1 className="font-bold text-3xl">Lets start a conversation </h1>
        <FaSmileWink size={26} />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
