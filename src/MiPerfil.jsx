import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Navbar, Footer } from './App';
import { MainPage } from "./MainPage";
import "./Miperfil.css";
import { EditProfile } from "./EditProfile";
import { AboutUs } from "./AboutUs";

export function MiPerfil({ setPage, user, addNotification }) {
  if (!user) setPage(() => MainPage);
  useEffect(() => void window.history.pushState(null, "", "profile"), []);

  function navigateTo(page) {
    if (page === "logout") {
      signOut(getAuth())
        .then(() => {
          setPage(() => MainPage);
        })
        .catch((error) => addNotification(`Error cerrando sesión: ${error.message}`));
    }
  }

  return <>
    <div className="body-Miperfil">
      <Navbar setPage={setPage} user={user} />
      <div className="main-container__Miperfil">
        <img src="Imagen11.png" className="tittle_Miperfil" alt="Título" />
      </div>

      <div className="central-Miperfil">
        <img
          src={user.pfp}
          className="img_central"
          alt="Foto de perfil"
        />
        <p className="central-name">{user.username}</p>
      </div>

      <div className="lower-Miperfil">

        <div className="lower-left">
          <div className="lower-left__viajes">
            <p className="lower-viajes">Viajes: 10</p>
          </div>
          <div className="lower-left__Kmrecorridos">
            <p className="lower-Kmrecorridos">Km recorridos: 120</p>
          </div>
          <div className="lower-left__puntos">
            <p className="lower-puntos">Puntos: 50</p>
          </div>
        </div>

        <div className="lower-right">
          <p
            className="lower-right__Editarperfil"
            onClick={() => setPage(() => EditProfile)}
          >
            Editar perfil
          </p>
          <p className="lower-right__Ayuda"
            onClick={() => setPage(() => AboutUs)}>Ayuda</p>
          <p
            className="lower-right__Cerrarsesion"
            onClick={() => navigateTo("logout")}
          >
            Cerrar sesión
          </p>
        </div>
      </div>
      <Footer />
    </div>
  </>;
}
