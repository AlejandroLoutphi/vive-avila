
import React from 'react';
import { Navbar, Footer, Page } from './Global';
import './DetalleExcursion.css';

export default function DetalleExcursion({ setPage, excursionSeleccionada }) {
  if (!excursionSeleccionada) {
    return (
      <div>
        <Navbar setPage={setPage} />
        <p>No se ha seleccionado ninguna excursión.</p>
        <Footer />
      </div>
    );
  }

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
          <p><strong>Duración:</strong> {excursionSeleccionada.duracion}</p>
          <p><strong>Descripción:</strong> {excursionSeleccionada.descripcion}</p>
          {/* Se podrán agregar más detalles en el futuro */}
        </div>
        <div className="detalleexcursion-acciones">
          <button onClick={() => setPage(Page.excursiones)}>
            Volver a Excursiones
          </button>
          <button onClick={() => setPage(Page.galeria)}>
            Ver galería
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
