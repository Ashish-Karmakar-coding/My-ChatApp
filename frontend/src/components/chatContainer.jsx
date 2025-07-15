import {useEffect} from 'react'
import inputComp from './input.jsx'
import Header from './header.jsx'
import MessageSkele from '../skeletons/messageSkele.jsx'
import Message from './Message.jsx'

import useChatStore from '../lib/useChatStore.js'

const chatContailner = () => {

  const {selectedUser,messages,isLoadingMessages,getMessages} = useChatStore();



  return (
    <>
    
      <Header />
      <Message/>
      <inputComp/>

    </>
  )
}

export default chatContailner
