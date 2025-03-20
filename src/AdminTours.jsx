import React, { useState, useEffect } from 'react';
import './AdminTours.css';
import { Footer, Navbar, UserType } from './App';
import { MainPage } from './MainPage';

export function AdminTours({ setPage, user }) {
  if (!(user?.type == UserType.admin)) setPage(() => MainPage);
  useEffect(() => void window.history.pushState(null, "", "adminTours"), []);
  const [dummyTours, setDummyTours] = useState([
    {
      nombre: 'Sabas Nieves',
      fecha: '2025-03-22',
      capacidad: 10,
      precio: '$20',
      dificultad: 'Media'
    },
    {
      nombre: 'Pernocta en El Ávila',
      fecha: '2025-05-05',
      capacidad: 8,
      precio: '$25',
      dificultad: 'Alta'
    }
  ]);

  // Falta poner la logica para quitar y agregar Tours
  function handleEdit(tour) {
    alert('Editar: ' + tour.nombre);
  }
  function handleDelete(tour) {
    setDummyTours((dummyTours) => dummyTours.filter((t) => t != tour));
  }
  function handleNewTour() {
    alert('Crear nuevo Tour');
  }

  return <>
    <Navbar setPage={setPage} user={user} />
    <div className="admin-tours-container">
      <header className="admin-tours-banner">
        <h1 className="admin-tours-banner-title">ADMINISTRAR TOURS</h1>
        <button className="admin-tours-new-button" onClick={handleNewTour}>
          Crear Tour
        </button>
      </header>
      <section className="admin-tours-main">
        <table className="admin-tours-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Capacidad</th>
              <th>Precio</th>
              <th>Dificultad</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {dummyTours.map((tour, i) => (
              <tr key={i}>
                <td>{tour.nombre}</td>
                <td>{tour.fecha}</td>
                <td>{tour.capacidad}</td>
                <td>{tour.precio}</td>
                <td>{tour.dificultad}</td>
                <td className="admin-tours-actions">
                  <button
                    className="admin-tours-edit-button"
                    onClick={() => handleEdit(tour)}
                  >
                    Editar
                  </button>
                  <button
                    className="admin-tours-delete-button"
                    onClick={() => handleDelete(tour)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
    <Footer />
  </>;
}
