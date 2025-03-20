import React, { useEffect, useState } from 'react';
import { Navbar, Footer, dbPendingTrips, UserType, dbReservations } from './App';
import { where, arrayRemove, updateDoc, deleteDoc } from 'firebase/firestore';
import './GuideHome.css';
import { MainPage } from './MainPage';

export function GuideHome({ user, setPage, addNotification }) {
  if (!(user?.type == UserType.guide)) setPage(() => MainPage);
  useEffect(() => void window.history.pushState(null, "", ""), []);
  const [tours, setTours] = useState([]);

  const loadTours = async () => {
    const tours = await dbPendingTrips.get();
    const toursWhereGuideAppears =
      tours.filter((tour) => tour.guide.map((guide) => guide.uid).includes(user.uid));
    let reservations = [];
    for (let i = 0; i < toursWhereGuideAppears.length; i++) {
      const tour = toursWhereGuideAppears[i];
      const res = await dbReservations.get(where("trip", "==", tour.docRef.id));
      const resObjs = res.map(res => ({ ...tour, ...res }));
      reservations = [...reservations, ...resObjs];
    }
    setTours(reservations);
  }
  useEffect(() => void loadTours(), []);

  async function cancelTrip(trip) {
    if (!window.confirm("Cancelar viaje de: " + trip.titular)) return;
    deleteDoc(trip.docRef);
    addNotification('Viaje cancelado');
    loadTours();
  }

  return (
    <div className="guide-page-container">
      <Navbar setPage={setPage} user={user} />
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tours.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.titular}</td>
                  <td>{trip.peopleCount}</td>
                  <td>{trip.ruta}</td>
                  <td>{trip.date}</td>
                  <td>
                    <button className="guide-cancel-button" onClick={() => cancelTrip(trip)} >
                      Cancelar <span className="guide-cancel-icon">✖</span>
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
