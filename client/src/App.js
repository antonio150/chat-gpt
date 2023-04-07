import logo from './logo.svg';
import './normal.css';
import './App.css';
import gptIcon from "./assets/chatgpt-icon.png"
import {useState, useEffect } from 'react'

function App() {

 
// add state for input and chat log

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today ?"
  },{
    user: "me",
    message: "I want to use ChatGPT today"
  }]);

  // clear chats
  function clearChat(){
    setChatLog([]);
  }

 


  async function handleSubmit(e){
    e.preventDefault();
     let chatLogNew= [...chatLog, { user: "me", message: `${input}` }]
     setInput ("");
     setChatLog(chatLogNew)

    // fetch response to the api combining the chat log array of messages and sending it as a message to localhost:3000 as a post

    const messages = chatLogNew.map((message) => message.message).
    join("\n")
    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}`}])
    console.log(data.message);

  }
  return (
    <div className="App">
     
        <aside className="sidemenu">
          <div className='side-menu-button' onClick={clearChat}>
            <span>+</span>
            New Chat
          </div>

          <div className='chat-input-holder'>
            <form onSubmit={handleSubmit}>

            
            <textarea
            rows="1"
            placeholder='Tap here your Message'
            value={input}
            onChange={(e) => setInput(e.target.value)  }
            className='chat-input-textarea'
            
            />

            <button  className='button' >Send</button>
           

            </form>

          </div>
        </aside>

        <section className="chatbox">
          <div className="chat-log">

            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            


            

          </div>
          
        </section>
     
     
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return(
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className='chat-message-center'>
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>

        </div>

        <div className='message'>
            {message.message}
        </div>
      </div>

    </div>
  )
  }


export default App;
