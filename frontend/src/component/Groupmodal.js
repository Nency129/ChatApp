import React, { useContext, useState } from "react";
import { chatcontext } from "../Context/ChatProvider";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Avatar, Conversation } from "@chatscope/chat-ui-kit-react";
import UserBadge from "./UserBadge";

function Groupmodal({ open, setOpen }) {
  const [groupChatName, SetGroupChatName] = useState();
  const [selectedUsers, setSelectedUser] = useState([]);
  const [search, setsearch] = useState();
  const [searchResult, setsearchResult] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { user, chats,setChats } = useContext(chatcontext);

  const handleGroup = async (userToadd) => {
    if (selectedUsers.includes(userToadd)) {
      alert("user already added");
      return;
    }
    setSelectedUser([...selectedUsers, userToadd]);
  };

  const handleSearch = async (query) => {
    setsearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      // console.log(search,"search");
      const data = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      // console.log(data.data);
      setLoading(false);
      setsearchResult(data.data);
    } catch (error) {
      alert("search failed");
    }
  };

  const handlesubmit = async() => {
    if(!groupChatName || !selectedUsers){
      alert("please fill all thw feilds");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const Data=await axios.post('http://localhost:5000/api/chat/group',{
        name:groupChatName,
        users:JSON.stringify(selectedUsers.map((con)=>con._id)),
      },config);

      setChats([Data,...chats]);
      onclose();
      alert("new group chat created");
    } catch (error) {
      alert("failed to create the chats!");
      console.log(error);
    }
  };

  const handlecancle = () => {
    setOpen(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded-lg w-72">
        <h1 className="font-semibold text-center text-xl text-gray-700 mb-2">
          Create Group Chat
        </h1>
        <div className="flex flex-col mb-3">
          <input
            type="text"
            placeholder="Chat Name"
            className="border rounded-lg p-1 mb-2 w-full"
            value={groupChatName}
            onChange={(e) => SetGroupChatName(e.target.value)}
          />
          <input
            type="text"
            placeholder="User"
            className="border rounded-lg p-1 mb-2 w-full"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {/* selected users */}
        {selectedUsers.map((con, i) => (
          <UserBadge setSelectedUser={setSelectedUser} selectedUsers={selectedUsers} convo={con} />
        ))}
        {/* render all users */}
        {Loading ? (
          <Skeleton count={7} style={{ height: "40px" }} />
        ) : (
          searchResult?.slice(0, 4).map((convo, i) => {
            return (
              <Conversation
                name={convo.name}
                lastSenderName={convo.name}
                info="Yes i can do it"
                onClick={() => handleGroup(convo)}
              >
                <Avatar src={convo.pic} name={convo.name} />
              </Conversation>
            );
          })
        )}
        <div className="text-center flex justify-between">
          <button
            className="px-5 py-2 bg-gray-700 text-white rounded-lg "
            onClick={handlecancle}
          >
            Cancle
          </button>
          <button
            className="px-5 py-2 bg-gray-700 text-white rounded-lg"
            onClick={handlesubmit}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default Groupmodal;
