import React from 'react';
import Singlechat from '../component/Singlechat';
import ChatList from '../component/ChatList';

// chat aapilcattion
const ChatPage = () => {

  return (
    <div className='w-full' style={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div className='p-4 bg-black text-slate-200 rounded-lg' style={{width:'96vw'}}>
      <div className='grid grid-cols-12 w-full gap-2'>
        <div className='col-span-3'><ChatList/></div>
        <div className='col-span-9 border-gray-700 border-3'><Singlechat/></div>
      </div>
      </div>
      
    </div>
  );
}

export default ChatPage;
