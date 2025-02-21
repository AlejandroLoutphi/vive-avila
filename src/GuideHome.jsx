import React, { useEffect, useState } from 'react';
import { Navbar, Footer, firebasePendingTripsCollection } from './Global';
import { query, getDocs, where, deleteDoc } from 'firebase/firestore';

export function GuideHome({ user, setPage, addNotification }) {
  const [pendingTrips, setPendingTrips] = useState([]);

  async function loadTours() {
    const q = query(firebasePendingTripsCollection, where("guide", "==", user.uid));
    const querySnapshot = await getDocs(q);
    setPendingTrips(querySnapshot.docs.map((doc) => ({ ...doc.data(), docRef: doc.ref })));
  }

  async function cancelTrip(trip) {
    if (!window.confirm("Cancelar viaje de: " + trip.titular)) return;
    await deleteDoc(trip.docRef);
    addNotification('Viaje cancelado');
    loadTours();
  }

  useEffect(() => { loadTours(); }, []);

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
                  <td>{trip.phone}</td>
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
