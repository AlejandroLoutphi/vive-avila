import React from 'react';
import './AdminActivity.css';
import { Navbar, Footer, UserType } from './App';
import { MainPage } from './MainPage';

export function AdminActivity({ setPage, user }) {
  if (!(user?.type == UserType.guide)) setPage(() => MainPage);
  useEffect(() => void window.history.pushState(null, "", "adminTours"), []);
  const dummyActivities = ["Nombre de viaje", "Nombre de viaje", "Nombre de viaje"];

  return (
    <div className="admin-activity-container">
      <Navbar setPage={setPage} user={user} />
      <div className="admin-subpath">Inicio/Actividad</div>

      <header className="admin-banner">
        <h1 className="admin-banner-title">Actividad/Admin</h1>
      </header>

      <section className="activity-classification-section">
        <h2 className="activity-classification-title">Clasificacion de actividades</h2>
        <div className="activity-classification-inputs">
          <input className="activity-classification-input" type="text" />
          <button className="activity-classification-btn">Añadir clasificación</button>
        </div>
      </section>

      <section className="activity-difficulty-section">
        <h2 className="activity-difficulty-title">Dificultad</h2>
        <div className="activity-difficulty-left">
          <input className="activity-search" type="text" placeholder="Buscar" />
          {dummyActivities.map((act, i) => (
            <div key={i} className="activity-checkbox-row">
              <label>{act}</label>
              <input type="checkbox" />
            </div>
          ))}
        </div>
        <div className="activity-difficulty-right">
          <div className="activity-difficulty-label">Dificultad</div>
          <div className="difficulty-circles">
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
          </div>
          <button className="activity-difficulty-btn">Cambiar dificultad</button>
        </div>
      </section>

      <section className="activity-duration-section">
        <h2 className="activity-duration-title">Duracion</h2>
        <div className="activity-duration-left">
          <input className="activity-search" type="text" placeholder="Buscar" />
          {dummyActivities.map((act, i) => (
            <div key={i} className="activity-checkbox-row">
              <label>{act}</label>
              <input type="checkbox" />
            </div>
          ))}
        </div>
        <div className="activity-duration-right">
          <div className="activity-duration-label">Duración</div>
          <div className="duration-boxes">
            <div className="duration-box">H</div>
            <div className="duration-box">M</div>
            <div className="duration-box">S</div>
          </div>
          <button className="activity-duration-btn">Cambiar duración</button>
        </div>
      </section>

      <section className="activity-newclass-section">
        <h2 className="activity-newclass-title">Nueva clasificacion</h2>
        <div className="activity-newclass-left">
          <input className="activity-search" type="text" placeholder="Buscar" />
          {dummyActivities.map((act, i) => (
            <div key={i} className="activity-checkbox-row">
              <label>{act}</label>
              <input type="checkbox" />
            </div>
          ))}
        </div>
        <div className="activity-newclass-right">
          <div className="activity-newclass-inputs">
            <input className="activity-scale-input" type="text" placeholder="Ipsum" />
            <input className="activity-scale-input" type="text" placeholder="Escala" />
          </div>
          <button className="activity-newclass-btn">Cambiar Escala</button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
