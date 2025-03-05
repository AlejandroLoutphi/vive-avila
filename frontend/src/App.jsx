import io from "socket.io-client";
import React, { useState, useEffect } from "react";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImageMessage = {
          type: "image",
          body: reader.result, 
          from: "Tú", 
        };
        setMessages([...messages, newImageMessage]);
        socket.emit("message", {
          type: "image",
          body: reader.result,
          from: socket.id, 
        });
        setImage(null);
      };
      reader.readAsDataURL(image);
    } else {
      const newMessage = {
        type: "text",
        body: message,
        from: "Tú", 
      };
      setMessages([...messages, newMessage]);
      socket.emit("message", {
        type: "text",
        body: message,
        from: socket.id, 
      });
      setMessage("");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    socket.on("message", (message) =>
      setMessages((state) => [
        ...state,
        {
          ...message,
          from: message.from === socket.id ? "Tú" : message.from,
        },
      ])
    );

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="main-container">
      <nav className="navbar">
        <img
          loading="lazy"
          src="nav-logo.png"
          className="nav-logo"
          alt="Navigation logo"
        />
        <div className="nav-links">
          <a href="#inicio" className="nav-item">Inicio</a>
          <a href="#guia" className="nav-item">Guia</a>
          <a href="#excursiones" className="nav-item">Excursiones</a>
          <a href="#foro" className="nav-item">Foro</a>
          <a href="#sobre-nosotros" className="nav-item">Sobre Nosotros</a>
          <a href="#perfil" className="nav-item">Perfil</a>
        </div>
      </nav>

      <img src="v1h1.png" className="banner-image" alt="Banner principal" />

      <div className="chat-container">
        <ul>
          {messages.map((message, i) => (
            <li
              key={i}
              className={
                message.from === "Tú" ? "message-sent" : "message-received"
              }
            >
              {message.type === "text" ? (
                `${message.from}: ${message.body}`
              ) : (
                <div>
                  {message.from}:
                  <img src={message.body} alt="Enviado" className="chat-image" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!!image}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="file-upload"
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload" className="img-btn">IMG</label>
        <button type="submit">Send</button>
      </form>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-title-container">
            <div className="footer-line"></div>
            <p className="footer-title">Vive Ávila</p>
            <div className="footer-line"></div>
          </div>
          <div className="footer-info">
            Más información
            <br />
            (+58)424-8014532
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
