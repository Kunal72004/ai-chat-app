import React, { useState } from "react";
import { FiSend, FiMessageCircle } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";

const App = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Let's Start Conversation..." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ userMessage: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
      console.log(data);
    } catch (error) {
      console.log(error);
      setMessages([
        ...messages,
        { role: "assistant", content: "Error in fetching data from API" },
      ]);
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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children }) {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-[#3E3E3B] px-1 rounded text-xs">
                        {children}
                      </code>
                    ) : (
                      <CodeBlock className={className}>{children}</CodeBlock>
                    );
                  },
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto my-2">
                        <table className="border-collapse w-full text-sm">
                          {children}
                        </table>
                      </div>
                    );
                  },
                  th({ children }) {
                    return (
                      <th className="border border-[#3E3E3B] px-2 py-1 bg-[#3E3E3B] text-left">
                        {children}
                      </th>
                    );
                  },
                  td({ children }) {
                    return (
                      <td className="border border-[#3E3E3B] px-2 py-1">
                        {children}
                      </td>
                    );
                  },
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}
          {loading && (
            <div className="self-start flex items-center gap-1 px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8A6A0] animate-bounce "></span>
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
