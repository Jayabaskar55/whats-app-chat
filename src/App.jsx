import React, { useState } from "react";
import ChatWidget from "./components/ChatWidget";
import "./App.css";


function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {open && <ChatWidget onClose={() => setOpen(false)} />}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        💬
      </button>
    </div>
  );
}

export default App;
