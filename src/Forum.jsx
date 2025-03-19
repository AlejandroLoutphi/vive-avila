import React, { useState, useEffect } from "react";
import { Navbar, Footer, dbForumMessages, dbUsers } from './App';
import './Forum.css';
import { orderBy, Timestamp, where } from "firebase/firestore";

export function Forum({ setPage, user }) {
  useEffect(() => void window.history.pushState(null, "", "forum"), []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState();
  const [fullImage, setFullImage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: user.uid,
      time: Timestamp.now(),
    };

    const sendMessage = () => {
      dbForumMessages.add(newMessage);
      setMessages([...messages, { ...newMessage, username: "Tú", pfp: user.pfp }]);
      setMessage("");
      setImage();
    };

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        newMessage.img = reader.result;
        sendMessage();
      };
      reader.onerror = () => void addNotification('Error al subir imagen');
    } else sendMessage();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => void (async () => {
    const dbMessages = await dbForumMessages.get(orderBy("time"));
    const uids = [...new Set(dbMessages.map((msg) => msg.from))];
    let forumUsers = [];
    // Tenemos que cargar los usuarios de 30 en 30 por limitaciones de Firestore
    for (let i = 0; i < uids.length; i += 30)
      forumUsers = forumUsers.concat(await dbUsers.get(where("uid", "in", uids.slice(i, i + 30))));
    const userMap = Object.fromEntries(forumUsers.map((user) => [user.uid, user]));
    setMessages(dbMessages.filter((msg) => userMap[msg.from]).map((msg) => ({
      ...msg,
      username: msg.from === user?.uid ? "Tú" : userMap[msg.from].username,
      pfp: userMap[msg.from].pfp
    })));
  })(), []);

  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleTimeString("es-VE", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="main-container__forum">
      <Navbar setPage={setPage} user={user} />

      <img src="imagen_foro.png" className="banner-image__forum" alt="Banner principal" />

      <div className="chat-container__forum">
        <ul className="ul__forum">
          {messages.map((message, i) => (
            <li key={i} className="message-container">
              <div className="message-profile">
                <div className="username-banner">
                  {message.username}
                </div>
                {message.pfp && (
                  <img
                    src={message.pfp}
                    alt={`${message.username}'s profile`}
                  />
                )}
              </div>
              <div className="message-content">
                <div className="message-body">{message.body}</div>
                <div className="message-time">{formatTimestamp(message.time)}</div>
              </div>
              {message.img && (
                <div className="message-img-container">
                  <img
                    src={message.img}
                    alt="Imagen enviada"
                    className="message-img"
                    onClick={() => setFullImage(message.img)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {fullImage && (
        <div className="full-image-container">
          <img src={fullImage} alt="Vista ampliada" className="full-image" />
          <button onClick={() => setFullImage(null)} className="close-image-btn">Volver</button>
        </div>
      )}

      {user && <form onSubmit={handleSubmit} className="form__forum">
        <input
          className="input__forum"
          type="text"
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          className="input__forum"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="file-upload"
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload" className="img-btn__forum">IMG</label>
        <button type="submit" className="button__forum">Enviar</button>
      </form>}

      <Footer />
    </div>
  );
}
