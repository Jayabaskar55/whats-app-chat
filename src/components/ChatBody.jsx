import React, { useEffect, useRef } from "react";


export default function ChatBody({ messages }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto p-3 space-y-2"
      style={{
        
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[80%] p-2 px-3 rounded-lg shadow-sm text-sm relative ${
            msg.from === "customer"
              ? "ml-auto bg-[#005C4B] text-white"
              : "mr-auto bg-[#202C33] text-white"
          }`}
        >
          <p>{msg.text}</p>
          <span className="text-[10px] absolute bottom-0 right-1 text-gray-300 mt-1">
            {msg.time}
          </span>
        </div>
      ))}
      <div ref={ref}></div>
    </div>
  );
}
