import React, { useContext, useEffect, useState } from "react";
import {
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import logo from "../assets/logo.png";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { chatcontext } from "../Context/ChatProvider";

function ChatList({ open, setOpen }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [loading, setLoading] = useState(false);
  const { result, setResult } = useContext(chatcontext);

  const self = JSON.parse(localStorage.getItem("chitchatuser"));

  useEffect(() => {
    if (search === "") {
      setSearchResult([]);
    } else {
      handleSearch();
    }
  }, [search !== ""]);

  const handleResult = async (convo) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const data = await axios.post(
        "http://localhost:5000/api/chat",
        {
          userId: convo._id,
        },
        config
      );
      navigate(`/chats/${data.data._id}`, { state: { convo: data.data } });
      console.log(data.data);
      setSearch("");
      setSearchResult([]);
    } catch (error) {
      alert("failed to create chat");
    }
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Please Enter something");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const data = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult([...data.data]);
    } catch (error) {
      alert("Failed to Load the Search Results");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div >
        <div className="flex justify-between mb-3">
          {/* logo */}
          <img
            src={logo}
            className="h-10 w-10"
            onClick={() => {
              localStorage.clear();
              navigate("/home");
            }}
          />
          <div>
            <div className="mb-3 rounded-xl border flex border-solid border-gray-800 mx-auto">
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
                  onClick={() => handleSearch()}
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
          <FontAwesomeIcon
            icon={faUserGroup}
            onClick={() => setOpen(true)}
            className="cursor-pointer p-2 rounded-2xl"
            style={{ backgroundColor: "hsl(7, 80%, 63%)" }}
          />
        </div>
        {/* chatList */}
        <div
          style={{ height: "85vh", overflow: "auto" }}
        >
          <ConversationList className="bg-white">
            {loading ? (
              <Skeleton count={7} style={{ height: "40px" }} />
            ) : searchResult.length && search ? (
              searchResult.map((convo, i) => {
                return (
                  <Conversation
                    name={convo.name}
                    lastSenderName={self.name}
                    info="Yes i can do it"
                    onClick={() => {
                      handleResult(convo);
                    }}
                  >
                    <Avatar src={convo.pic} name={convo.name} />
                  </Conversation>
                );
              })
            ) : (
              result.map((convo, i) => {
                return (
                  <Conversation
                    name={
                      convo.chatName == "sender"
                        ? self._id == convo.users[0]._id
                          ? convo.users[1].name
                          : convo.users[0].name
                        : convo.chatName
                    }
                    lastSenderName={convo.name}
                    info="Yes i can do it"
                    onClick={() =>
                      navigate(`/chats/${convo._id}`, {
                        state: { convo: convo },
                      })
                    }
                  >
                    <Avatar
                      src={
                        convo.chatName == "sender"
                          ? self._id == convo.users[0]._id
                            ? convo.users[1].pic
                            : convo.users[0].pic
                          : convo.pic
                      }
                      name={convo.name}
                    />
                  </Conversation>
                );
              })
            )}
          </ConversationList>
        </div>
      </div>
    </>
  );
}
export default ChatList;
