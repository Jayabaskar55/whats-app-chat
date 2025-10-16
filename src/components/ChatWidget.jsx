import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import CryptoJS from "crypto-js";
import messageSound from "../assets/message.mp3";

const SECRET_KEY = "my-secret-key";

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

const decrypt = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const ChatWidget = ({ onClose }) => {
  const [chat, setChat] = useState(() => {
    const saved = localStorage.getItem("chat");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSend = (payload) => {
    let encrypted, isFile = false;
    if (payload.type === "text") {
      encrypted = encrypt(payload.message);
    } else if (payload.type === "file") {
      encrypted = encrypt(JSON.stringify({ name: payload.name, file: payload.data }));
      isFile = true;
    }

    const newMsg = { from: "customer", encrypted, isFile, status: "✓" };
    setChat((prev) => [...prev, newMsg]);

    setTimeout(() => {
      const reply = encrypt("Thanks for your message!");
      const replyMsg = { from: "admin", encrypted: reply, status: "✓✓" };
      setChat((prev) => [...prev.slice(0, -1), { ...newMsg, status: "✓✓" }, replyMsg]);
      new Audio(messageSound).play();
    }, 1000);
  };

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(chat));
  }, [chat]);

  return (
    <div className="fixed bottom-20 right-6 w-[90%] max-w-md h-[600px] bg-[#111b21] text-white rounded-xl overflow-hidden shadow-lg z-50">
      <ChatWindow chat={chat} onSend={handleSend} decrypt={decrypt} onClose={onClose} />
    </div>
  );
};

export default ChatWidget;
