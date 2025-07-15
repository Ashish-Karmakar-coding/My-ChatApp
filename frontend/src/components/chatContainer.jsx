import {useEffect} from 'react'
import InputComp from './input.jsx'
import Header from './header.jsx'
import MessageSkele from '../skeletons/messageSkele.jsx'
import Message from './Message.jsx'

import useChatStore from '../lib/useChatStore.js'

const ChatContainer = () => {

  const {selectedUser,messages,isLoadingMessages,getMessages} = useChatStore();



  return (
    <>
    <div className='flex flex-col w-full h-full bg-gray-800 p-4 '>

      <Header />
      <Message/>
      <InputComp/>
    </div>

    </>
  )
}

export default ChatContainer
