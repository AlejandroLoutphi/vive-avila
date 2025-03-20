import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Footer, dbPendingTrips, dbReservations, dbReviews, dbUsers } from './App';
import './DetalleExcursion.css';
import { where } from "firebase/firestore";
import { MainPage } from './MainPage';

let isFirstRender = true;

export function DetalleExcursion({ user, setPage, excursionSeleccionada, setExcursionSeleccionada }) {
  useEffect(() => void (excursionSeleccionada &&
    window.history.pushState(null, "", "detalleExcursion/" + excursionSeleccionada.docRef.id)), []);

  const excursionId = excursionSeleccionada?.docRef?.id
    ?? window.location.pathname.split('/', 3)[2];

  useEffect(() => {
    if (!excursionSeleccionada) return void (async () => {
      if (!excursionId) return void setPage(() => MainPage);
      const excursionDoc = await dbPendingTrips.doc(excursionId);
      if (!excursionDoc) return void setPage(() => MainPage);
      setExcursionSeleccionada(excursionDoc);
    })()
  }, []);

  const paymentButton = useRef();
  const [formGuide, setFormGuide] = useState();
  const [formPeopleCount, setFormPeopleCount] = useState(1);
  const formPeopleCountRef = useRef(formPeopleCount);
  formPeopleCountRef.current = formPeopleCount;

  function makePayPalButton() {
    if (!excursionSeleccionada) return;
    if (!paymentButton.current) return void setTimeout(makePayPalButton);
    paymentButton.current.replaceChildren();
    window.paypal.Buttons({
      async createOrder(_, actions) {
        return actions.order.create({
          purchase_units: [{
            description: "Excursion Vive-avila",
            amount: {
              currency_code: "USD",
              value: excursionSeleccionada.pricePerPersonInCents * formPeopleCountRef.current / 100,
            }
          }]
        });
      },
      async onApprove(_, actions) {
        const order = await actions.order.capture();
        dbReservations.add({
          reservee: user.uid,
          trip: excursionSeleccionada.docRef.id,
          peopleCount: formPeopleCountRef.current,
          paymentDate: order.create_time.slice(0, 10),
          index: formGuide,
        });
      },
    }).render(paymentButton.current);
  }

  // Cargamos el script de PayPal dinámicamente la primera vez que cargamos detalleExcursion
  // makePayPalButton crea el botón de PayPal al cargar el script y al cambiar los datos
  if (isFirstRender) {
    const payPalScript = document.createElement("script");
    payPalScript.src =
      "https://www.paypal.com/sdk/js?client-id=Aef6VsJkghfASmbMFTEAcagFjZkBp-_vzKJ7EVWr5wQsfsBbTUVOBw1fCZFW_f8IcOqLaTAJPaAu_hfu";
    payPalScript.addEventListener("load", makePayPalButton);
    document.body.appendChild(payPalScript);
  }
  isFirstRender = false;

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () =>
    setReviews(await dbReviews.get(where("route", "==", excursionId)));
  useEffect(() => void fetchReviews(), [])

  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState("");
  async function sendReview() {
    await dbReviews.add({
      from: user.uid,
      username: user.username,
      route: excursionSeleccionada.docRef.id,
      rating: newRating,
      text: newReview,
      index: formGuide,
    });
    fetchReviews();
    setNewRating(5);
    setNewReview("");
  }

  const [guides, setGuides] = useState([]);
  const [hasReserved, setHasReserved] = useState(false);
  useEffect(() => void (excursionSeleccionada && user && (async () => {
    const guideList = await dbUsers.get(where("uid", "in", excursionSeleccionada.guide.map(g => g.uid)));
    const guideMap = Object.fromEntries(guideList.map(g => [g.uid, g]));
    setGuides(excursionSeleccionada.guide.map(g => ({ ...guideMap[g.uid], ...g })));
    const reservationsDocs = await dbReservations.get(
      where("reservee", "==", user.uid),
      where("trip", "==", excursionSeleccionada.docRef.id)
    );
    const areReservationsNew = reservationsDocs.map((res) =>
      excursionSeleccionada.guide[res.index].date >= new Date().toISOString().slice(0, 10));
    if (areReservationsNew.includes(true)) {
      setFormGuide(reservationsDocs[areReservationsNew.indexOf(true)].index);
      setHasReserved(true);
    }
  })()), [excursionSeleccionada]);

  useEffect(() => window.paypal && void makePayPalButton(), [excursionSeleccionada]);

  if (!excursionSeleccionada) return <></>;

  return (
    <div className="detalleexcursion-contenedor">
      <Navbar setPage={setPage} />

      <header className="detalleexcursion-header">
        <div className="detalleexcursion-header__info">
          <h1 className="detalleexcursion-header__title">{excursionSeleccionada.ruta}</h1>
          <div className="detalleexcursion-header__stats">
            <div className="detalleexcursion-difficulty detalleexcursion-stat">
              <span className="detalleexcursion-difficulty__label ">Dificultad:</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="detalleexcursion-difficulty__circle"
                  style={{ opacity: i < excursionSeleccionada.dificultad ? 1 : 0.3 }}
                ></span>
              ))}
            </div>
            <div className="detalleexcursion-stars detalleexcursion-stat">
              <span className="detalleexcursion-stars__label">Calificaciones:</span>
              {Array.from({ length: 5 }).map((_, i) => {
                const fullStar = i < Math.floor(excursionSeleccionada.estrellas);
                const halfStar = (i === Math.floor(excursionSeleccionada.estrellas)) && (excursionSeleccionada.estrellas % 1 >= 0.5);
                return (
                  <span key={i} className="detalleexcursion-stars__star">
                    {fullStar ? "★" : halfStar ? "☆" : "☆"}
                  </span>
                );
              })}
            </div>
            <span className="detalleexcursion-duration detalleexcursion-stat">
              Duración: ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ {excursionSeleccionada.duracion} horas
            </span>
          </div>
        </div>
        <div className="detalleexcursion-header__gallery">
          {Array.isArray(excursionSeleccionada.galeria) && excursionSeleccionada.galeria.map((imgUrl, idx) => (
            <img
              key={idx}
              className="detalleexcursion-gallery__img"
              src={imgUrl}
              alt={`Foto ${idx + 1}`}
            />
          ))}
        </div>
        <img src='./hero-background.png' className='detalleexcursion-header-image' />
      </header>

      <section className="detalleexcursion-descripcion">
        <h2 className="detalleexcursion-descripcion__title">Descripción</h2>
        <div className="detalleexcursion-descripcion__wrapper">
          <div className="detalleexcursion-descripcion__box">
            <p className="detalleexcursion-descripcion__texto">{excursionSeleccionada.descripcion}</p>
          </div>
        </div>
      </section>

      <section className="detalleexcursion-ruta">
        <h2 className="detalleexcursion-ruta__title">Ruta</h2>
        <div className="detalleexcursion-ruta__box">
          <div className="detalleexcursion-ruta__texto">
            {excursionSeleccionada.rutaDescripcion}
          </div>
          <img
            className="detalleexcursion-ruta__map"
            src={excursionSeleccionada.rutaMapa}
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
              {excursionSeleccionada.puntosInteres &&
                excursionSeleccionada.puntosInteres.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
          <div className="detalleexcursion-puntos__box">
            <h3 className="detalleexcursion-puntos__subtitle">Actividades</h3>
            <ul>
              {excursionSeleccionada.actividades &&
                excursionSeleccionada.actividades.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {user && <section className="detalleexcursion-reserva">
        <h2 className="detalleexcursion-reserva__title">Reserva y Pago</h2>
        <div className="detalleexcursion-reserva__container">
          <div className="detalleexcursion-reserva__left">
            <h3 className="reserva-left__subtitle">Número de personas:</h3>
            <input type="number" className="reserva-left__input" min={1} value={formPeopleCount}
              onChange={(e) => setFormPeopleCount(e.target.value)} />
            <h3 className="reserva-left__subtitle">Seleccionar Guía y fecha:</h3>
            <div className="reserva-left__guides">
              {guides.map((g, i) => (
                <div className="guide-card"
                  style={{ background: formGuide == i ? '#64966d' : 'none' }}
                  key={i} onClick={() => setFormGuide(i)}>
                  <img src={g.pfp} alt={g.username} />
                  <span className="guide-card__name">{g.username}<br />{new Date(g.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="detalleexcursion-reserva__right">
            <div>
              <div className="factura-line">
                <span>Precio total de viaje:</span> <span>
                  ${(excursionSeleccionada.pricePerPersonInCents * formPeopleCount / 100).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="reserva-pay__button"
              hidden={hasReserved || (Number.isInteger(Number(formPeopleCount)) && (formGuide !== undefined))}>
              Seleccione un guía, fecha y número de personas para proceder con la reserva
            </div>
            <div className="reserva-pay__button"
              hidden={!hasReserved}>Excursión reservada</div>
            <div className="reserva-pay__button"
              hidden={hasReserved || !(Number.isInteger(Number(formPeopleCount)) && (formGuide !== undefined))}
              ref={paymentButton}></div>
          </div>
        </div>
      </section>}

      <section className="detalleexcursion-comentarios">
        <h2>Comentarios</h2>
        <div className="detalleexcursion-comentarios__cards">
          {reviews.map((c, idx) => (
            <div className="comentario-card" key={idx}>
              <div className="comentario-card__header">
                <span className="comentario-card__name">{c.username}</span>
                <span className="comentario-card__stars">
                  {Array.from({ length: c.rating }).map(() => "★")}
                </span>
              </div>
              <p className="comentario-card__text">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {user && <section className="detalleexcursion-review">
        <div className="detalleexcursion-review__box">
          <h3 className="review-box__title">Escribe tu reseña</h3>
          <div className="review-box__stars">
            {[1, 2, 3, 4, 5].map(num => (
              <span
                key={num}
                style={{ cursor: "pointer", marginRight: "5px" }}
                onClick={() => setNewRating(num)}
              >
                {num <= newRating ? "★" : "☆"}
              </span>
            ))}
          </div>
          <textarea
            className="review-box__textarea"
            placeholder="Escribe aquí tus comentarios..."
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
          />
          <button className="review-box__button" onClick={sendReview}>
            Publicar
          </button>
        </div>
      </section>}

      <Footer />
    </div>
  );
}
