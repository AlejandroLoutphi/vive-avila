import React, { useState, useEffect } from "react";
import { Navbar, Footer, firebaseUsersCollection, firebaseForumMessagesCollection } from './App';
import './Forum.css';
import { addDoc, query, getDocs, where } from "firebase/firestore";

export function Forum({ setPage, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: user.uid,
    };

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        newMessage.img = reader.result;
        addDoc(firebaseForumMessagesCollection, newMessage);
        setImage();
      };
    } else addDoc(firebaseForumMessagesCollection, newMessage);

    setMessages([...messages, newMessage]);
    setMessage("");
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  async function loadMessages() {
    // TODO: cambiar esto a consulta anidada
    const q = query(firebaseForumMessagesCollection /* limit(10) */);
    const querySnapshot = await getDocs(q);
    const docData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    for (let i = 0; i < docData.length; i++) {
      const q = query(firebaseUsersCollection, where("uid", "==", docData[i].from));
      const querySnapshot = await getDocs(q);
      console.assert(querySnapshot.size == 1);
      docData[i].from = querySnapshot.docs[0].data().username;
      docData[i].from = docData[i].from == user.uid ? "Tú" : querySnapshot.docs[0].data().username();
    }
    setMessages(docData);
  }

  useEffect(() => void loadMessages(), []);

  return (
    <div className="main-container__forum">
      <Navbar setPage={setPage} user={user} />

      <img src="v1h1.png" className="banner-image__forum" alt="Banner principal" />

      <div className="chat-container__forum">
        <ul className="ul__forum">
          {messages.map((message, i) => (
            <li key={i} className={message.from === "Tú" ? "message-sent" : "message-received"}>
              {message.from}: {message.body}
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
        <input
          className="input__forum"
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
