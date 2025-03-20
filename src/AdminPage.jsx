import React, { useState } from 'react';
import './AdminPage.css';
import { dbBlogArticles, Footer, Navbar, UserType } from './App';
import { MainPage } from './MainPage';

export function AdminPage({ setPage, user, addNotification }) {
  if (!(user?.type == UserType.guide)) setPage(() => MainPage);
  useEffect(() => void window.history.pushState(null, "", ""), []);
  const [newBlogPost, setNewBlogPost] = useState('');

  async function handlePostBlog() {
    // Agregar la lógica real para subir a Firestore
    await dbBlogArticles.add({ text: newBlogPost, date: new Date().toISOString().slice(0, 10) });
    addNotification && addNotification('Artículo publicado');
    setNewBlogPost('');
  }

  return (
    <div className="admin-page-container">
      <Navbar setPage={setPage} user={user} />
      <header className="admin-banner">
        <h1 className="admin-banner-title">HAS INICIADO SESION COMO ADMINISTRADOR</h1>
      </header>
      <section className="admin-main-content">
        <div className="admin-stats-box">
          <h2 className="admin-stats-box-title">Viajes</h2>
          <hr className="admin-stats-divider" />
          <p>Viajes vendidos: <span>0</span></p>
          <p>Ingresos: <span>00,00$</span></p>
          <p>Guias: <span>-0%</span></p>
          <hr className="admin-stats-divider" />
          <p>Total: <span>00,00</span></p>
        </div>
      </section>
      <section className="admin-blog-publisher">
        <label className="admin-blog-label">Escriba un nuevo artículo para el blog</label>
        <div className="admin-blog-row">
          <textarea
            className="admin-blog-textarea"
            value={newBlogPost}
            onChange={e => setNewBlogPost(e.target.value)}
          />
          <button className="admin-blog-post-button" onClick={handlePostBlog}>
            Postear
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
