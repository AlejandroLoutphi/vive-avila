// src/Excursiones.jsx
import React from 'react';
import { Navbar, Footer, Page } from './Global'; // 
import './Excursiones.css'; // 

export default function Excursiones({ setPage, setExcursionSeleccionada }) {
  // Datos de ejemplo (simulados)
  const excursiones = [
    {
      id: 1,
      nombre: 'Excursión a Sabas Nieves',
      dificultad: 'Media',
      duracion: '4 horas',
      descripcion: 'Subida de dificultad media con vistas panorámicas.',
      imagen: 'https://example.com/imagen1.jpg',
      galeria: ['https://example.com/galeria1a.jpg', 'https://example.com/galeria1b.jpg'],
    },
    {
      id: 2,
      nombre: 'Excursión al Pico Naiguatá',
      dificultad: 'Alta',
      duracion: '6 horas',
      descripcion: 'Ascenso desafiante ideal para aventureros.',
      imagen: 'https://example.com/imagen2.jpg',
      galeria: ['https://example.com/galeria2a.jpg', 'https://example.com/galeria2b.jpg'],
    },
    // Para cuando hagamos el admin, y agregar excursiones
  ];

  const verDetalles = (excursion) => {
    setExcursionSeleccionada(excursion);
    setPage(Page.detalleExcursion);
  };

  const verGaleria = (excursion) => {
    setExcursionSeleccionada(excursion);
    setPage(Page.galeria);
  };

  return (
    <div className="excursiones-contenedor">
      <Navbar setPage={setPage} />
      <div className="excursiones-encabezado">
        <h1>Excursiones</h1>
        <p>Descubre nuevas aventuras en el parque nacional El Ávila.</p>
      </div>
      <div className="excursiones-lista">
        {excursiones.map((exc) => (
          <div className="excursion-tarjeta" key={exc.id}>
            <img src={exc.imagen} alt={exc.nombre} className="excursion-imagen" />
            <div className="excursion-info">
              <h2>{exc.nombre}</h2>
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
