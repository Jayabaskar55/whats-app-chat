import React from "react";
import MessageInput from "./MessageInput";

export default function ChatWindow({ chat, onSend, decrypt, onClose }) {
  return (
    <div className="flex flex-col h-full bg-[url('/whatsapp-bg.png')] bg-cover">
      <div className="bg-[#202C33] p-3 flex justify-between items-center">
        <span className="font-bold">Chat</span>
        <button onClick={onClose} className="text-red-500">✖</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] p-2 rounded-lg ${
              msg.from === "customer" ? "bg-green-600 self-end ml-auto" : "bg-gray-700 self-start"
            }`}
          >
            {msg.isFile ? (
              <a href={JSON.parse(decrypt(msg.encrypted)).file} download={JSON.parse(decrypt(msg.encrypted)).name}>
                📎 {JSON.parse(decrypt(msg.encrypted)).name}
              </a>
            ) : (
              <p>{decrypt(msg.encrypted)}</p>
            )}
            <div className="text-xs text-right mt-1 opacity-70">
              {msg.status || ""}
            </div>
          </div>
        ))}
      </div>
      <MessageInput onSend={onSend} />
    </div>
  );
}
