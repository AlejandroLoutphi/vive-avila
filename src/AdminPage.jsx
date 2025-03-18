import React, { useState } from 'react';
import './AdminPage.css';
import { dbBlogArticles, Footer, Navbar } from './App';

export function AdminPage({ setPage, user, addNotification }) {
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
      {/*
      <nav className="admin-navbar">
        <img
          src="/nav-logo.png"
          alt="Vive-Ávila Logo"
          className="admin-nav-logo"
        />
        <div className="admin-nav-links">
          <a className="admin-nav-item">Inicio</a>
          <a className="admin-nav-item">Tours</a>
          <a className="admin-nav-item">Actividad</a>
          <a className="admin-nav-item">Perfil</a>
        </div>
      </nav>
      */}
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
