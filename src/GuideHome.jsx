import React from 'react';
import './GuideHome.css';
import { Navbar, Footer } from './Global';

function GuideHome({ setPage }) {
  // Datos de prueba para la tabla:
  const pendingTrips = [
    { titular: 'Carlos Pérez', personas: 5, ruta: 'Sabas Nieves', fecha: '2025-05-10', telefono: '0412-1234567' },
    { titular: 'María García', personas: 3, ruta: 'Los Venados', fecha: '2025-05-12', telefono: '0414-6543210' },
    { titular: 'Juan Rodríguez', personas: 10, ruta: 'El Marqués', fecha: '2025-05-15', telefono: '0424-1112223' },
  ];

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
                  <td>{trip.telefono}</td>
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
