import React from 'react'

const ChatMessage = ({messageData}) => {
  return (
        <div className={`chat-content ${messageData.agent !== "You" ? " ai-chat":""}`}>
              <div className="avatar">
                    {
                        messageData.agent
                    }
              </div>
              <div className="message">
                {
                    messageData.message
                }
              </div>
          </div>
  )
}

export default ChatMessage