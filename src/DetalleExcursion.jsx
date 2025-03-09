import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Navbar, Footer, firebaseDb } from './App';
import './DetalleExcursion.css';
import { Excursiones } from './Excursiones';
import { MainPage } from './MainPage';

export function DetalleExcursion({ setPage, excursionSeleccionada, setExcursionSeleccionada }) {
  if (!excursionSeleccionada) return void useEffect(() => void (async () => {
    const excursionId = window.location.pathname.split('/', 3)[2];
    if (!excursionId) return void setPage(() => MainPage);
    const excursionDocRef = doc(firebaseDb, 'pendingTrips', excursionId);
    const excursionDoc = await getDoc(excursionDocRef);
    if (!excursionDoc.exists()) return void setPage(() => MainPage);
    setExcursionSeleccionada({ ...excursionDoc.data(), docRef: excursionDocRef });
  })(), []);

  useEffect(() => void window.history.pushState(null, "", "detalleExcursion/" + excursionSeleccionada.docRef.id), []);

  return (
    <div className="detalleexcursion-contenedor">
      <Navbar setPage={setPage} />
      <div className="detalleexcursion-contenido">
        <h1>{excursionSeleccionada.nombre}</h1>
        <img
          src={excursionSeleccionada.imagen}
          alt={excursionSeleccionada.nombre}
          className="detalleexcursion-imagen"
        />
        <div className="detalleexcursion-info">
          <p><strong>Dificultad:</strong> {excursionSeleccionada.dificultad}</p>
          <p><strong>Duración:</strong> {excursionSeleccionada.duracion + ' horas'}</p>
          <p><strong>Descripción:</strong> {excursionSeleccionada.descripcion}</p>
          {/* Se podrán agregar más detalles en el futuro */}
        </div>
        <div className="detalleexcursion-acciones">
          <button onClick={() => setPage(() => Excursiones)}>
            Volver a Excursiones
          </button>
          <button onClick={() => setPage(() => MainPage)}>
            Ver galería
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
