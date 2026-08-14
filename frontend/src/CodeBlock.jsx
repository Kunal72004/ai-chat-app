import React, { useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


const CodeBlock = ({ className, children }) => {
  const language = className ? className.replace("language-", "") : "text";
  const codeText = String(children).replace(/\n$/, "");

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative my-2">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-xs bg-[#3E3E3B] text-[#FAF9F6] px-2 py-1 rounded hover:opacity-80"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter language={language} style={oneDark} customStyle={{ borderRadius: "8px" }} className="overflow-x-auto scrollbar-thin">
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
