import React from 'react';
import { Navbar, Footer } from './App';
import './AdminTours.css';

export function AdminTours({ setPage, user }) {
  const tours = [
    { id: 1, nombre: "Nombre del viaje", estado: "Disponible", imagen: "/imagen1.jpg" },
    { id: 2, nombre: "Nombre del viaje", estado: "Reservado", imagen: "/imagen2.jpg" },
    { id: 3, nombre: "Nombre del viaje", estado: "Disponible", imagen: "/imagen3.jpg" },
    { id: 4, nombre: "Nombre del viaje", estado: "Reservado", imagen: "/imagen4.jpg" },
    { id: 5, nombre: "Nombre del viaje", estado: "Disponible", imagen: "/imagen5.jpg" },
  ];

  return (
    <div className="admintours-container">
      <Navbar setPage={setPage} user={user} />
      <header className="admintours-banner">
        <h1 className="admintours-title">Tours/Admin</h1>
      </header>
      <section className="admintours-actions-bar">
        <button className="admintours-action-button">Añadir</button>
        <button className="admintours-action-button">Editar</button>
        <button className="admintours-action-button">Ver reservas</button>
        <button className="admintours-action-button">Ver disponibilidad</button>
      </section>
      <div className="admintours-list">
        {tours.map((tour) => (
          <div key={tour.id} className="admintours-item">
            <div className="admintours-item-left">
              <div className="admintours-item-header">
                <p className="admintours-item-name">{tour.nombre}</p>
              </div>
              <div className="admintours-item-body">
                <p className="admintours-item-estado">
                  Estado: <span
                    style={{ color: tour.estado === "Disponible" ? "green" : "red" }}
                  >
                    {tour.estado}
                  </span>
                </p>
                <div className="admintours-delete-icon">✘</div>
              </div>
            </div>
            <img
              className="admintours-item-img"
              src={tour.imagen}
              alt="Imagen del viaje"
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
