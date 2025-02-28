import React from 'react';
import { Footer, Navbar } from './App';
import './MainPage.css';

export function MainPage({ setPage, user }) {
    return <>
        <Navbar setPage={setPage} user={user} />
        <div className="start_home-page">
            <div className="start_hero-section">
                <img
                    loading="lazy"
                    src="/hero-background.png"
                    className="start_hero-background"
                    alt="Hero background"
                />
                <div className="start_hero-content">
                    <div className="start_hero-layout">
                        <div className="start_logo-column">
                            <div className="start_logo-container">
                                <img
                                    loading="lazy"
                                    src="/logo-image.png"
                                    className="start_logo-image"
                                    alt="Logo"
                                />
                            </div>
                        </div>
                        <div className="start_text-column">
                            <div className="start_text-container">
                                <h1 className="start_main-title">
                                    VIVIR UNA
                                    <br />
                                    NUEVA AVENTURA
                                </h1>
                                <h2 className="start_subtitle">
                                    NUNCA HABÍA SIDO TAN FÁCIL
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="start_main-content">
                <div className="start_content-layout">
                    <div className="start_activities-column">
                        <div className="start_activities-frame">
                            <div className="start_image-placeholder"></div>
                            <div className="start_activities-grid">
                                <div className="start_activity-item">
                                    <div className="start_activity-circle">
                                        <img
                                            loading="lazy"
                                            src="/explora-icon.png"
                                            className="start_activity-icon"
                                            alt="Explora icon"
                                        />
                                        <div className="start_activity-text">EXPLORA</div>
                                    </div>
                                </div>
                                <div className="start_activity-item">
                                    <div className="start_activity-circle">
                                        <img
                                            loading="lazy"
                                            src="/rutas.png"
                                            className="start_activity-icon"
                                            alt="Rutas icon"
                                        />
                                        <div className="start_activity-text">RUTAS</div>
                                    </div>
                                </div>
                                <div className="start_activity-item">
                                    <div className="start_activity-circle">
                                        <img
                                            loading="lazy"
                                            src="/aventura-icon.png"
                                            className="start_activity-icon"
                                            alt="Aventura icon"
                                        />
                                        <div className="start_activity-text">AVENTURA</div>
                                    </div>
                                </div>
                                <div className="start_activity-item">
                                    <div className="start_activity-circle">
                                        <img
                                            loading="lazy"
                                            src="/naturaleza.png"
                                            className="start_activity-icon"
                                            alt="Naturaleza icon"
                                        />
                                        <div className="start_activity-text">NATURALEZA</div>
                                    </div>
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="/humboldt.png"
                                className="start_divider-image"
                                alt="Divider"
                            />
                            <div className="start_features-grid">
                                <div className="start_feature-item">
                                    <div className="start_feature-text">QUEBRADAS</div>
                                </div>
                                <div className="start_feature-item">
                                    <div className="start_feature-text">PICOS</div>
                                </div>
                                <div className="start_feature-item">
                                    <div className="start_feature-text">Y MÁS</div>
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="/landscape.png"
                                className="start_divider-image"
                                alt="Divider"
                            />
                        </div>
                    </div>
                    <div className="start_info-column">
                        <div className="start_info-card">
                            <h2 className="start_info-title">WARAIRAREPANO</h2>
                            <p className="start_info-description">
                                El parque nacional El Ávila, oficialmente Waraira Repano, es un
                                <a href="https://es.wikipedia.org/wiki/Parque_nacional" target="_blank" rel="noopener noreferrer">
                                    parque nacional
                                </a>
                                localizado en la Cadena del Litoral dentro de la
                                <a href="https://es.wikipedia.org/wiki/Cordillera_de_la_Costa_(Venezuela)" target="_blank" rel="noopener noreferrer">
                                    cordillera de la Costa
                                </a>
                                , en el centro-norte de
                                <a href="https://es.wikipedia.org/wiki/Venezuela" target="_blank" rel="noopener noreferrer">
                                    Venezuela
                                </a>
                                . Se extiende desde
                                <a href="https://es.wikipedia.org/wiki/Caracas" target="_blank" rel="noopener noreferrer">
                                    Caracas
                                </a>
                                (
                                <a href="https://es.wikipedia.org/wiki/Distrito_Capital" target="_blank" rel="noopener noreferrer">
                                    Distrito Capital
                                </a>
                                ), y todo el norte del
                                <a href="https://es.wikipedia.org/wiki/Estado_Miranda" target="_blank" rel="noopener noreferrer">
                                    estado Miranda
                                </a>
                                y sur del
                                <a href="https://es.wikipedia.org/wiki/Estado_La_Guaira" target="_blank" rel="noopener noreferrer">
                                    estado La Guaira
                                </a>
                                .
                            </p>
                            <button className="start_read-more-btn">Leer más</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
}
