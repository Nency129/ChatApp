import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
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

function Singlechat() {
  const location = useLocation();
  const User = location.state?.convo;
  // console.log(User);
  const [newMessage, setnewMessage] = useState();
  const [messages, setMessages] = useState("");
  const [selectedChat, SetselectedChat] = useState("");
  const self = JSON.parse(localStorage.getItem("chitchatuser"));
  // const {user,selectedChat,selectedChat}=ChatState();

  useEffect(() => {
    fetchMessages();
  }, [User]);

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
      console.log(data);
      setMessages(data);
    } catch (error) {
      alert("failed to load the message");
    }
  };

  const sendMessage = async (event) => {
    // console.log(event);
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      // console.log("enter");
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
        // console.log(data.data);
        // console.log(User?._id);
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
                  ? self._id === User?.users[0]._id
                    ? User?.users[1].pic
                    : User?.users[0].pic
                  : User?.pic
              }
              name={User?.name}
            />
            <ConversationHeader.Content
              userName={
                User?.chatName === "sender"
                  ? self._id === User?.users[0]._id
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
            typingIndicator={<TypingIndicator content="is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "first",
              }}
            >
              <Avatar
                src={
                  User?.chatName === "sender"
                    ? self._id === User?.users[0]._id
                      ? User?.users[1].pic
                      : User?.users[0].pic
                    : User?.pic
                }
                name={User?.name}
              />
            </Message>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "outgoing",
                position: "last",
              }}
            >
              <Avatar src={self.pic} name={User?.name} />
            </Message>
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
