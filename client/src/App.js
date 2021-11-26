import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Card from "./components/Card/Card.jsx";
import {posts} from './data'
import { io } from 'socket.io-client'
function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:5000'))
  }, [])

  //passing event to server
  useEffect(() => {
    socket?.emit('newUser', user)
  }, [socket, user])
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket}/>
          {posts.map(post => <Card key={post.id} post={post} socket={socket} user={user}/>)}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
