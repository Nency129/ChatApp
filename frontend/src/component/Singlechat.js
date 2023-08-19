import React, { useState } from "react";
import { useParams } from "react-router";
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
  const User = location.state.convo;
  console.log(User);
  const [newMessage, setnewMessage] = useState();
  const [messages, setMessages] = useState("");
  const self = JSON.parse(localStorage.getItem("chitchatuser"));
  // const {user,selectedChat,selectedChat}=ChatState();

  // const sendMessage = async (event) => {
  //   if (event.key == "Enter" && newMessage) {
  //     try {
  //       const config = {
  //         headers: {
  //           "context-type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       };

  //       const data = await axios.post(
  //         "http://localhost:5000/api/message",
  //         {
  //           content: newMessage,
  //           // chatId:selectedChat._id,
  //         },
  //         config
  //       );

  //       setnewMessage("");
  //       setMessages([...messages, data.data]);
  //     } catch (error) {}
  //   }
  // };
  return (
    <div>
      <div style={{ height: "93vh", overflow: "auto" }}>
        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src={
                User.chatName === "sender"
                  ? self._id === User.users[0]._id
                    ? User.users[1].pic
                    : User.users[0].pic
                  : User.pic
              }
              name={User.name}
            />
            <ConversationHeader.Content
              userName={
                User.chatName === "sender"
                  ? self._id === User.users[0]._id
                    ? User.users[1].name
                    : User.users[0].name
                  : User.chatName
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
                  User.chatName === "sender"
                    ? self._id === User.users[0]._id
                      ? User.users[1].pic
                      : User.users[0].pic
                    : User.pic
                }
                name={User.name}
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
              <Avatar src={self.pic} name={User.name} />
            </Message>
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            // onKeyDown={sendMessage}
          />
        </ChatContainer>
      </div>
    </div>
  );
}

export default Singlechat;
