
import './App.css';
import ChatMessage from './chatMessage';
import { useState } from 'react';


function App() {
  const [question, setQuest] = useState('');
const [chatData, setChatData] = useState([
  {
    agent:"You",
    message:"What is an Array?"
  },
  {
    agent:"AI",
    message:"Array is a variable that holds multiple value."
  }

]);

  async function  handleSubmit(){

    setChatData(prevChat => {
      return [...prevChat, {agent:"You",message:question}]
    });

  const request = await fetch('http://localhost:3654/ask', {
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body: JSON.stringify({
      question
    })
  });

  const response =  await request.json();

  const aiResponse = {
    agent:"AI",
    message: response.message,
  };

  setChatData(prevChat => {
    return [...prevChat, aiResponse]
  });

  setQuest('');

}

  return (
    <div className="App">
      <div className="chatbox">
          {
            chatData.map((messageData, idx)=>{
              return <ChatMessage key= {idx} messageData = {messageData}/>
            })
          }
      </div>
      <div  className="input-holder">
        <form action="#" onSubmit={handleSubmit}>
          <input type="text"
          value={question}
          onChange={(e)=>{
            setQuest(e.target.value)
          }}
          className='question-input'/>
        </form>
          
      </div>
    </div>
  );
}

export default App;
