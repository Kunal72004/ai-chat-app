import React, { useState } from "react";
import { FiSend, FiMessageCircle } from "react-icons/fi";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: input }),
      });

      const data = await res.json();

      const aiMsg = { role: "assistant", content: data.reply };
      setMessages([...updatedMessages, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg = {
        role: "assistant",
        content: "⚠️ Kuch gadbad ho gayi, dobara try karo.",
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#262624] p-4">
      <div className="w-full max-w-md bg-[#30302E] rounded-xl shadow-md p-4">
        <h1 className="text-lg font-medium mb-3 text-[#FAF9F6] flex items-center gap-2">
          <FiMessageCircle size={20} className="text-[#C96442]" />
          AI Chat App
        </h1>

        <div className="bg-[#262624] border border-[#3E3E3B] rounded-lg p-3 h-72 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${msg.role == "user" ? "self-end bg-[#C96442] text-white" : "self-start bg-[#30302E] border border-[#3E3E3B] text-[#FAF9F6]"}`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="self-start flex items-center gap-1 px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8A6A0] animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8A6A0] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8A6A0] animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="write a message..."
            className="flex-1 bg-[#30302E] border border-[#3E3E3B] rounded-lg px-3 py-2 text-sm text-[#FAF9F6] placeholder-[#A8A6A0] outline-none focus:border-[#C96442]"
            type="text"
          />
          <button
            onClick={sendMessage}
            className="bg-[#C96442] text-white rounded-lg px-4 flex items-center justify-center hover:opacity-90"
          >
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
