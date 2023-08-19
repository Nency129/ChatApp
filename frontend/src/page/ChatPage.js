import React, { useState } from "react";
import Singlechat from "../component/Singlechat";
import ChatList from "../component/ChatList";
import Groupmodal from "../component/Groupmodal";
import { useParams } from "react-router-dom";
import DemoChat from "../component/DemoChat";

// chat aaplication
function ChatPage() {
  const [openmodal, setOpenmodal] = useState(false);
  let params = useParams();
  let id = params.id;
  return (
    <div className="flex justify-center">
      <div
        className="p-4 bg-black text-slate-200 rounded-lg m-5"
        style={{ width: "98vw",height:"98vh"}}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <ChatList open={openmodal} setOpen={setOpenmodal} />
          </div>
          {id !== "0" ? (
            <div className="col-span-9 border-gray-700">
              <Singlechat />
            </div>
          ) : (
            <div className="col-span-9 ">
              <DemoChat />
            </div>
          )}
        </div>
      </div>
      {openmodal && <Groupmodal open={openmodal} setOpen={setOpenmodal} />}
    </div>
  );
}

export default ChatPage;
