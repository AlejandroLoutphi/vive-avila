import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Navbar, Footer, firebaseDb } from './App';
import './DetalleExcursion.css';
import { Excursiones } from './Excursiones';
import { MainPage } from './MainPage';

export function DetalleExcursion({ setPage, excursionSeleccionada }) {
    if (!excursionSeleccionada) return void useEffect(() => void (async () => {
        const excursionId = window.location.pathname.split('/', 3)[2];
        if (!excursionId) return void setPage(() => MainPage);
        const excursionDocRef = doc(firebaseDb, 'pendingTrips', excursionId);
        const excursionDoc = await getDoc(excursionDocRef);
        if (!excursionDoc.exists()) return void setPage(() => MainPage);
        setExcursionSeleccionada({ ...excursionDoc.data(), docRef: excursionDocRef });
      })(), []);
    
      useEffect(() => void window.history.pushState(null, "", "detalleExcursion/" + excursionSeleccionada.docRef.id), []);
  const excursion = excursionSeleccionada || {
    nombre: "Excursión al Pico Naiguatá",
    dificultad: 4,
    estrellas: 4.5,
    duracion: "6 horas",
    galeria: [
      "https://example.com/img1.jpg",
      "https://example.com/img2.jpg",
      "https://example.com/img3.jpg",
      "https://example.com/img4.jpg"
    ],
    descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Vivamus tempus semper nisl, vitae tincidunt turpis pharetra vitae. 
                  Aenean quis lorem venenatis, euismod metus in, posuere enim.`,
    rutaDescripcion: `Aquí puedes ver la descripción de la ruta, 
                      el itinerario, punto de partida y llegada, etc.`,
    rutaMapa: "https://example.com/mapa-ruta.jpg",
    puntosInteres: ["Quebrada Quintero", "Mirador Este", "Bosque Nublado"],
    actividades: ["Fotografía", "Observación de aves", "Camping"],
  };

  const [comentarios] = useState([
    {
      usuario: "Carlos",
      calif: 5,
      texto: "Excelente ruta, vistas increíbles."
    },
    {
      usuario: "María",
      calif: 4,
      texto: "Me gustó, pero fue un poco exigente."
    },
    {
      usuario: "Pedro",
      calif: 3,
      texto: "Podría estar mejor señalizada la ruta."
    },
    {
      usuario: "Ana",
      calif: 5,
      texto: "Fascinante experiencia, volvería sin dudar."
    },
  ]);

  const [nuevaCalif, setNuevaCalif] = useState(5);
  const [nuevaResena, setNuevaResena] = useState("");
  function enviarResena() {
    alert(`Tu reseña (${nuevaCalif} estrellas): ${nuevaResena}`);
    setNuevaCalif(5);
    setNuevaResena("");
  }

  const guiasDisponibles = [
    { nombre: "Guía Pepe", img: "https://example.com/guia1.jpg" },
    { nombre: "Guía Rosa", img: "https://example.com/guia2.jpg" },
  ];

  return (
    <div className="detalleexcursion-contenedor">
      <Navbar setPage={setPage} />

      <header className="detalleexcursion-header">
        <div className="detalleexcursion-header__info">
          <h1 className="detalleexcursion-header__title">{excursion.nombre}</h1>
          <div className="detalleexcursion-header__stats">
            <div className="detalleexcursion-difficulty">
              <span className="detalleexcursion-difficulty__label">Dificultad:</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="detalleexcursion-difficulty__circle"
                  style={{ opacity: i < excursion.dificultad ? 1 : 0.3 }}
                ></span>
              ))}
            </div>
            <div className="detalleexcursion-stars">
              <span className="detalleexcursion-stars__label">Calif:</span>
              {Array.from({ length: 5 }).map((_, i) => {
                const fullStar = i < Math.floor(excursion.estrellas);
                const halfStar = (i === Math.floor(excursion.estrellas)) && (excursion.estrellas % 1 >= 0.5);
                return (
                  <span key={i} className="detalleexcursion-stars__star">
                    {fullStar ? "★" : halfStar ? "☆" : "☆"}
                  </span>
                );
              })}
            </div>
            <span className="detalleexcursion-duration">
              Duración: {excursion.duracion}
            </span>
          </div>
        </div>
         <div className="detalleexcursion-header__gallery">
          {Array.isArray(excursion.galeria) && excursion.galeria.map((imgUrl, idx) => (
            <img
              key={idx}
              className="detalleexcursion-gallery__img"
              src={imgUrl}
              alt={`Foto ${idx + 1}`}
            />
          ))}
        </div>
      </header>

      <section className="detalleexcursion-descripcion">
        <h2 className="detalleexcursion-descripcion__title">Descripción</h2>
        <div className="detalleexcursion-descripcion__box">
          <p className="detalleexcursion-descripcion__texto">{excursion.descripcion}</p>
          <button
            className="detalleexcursion-descripcion__button"
            onClick={() => alert("Ver Galería")}
          >
            Ver Galería
          </button>
        </div>
      </section>

      <section className="detalleexcursion-ruta">
        <h2 className="detalleexcursion-ruta__title">Ruta</h2>
        <div className="detalleexcursion-ruta__box">
          <div className="detalleexcursion-ruta__texto">
            {excursion.rutaDescripcion}
          </div>
          <img
            className="detalleexcursion-ruta__map"
            src={excursion.rutaMapa}
            alt="Mapa de la ruta"
          />
        </div>
      </section>

      <section className="detalleexcursion-puntos">
        <h2 className="detalleexcursion-puntos__title">
          Puntos de Interés y Actividades
        </h2>
        <div className="detalleexcursion-puntos__content">
          <div className="detalleexcursion-puntos__box">
            <h3 className="detalleexcursion-puntos__subtitle">Puntos de Interés</h3>
            <ul>
              {excursion.puntosInteres &&
                excursion.puntosInteres.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div className="detalleexcursion-puntos__box">
            <h3 className="detalleexcursion-puntos__subtitle">Actividades</h3>
            <ul>
              {excursion.actividades &&
                excursion.actividades.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="detalleexcursion-reserva">
        <h2 className="detalleexcursion-reserva__title">Reserva y Pago</h2>
        <div className="detalleexcursion-reserva__container">
          <div className="detalleexcursion-reserva__left">
            <h3 className="reserva-left__subtitle">Elige una fecha:</h3>
            <input
              type="date"
              className="reserva-left__input"
            />
            <h3 className="reserva-left__subtitle">Número de personas:</h3>
            <input
              type="number"
              className="reserva-left__input"
              min={1}
              defaultValue={1}
            />
            <h3 className="reserva-left__subtitle">Guía disponible:</h3>
            <div className="reserva-left__guides">
              {guiasDisponibles.map((g, i) => (
                <div className="guide-card" key={i}>
                  <img src={g.img} alt={g.nombre} />
                  <span className="guide-card__name">{g.nombre}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="detalleexcursion-reserva__right">
            <div>
              <div className="factura-line">
                <span>Viaje:</span> <span>$80.00</span>
              </div>
              <div className="factura-line">
                <span>IVA:</span> <span>$5.00</span>
              </div>
              <div className="factura-line">
                <strong>Total:</strong> <strong>$85.00</strong>
              </div>
            </div>
            <button className="reserva-pay__button" onClick={() => alert("Procesar Pago")}>
              Pagar Ahora
            </button>
          </div>
        </div>
      </section>

      <section className="detalleexcursion-comentarios">
        <h2>Comentarios</h2>
        <div className="detalleexcursion-comentarios__cards">
          {comentarios.map((c, idx) => (
            <div className="comentario-card" key={idx}>
              <div className="comentario-card__header">
                <span className="comentario-card__name">{c.usuario}</span>
                <span className="comentario-card__stars">
                  {Array.from({ length: c.calif }).map((_, i) => "★")}
                </span>
              </div>
              <p className="comentario-card__text">{c.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="detalleexcursion-review">
        <div className="detalleexcursion-review__box">
          <h3 className="review-box__title">Escribe tu reseña</h3>
          <div className="review-box__stars">
            {[1, 2, 3, 4, 5].map(num => (
              <span
                key={num}
                style={{ cursor: "pointer", marginRight: "5px" }}
                onClick={() => setNuevaCalif(num)}
              >
                {num <= nuevaCalif ? "★" : "☆"}
              </span>
            ))}
          </div>
          <textarea
            className="review-box__textarea"
            placeholder="Escribe aquí tus comentarios..."
            value={nuevaResena}
            onChange={e => setNuevaResena(e.target.value)}
          />
          <button className="review-box__button" onClick={enviarResena}>
            Publicar
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
