import readReceiptIcon from '../../assets/figma/chat/read-receipt.svg'
import type { Message } from '../../types'

interface MessageBubbleProps {
  message: Message
}

function MessageBody({ body }: { body: string }) {
  const parts = body.split(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi)

  return (
    <>
      {parts.map((part, index) => {
        if (/^(https?:\/\/[^\s]+|www\.[^\s]+)$/i.test(part)) {
          const href = part.startsWith('http') ? part : `https://${part}`

          return (
            <a
              key={`${part}-${index}`}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="chat-message-link"
            >
              {part}
            </a>
          )
        }

        return <span key={`${part}-${index}`}>{part}</span>
      })}
    </>
  )
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.sender === 'assistant' || message.sender === 'user'

  if (isOutgoing) {
    return (
      <div className="chat-message chat-message--outgoing">
        <div className="chat-message-meta">
          <span className="chat-message-time">{message.time}</span>
          <img
            src={readReceiptIcon}
            alt=""
            aria-hidden
            className="chat-message-receipt"
            draggable={false}
          />
        </div>
        <div className="chat-message-bubble chat-message-bubble--outgoing">
          <MessageBody body={message.body} />
        </div>
      </div>
    )
  }

  return (
    <div className="chat-message chat-message--incoming">
      <div className="chat-message-bubble chat-message-bubble--incoming">
        <MessageBody body={message.body} />
      </div>
      <span className="chat-message-time">{message.time}</span>
    </div>
  )
}
