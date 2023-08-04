import React from "react";
import {MessageInput,Message,MessageSeparator,ChatContainer,ConversationHeader,VoiceCallButton,VideoCallButton,InfoButton,MessageList,TypingIndicator} from "@chatscope/chat-ui-kit-react";

function Singlechat() {
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
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </div>
    </div>
  );
}

export default Singlechat;
