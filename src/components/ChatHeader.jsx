import React, { useState, useEffect } from "react";

export default function ChatHeader({ onClose }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#202C33] border-b border-[#2A3942]">
      <div>
        <h2 className="text-lg font-semibold">Customer Support</h2>
        <p className="text-xs text-gray-400">Last seen today at {time}</p>
      </div>
      <button onClick={onClose} className="text-red-400 hover:text-red-500 text-lg">
        ✖️
      </button>
    </div>
  );
}
