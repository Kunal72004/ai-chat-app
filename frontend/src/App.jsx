import React, { useState } from 'react'

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div>
      App
    </div>
  )
}

export default App
