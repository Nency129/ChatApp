import React from 'react';
import Singlechat from '../component/Singlechat';
import ChatList from '../component/ChatList';

// chat aapilcattion
const ChatPage = () => {
  return (
    <div>
      <div className='p-4 bg-black text-slate-200 rounded-lg w-full'>
      <div className='grid grid-cols-3 gap-2'>
        <div><ChatList/></div>
        <div className='col-span-2 border-gray-700 border-3'><Singlechat/></div>
      </div>
      </div>
      
    </div>
  );
}

export default ChatPage;
