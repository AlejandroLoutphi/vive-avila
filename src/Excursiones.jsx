import React, { useState, useEffect, useRef } from "react";
import { Navbar, Footer, dbPendingTrips } from "./App";
import "./Excursiones.css";
import { DetalleExcursion } from "./DetalleExcursion";

// TODO: replace default image
const DEFAULT_IMAGE = "../sobreNosotrosInc.jpg";

export function Excursiones({ setPage, setExcursionSeleccionada }) {
    useEffect(() => void window.history.pushState(null, "", "excursiones"), []);
    const [excursiones, setExcursiones] = useState([]);
    const excursiones = useRef([]);
    const [excursionesMostradas, setExcursionesMostradas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    async function loadTours() {
        try {
            excursiones.current = await dbPendingTrips.get();
            setExcursionesMostradas(excursiones.current);
        }
        catch (error) { console.error("Error loading excursions:", error); }
    }

    const verDetalles = (excursion) => {
        setExcursionSeleccionada(excursion);
        setPage(() => DetalleExcursion);
    };

    useEffect(() => void loadTours(), []);
    const reservedExcursions = [
        { id: 1, nombre: "Excursión A" },
        { id: 2, nombre: "Excursión B" },
        { id: 3, nombre: "Excursión C" },
    ];

    function searchTours(e) {
        const searchWord = e.target.value;
        setSearchTerm(searchWord);
        setExcursionesMostradas(excursiones.current.filter((tour) =>
            tour.ruta.toLowerCase().includes(searchWord)));
    }

    return (
        <div className="excursiones-contenedor">
            <Navbar setPage={setPage} />

            {/* Hero Section */}
            <div className="excursiones-encabezado">
                <div className="excursiones-encabezado-l">
                    <h1>Excursiones</h1>
                    <p>
                        Explora tus límites y acepta el desafío, será una experiencia
                        inolvidable. Vuelvete uno con la naturaleza y aprecia la esencia de
                        Caracas.
                    </p>
                </div>
                <img src="excursiones avila.jpg"></img>
            </div>

            {/* Reserved Excursions Section */}
            <div className="reserved-excursions">
                <div className="reserved-excursions-header">
                    <h2 className="reserved-excursions-title">Excursiones reservadas</h2>
                    <div className="reserved-excursions-list">
                        {reservedExcursions.map((excursion) => (
                            <div className="reserved-excursion-item" key={excursion.id}>
                                <h3 className="reserved-excursion-name">{excursion.nombre}</h3>
                                <button className="reserved-excursion-details">
                                    Ver detalles
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="search-container">
                <div className="search-wrapper">
                    <label className="search-label">Buscar</label>
                    <input type="text" className="search-input"
                        value={searchTerm} onChange={searchTours} />
                </div>
            </div>

            {/* Excursions List */}
            <div className="excursiones-lista">
                {excursionesMostradas.map((exc, idx) => (
                    <div className="excursion-tarjeta" key={idx}>
                        <div className="excursion-info">
                            <h2>{exc.ruta || "Nombre del viaje"}</h2>
                            <p>{exc.descripcion || "Caracteristicas del viaje"}</p>
                            <div className="excursion-acciones">
                                <button
                                    className="boton-detalles"
                                    onClick={() => verDetalles(exc)}
                                >
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                        <img
                            src={exc.imagen || DEFAULT_IMAGE}
                            alt={exc.nombre || "Imagen de excursión"}
                            className="excursion-imagen"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = DEFAULT_IMAGE;
                            }}
                        />
                    </div>
                ))}

                {/* Example excursion cards if no data is loaded */}
                {excursionesMostradas.length === 0 && (
                    <div className="excursiones-none">
                        No hay excursiones que se ajusten a la búsqueda
                    </div>
                )}
            </div>

            {/* Load More Button */}
            {excursionesMostradas.length !== 0 &&
                <div className="load-more-container">
                    <button className="load-more-button">Cargar más</button>
                </div>
            }


            <Footer />
        </div>
    );
}
