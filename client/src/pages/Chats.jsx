import React from 'react'
import Layout from '../component/AppLayout/Layout'
import ChatMessage from '../component/ChatMessage'

const Chats = () => {
  return (
    <ChatMessage />
  )
}

export default Layout()(Chats)
