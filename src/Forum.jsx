import React, { useState, useEffect } from "react";
import { Navbar, Footer, dbForumMessages, dbUsers } from './App';
import './Forum.css';
import { orderBy, Timestamp, where } from "firebase/firestore";

export function Forum({ setPage, user }) {
  useEffect(() => void window.history.pushState(null, "", "forum"), []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: user.uid,
      time: Timestamp.now()
    };

    const sendMessage = () => {
      dbForumMessages.add(newMessage);
      setMessages([...messages, { ...newMessage, username: "Tú", pfp: user.pfp }]);
      setMessage("");
      setImage();
    }

    // Si subimos una imagen, la convertimos a Base64 primero
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => { newMessage.img = reader.result; sendMessage(); };
      reader.onerror = () => void addNotification('Error al subir imagen');
    } else sendMessage();
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  async function loadMessages() {
    const dbMessages = await dbForumMessages.get(orderBy("time")/* limit(10) */);
    const uids = [...new Set(dbMessages.map((msg) => msg.from))];
    let forumUsers = [];
    // Tenemos que cargar los usuarios de 30 en 30 por limitaciones de Firestore
    for (let i = 0; i < uids.length; i += 30)
      forumUsers = forumUsers.concat(await dbUsers.get(where("uid", "in", uids.slice(i, i + 30))));
    const userMap = Object.fromEntries(forumUsers.map((user) => [user.uid, user]));
    setMessages(dbMessages.filter((msg) => userMap[msg.from]).map((msg) => ({
      ...msg,
      username: msg.from == user.uid ? "Tú" : userMap[msg.from].username,
      pfp: userMap[msg.from]?.pfp
    })));
  }

  useEffect(() => void loadMessages(), []);

  return (
    <div className="main-container__forum">
      <Navbar setPage={setPage} user={user} />

      <img src="v1h1.png" className="banner-image__forum" alt="Banner principal" />

      <div className="chat-container__forum">
        <ul className="ul__forum">
          {messages.map((message, i) => (
            <li key={i} className={message.from === user.uid ? "message-sent" : "message-received"}>
              {message.username}: {message.body}
              {message.img &&
                <img src={message.img} alt="Enviado" className="chat-image__forum" />
              }
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="form__forum">
        <input
          className="input__forum"
          type="text"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input className="input__forum"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="file-upload"
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload" className="img-btn__forum">IMG</label>
        <button type="submit" className="button__forum">Send</button>
      </form>

      <Footer />
    </div>
  );
}
