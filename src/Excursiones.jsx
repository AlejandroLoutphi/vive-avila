import React, { useState, useEffect } from 'react';
import { Navbar, Footer, firebasePendingTripsCollection } from './App';
import { query, getDocs } from 'firebase/firestore';
import './Excursiones.css';
import { DetalleExcursion } from './DetalleExcursion';
import { MainPage } from './MainPage';

export function Excursiones({ setPage, setExcursionSeleccionada }) {
  useEffect(() => void window.history.pushState(null, "", "excursiones"), []);
  // Datos de ejemplo (simulados)
  const [excursiones, setExcursiones] = useState([]);

  async function loadTours() {
    const q = query(firebasePendingTripsCollection);
    const querySnapshot = await getDocs(q);
    setExcursiones(querySnapshot.docs.map((doc) => ({ ...doc.data(), docRef: doc.ref })));
  }

  const verDetalles = (excursion) => {
    setExcursionSeleccionada(excursion);
    setPage(() => DetalleExcursion);
  };

  const verGaleria = (excursion) => {
    setExcursionSeleccionada(excursion);
    setPage(() => MainPage);
  };

  useEffect(() => void loadTours(), []);

  return (
    <div className="excursiones-contenedor">
      <Navbar setPage={setPage} />
      <div className="excursiones-encabezado">
        <h1>Excursiones</h1>
        <p>Descubre nuevas aventuras en el parque nacional El Ávila.</p>
      </div>
      <div className="excursiones-lista">
        {excursiones.map((exc, idx) => (
          <div className="excursion-tarjeta" key={idx}>
            <img src={exc.imagen} alt={exc.nombre} className="excursion-imagen" />
            <div className="excursion-info">
              <h2>{exc.ruta}</h2>
              <p>{exc.descripcion}</p>
              <div className="excursion-acciones">
                <button
                  className="boton-detalles"
                  onClick={() => verDetalles(exc)}
                >
                  Ver detalles
                </button>
                <button
                  className="boton-galeria"
                  onClick={() => verGaleria(exc)}
                >
                  Ver galería
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
