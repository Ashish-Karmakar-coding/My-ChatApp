import React from 'react'
import inputComp from './input.jsx'
import Header from './header.jsx'
import MessageSkele from '../skeletons/messageSkele.jsx'
import Message from './Message.jsx'

const chatContailner = () => {
  return (
    <>
    
      <Header />
      <Message/>
      <inputComp/>

    </>
  )
}

export default chatContailner
