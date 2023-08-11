import React from "react";
import {MessageInput,Message,MessageSeparator,ChatContainer,ConversationHeader,VoiceCallButton,VideoCallButton,InfoButton,MessageList,TypingIndicator} from "@chatscope/chat-ui-kit-react";
import axios from "axios";

function Singlechat() {
  const [newMessage, setnewMessage] = useState();
  const sendMessage=async(event)=>{
    if(event.key=="Enter" && newMessage){
      try {
        const config = {
          headers: {
            "context-type":"application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const data=await axios.post('http://localhost:5000/api/message',config);
        
      } catch (error) {
        
      }
    }
  }
  return (
    <div>
      <div style={{  height: "650px" }}>
        <ChatContainer>
          <ConversationHeader>
            {/* <Avatar src={emilyIco} name="Emily" /> */}
            <ConversationHeader.Content
              userName="Emily"
              info="Active 12 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Emily is typing" />}
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
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "outgoing",
                position: "last",
              }}
            >
              {/* <Avatar src={emilyIco} name={"Emily"} /> */}
            </Message>
          </MessageList>
          <MessageInput placeholder="Type message here" onKeyDown={sendMessage}/>
        </ChatContainer>
      </div>
    </div>
  );
}

export default Singlechat;
