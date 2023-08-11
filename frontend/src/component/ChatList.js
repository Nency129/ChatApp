import React, {  useEffect, useState } from "react";
import { ConversationList, Conversation, Avatar } from "@chatscope/chat-ui-kit-react";
import logo from "../assets/logo.png";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function ChatList({open,setOpen}) {
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [Result, setResult] = useState([]);
  const [loading, setLoading] = useState(false); 
  // const [modal,setModal]=useState(false); 
 
  useEffect(()=>{
    const func=async()=>{
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const res=await axios.get(`http://localhost:5000/api/chat`,config); 
      setResult(res.data);
    }   
    func();
  },[]);

  useEffect(() => {
    if(search===""){
      setSearchResult([]);
    }
    // else{
    //   handleSearch();
    // }
  }, [search]);


  const handleSearch = async () => {
    if (!search) {
      alert("Please Enter something");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };   

      const  data  = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult([...data.data]);
    } catch (error) {
      
      alert("Failed to Load the Search Results");
    }
  };

  const grouphandle=async()=>{
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${ localStorage.getItem('token')}`,
    //   },    
      alert("clicked");
    // const data=await axios.post("http://localhost:5000/api/chat/group",config);
  };
  return (
    <>
      <div className="h-full">
        <div className="flex justify-between mb-3">
          {/* logo */}
          <img src={logo} className="h-10 w-10" />
          <div>
            <div className="mb-3 rounded-xl border flex border-solid border-neutral-300 mx-auto">
              <div className="relative  flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  className="relative m-0 block w-40 min-w-0 flex-auto bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-slate-200 outline-none transition duration-200 ease-in-out "
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div>
                <span
                  className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-slate-300 dark:text-neutral-200"
                  id="basic-addon2"
                  onClick={()=>handleSearch()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <button onClick={()=>setOpen(true)}>Group</button>
          {/* create group chat */}
          {/* <Modal isOpen={modal} onRequestClose={()=>setModal(false)} style={customStyles}>
            <div >
              <span className="mb-24 text-lg ">Create Group Chat</span>
              <input type="text" placeholder="Chat Name" className="border rounded-lg p-1 mb-2 w-full"/>
              <input type="text" placeholder="User" className="border rounded-lg p-1 mb-2 w-full"/>
              <button onClick={()=>{setModal(false)}} className="border bg-black text-white p-2 rounded-lg">Create Chat</button>
            </div>
          </Modal> */}
          
        </div>
        {/* chatList */}
        <ConversationList className="bg-white">
            {loading?<Skeleton count={7} style={{height:"40px"}}/>: 
            searchResult.length && search ? searchResult.map((convo, i) => {
              return <Conversation
              name={convo.name}
              lastSenderName={convo.name}
              info="Yes i can do it"
            >
               <Avatar src={convo.pic} name={convo.name} />
            </Conversation>
            }):
             Result.map((con,i)=>{
              return <Conversation
              name={con.chatName === 'sender' ? con.users[1].name : con.chatName}
              lastSenderName={con.name}
              info="Yes i can do it"
            >
             <Avatar src={con.chatName === 'sender' ? con.users[1].pic : con.pic} name={con.name} />
            </Conversation>
            })
            }
        </ConversationList>
      </div>
    </>
  );

}
export default ChatList;
