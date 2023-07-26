import React from 'react';
import {ConversationList,Conversation} from "@chatscope/chat-ui-kit-react";

function ChatList() {
  return (
    <>
    <div style={{
        height: "340px"
      }}>
            <ConversationList>        
              <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                {/* // <Avatar src={lillyIco} name="Lilly" /> */}
              </Conversation>
              
              <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                {/* // <Avatar src={joeIco} name="Joe" /> */}
              </Conversation>
              
              <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you">
                {/* // <Avatar src={emilyIco} name="Emily" /> */}
              </Conversation>
              
              <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you">
                {/* // <Avatar src={kaiIco} name="Kai" /> */}
              </Conversation>
                          
              <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                {/* // <Avatar src={akaneIco} name="Akane" /> */}
              </Conversation>
                                  
              <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                {/* // <Avatar src={eliotIco} name="Eliot" /> */}
              </Conversation>
                                                  
              <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you">
                {/* /<Avatar src={zoeIco} name="Zoe" /> */}
              </Conversation>
                                                              
              <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                 {/* <Avatar src={patrikIco} name="Patrik" /> */}
              </Conversation>
              
            </ConversationList>
          </div>
          </>
  )
}

export default ChatList
