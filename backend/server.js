const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { userMessage } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      },
    );
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    
    const aiReply = data.candidates[0].content.parts[0].text;

    res.status(200).json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error in ai response" });
  }
});

app.get("/",(req,res)=>{
    // console.log("server response");
    
    res.json("get request");
})

app.listen(5000, () => console.log("Server running on port 5000"));
