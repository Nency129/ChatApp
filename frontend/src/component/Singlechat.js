import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  MessageInput,
  Message,
  MessageSeparator,
  ChatContainer,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  MessageList,
  TypingIndicator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import io from "socket.io-client";
import { chatcontext } from "../Context/ChatProvider";

function Singlechat() {
  const location = useLocation();
  const User = location.state?.convo;
  const [newMessage, setnewMessage] = useState();
  const [messages, setMessages] = useState("");
  const [socketConnected, setsocketConnected] = useState(false);
  const { user } = useContext(chatcontext);

  // socket.io
  const ENDPOINT = "http://localhost:5000";
  var socket, selectedChatComapre;

  useEffect(() => {
    fetchMessages();
  }, [User]);

  useEffect(() => {
    socket = io(ENDPOINT);
    // console.log(user,"user");
    socket.emit("setup", user);
    socket.on("connection", () => setsocketConnected(true));
  }, []);

  const fetchMessages = async () => {
    if (!User) return;

    try {
      const config = {
        headers: {
          "context-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${User._id}`,
        config
      );
      setMessages(data);
      // console.log(User._id); 
      socket.emit('join chat',User._id);
    } catch (error) {
      alert("failed to load the message");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      try {
        const config = {
          headers: {
            "context-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const data = await axios.post(
          "http://localhost:5000/api/message",
          {
            content: newMessage,
            chatId: User?._id,
          },
          config
        );
        setnewMessage("");
        setMessages([...messages, data.data]);
      } catch (error) {
        alert("error occured");
      }
    }
  };

  return (
    <div>
      <div style={{ height: "88vh", overflow: "auto" }}>
        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src={
                User?.chatName === "sender"
                  ? user._id === User?.users[0]._id
                    ? User?.users[1].pic
                    : User?.users[0].pic
                  : User?.pic
              }
              name={User?.name}
            />
            <ConversationHeader.Content
              userName={
                User?.chatName === "sender"
                  ? user._id === User?.users[0]._id
                    ? User?.users[1].name
                    : User?.users[0].name
                  : User?.chatName
              }
              info="Active 12 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>

          <MessageList
          // typingIndicator={<TypingIndicator content="is typing" />}
          >
            {messages.length && messages?.map((msg, i) => {
              return (
                <Message
                  model={{
                    message: msg.content,
                    sentTime: "15 mins ago",
                    sender: msg.sender.name,
                    direction:
                      msg.sender.name === user.name ?  "outgoing":"incoming",
                    position: msg,
                  }}
                >
                  <Avatar
                    src={ msg.sender.pic}
                    name={User?.name}
                  />
                </Message>
              );
            })}
            {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
          </MessageList>
          {/* <MessageInput
            placeholder="Type message here"
            onKeyDown={sendMessage}
            value={newMessage}
            // onChange={(e) => setnewMessage(e.target.value)}
          /> */}
        </ChatContainer>
      </div>
      <form>
        <input
          type="text"
          className="border-2 rounded-lg p-1 mb-2 w-full bg-slate-900 border-gray-800 text-white "
          placeholder="Type message here"
          onKeyDown={sendMessage}
          value={newMessage}
          onChange={(e) => setnewMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Singlechat;
