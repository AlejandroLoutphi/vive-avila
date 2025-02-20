import React, { useState } from 'react';
import './GuideHome.css';
import { Navbar, Footer, firebaseToursCollection } from './Global';
import { query, getDocs, where } from 'firebase/firestore';

function GuideHome({ user, setPage }) {
  // Datos de prueba para la tabla:
  const [pendingTrips, setPendingTrips] = useState([]);
  async function loadTours() {
    const q = query(firebaseToursCollection,
      where("guide", "==", user.uid),
    );
    const querySnapshot = await getDocs(q);
    let o = [];
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      o = [...o, querySnapshot.docs[i].data()];
    }
    setPendingTrips(o);
  }
  loadTours();
  const handleCancel = (trip) => {
    alert(`Cancelar viaje de: ${trip.titular}`);
    // Aquí pondríamos la lógica real para cancelar:
    // * Borrar en Firestore
    // * Actualizar estado, etc.
  };

  return (
    <div className="guide-page-container">
      <Navbar setPage={setPage} />
      {/*
      <header className="guide-header">
        <img
          className="guide-logo"
          src="logo-image.png" // Ajusta la ruta si es diferente
          alt="Logo Vive Ávila"
        />
        <nav className="guide-nav">
          <a href="#inicio">Inicio</a>
          <a href="#perfil">Perfil</a>
        </nav>
      </header>
      */}

      <section className="guide-main-banner">
        <h1 className="guide-title">HAS INICIADO SESIÓN COMO GUÍA</h1>
      </section>

      <main className="guide-main-content">
        <h2 className="guide-subtitle">Viajes pendientes</h2>

        <div className="guide-table-wrapper">
          <table className="guide-table">
            <thead>
              <tr>
                <th>Titular</th>
                <th>Nro. Personas</th>
                <th>Ruta</th>
                <th>Fecha</th>
                <th>Teléfono</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pendingTrips.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.titular}</td>
                  <td>{trip.personas}</td>
                  <td>{trip.ruta}</td>
                  <td>{trip.fecha}</td>
                  <td>{trip.phone}</td>
                  <td>
                    <button
                      className="cancel-button"
                      onClick={() => handleCancel(trip)}
                    >
                      Cancelar <span className="cancel-icon">✖</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GuideHome;
