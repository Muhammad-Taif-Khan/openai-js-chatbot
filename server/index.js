const express = require('express');

const app = express();
const cors = require('cors');
const PORT = 3654;
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: PUT_YOUR_API_KEY_HERE,
});
const openai = new OpenAIApi(configuration);



app.use(express.json());
app.use(cors());

app.post('/ask', async (req, res)=>{
    const {question} = req.body;
    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: `You: How do I combine arrays?JavaScript chatbot: You can use the concat() method. 
        You: ${question}
        JavaScript chatbot:`,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
      });

      res.status(200).json({
        agent:"AI",
        message:response.data.choices[0].text
      })
});




app.listen(PORT, ()=>{
    console.log("server is live");
})