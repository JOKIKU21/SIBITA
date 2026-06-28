"use client";

import { useState } from "react";

interface Message {
  id: number;
  text: string;
  time: string;
  isMe: boolean;
}

const initialMessages: Message[] = [
  { id: 1, text: "I'm gyuuddddd.....", time: "15.20", isMe: false },
  { id: 2, text: "Hallo! How are you?", time: "15.20", isMe: true },
];

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}.${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), time, isMe: true },
    ]);
    setInput("");
  }

  return (
    <div className="panel chat-panel">
      <div className="panel-header">Chatting</div>

      <div className="chat-body">
        <span className="chat-date-badge">Hari Ini</span>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-row ${msg.isMe ? "me" : ""}`}
          >
            <div className="chat-avatar" />
            <div className="chat-bubble">
              {msg.text}
              <span className="chat-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-row">
        <button className="chat-plus" type="button">+</button>
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write a message........"
        />
        <button className="chat-send" type="button" onClick={sendMessage}>↑</button>
      </div>
    </div>
  );
}
