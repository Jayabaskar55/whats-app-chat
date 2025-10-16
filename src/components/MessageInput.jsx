import React, { useState, useRef } from "react";
import CryptoJS from "crypto-js";
import Picker from "emoji-picker-react";


export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const fileRef = useRef();

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend({ type: "text", message: text.trim() });
      setText("");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onSend({ type: "file", name: file.name, data: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSend} className="bg-[#202C33] p-3 flex items-center gap-2 border-t border-[#2A3942]">
      <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-xl">😊</button>
      {showEmoji && (
        <div className="absolute bottom-20 left-2 z-50">
          <Picker onEmojiClick={(e) => setText((prev) => prev + e.emoji)} theme="dark" />
        </div>
      )}
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        hidden
      />
      <button type="button" onClick={() => fileRef.current.click()} className="text-xl">📎</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-lg bg-[#2A3942] text-white focus:outline-none"
      />
      <button type="submit" className="bg-green-600 px-4 py-2 rounded-lg">Send</button>
    </form>
  );
}
