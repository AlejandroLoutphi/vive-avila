import React from 'react';
import { Footer } from './Global';

export function MainPage() {
    return <>
        <div className="home-page">
            <div className="hero-section">
                <img
                    loading="lazy"
                    src="/hero-background.png"
                    className="hero-background"
                    alt="Hero background"
                />
                <div className="hero-content">
                    <div className="hero-layout">
                        <div className="logo-column">
                            <div className="logo-container">
                                <img
                                    loading="lazy"
                                    src="/logo-image.png"
                                    className="logo-image"
                                    alt="Logo"
                                />
                            </div>
                        </div>
                        <div className="text-column">
                            <div className="text-container">
                                <h1 className="main-title">
                                    VIVIR UNA
                                    <br />
                                    NUEVA AVENTURA
                                </h1>
                                <h2 className="subtitle">
                                    NUNCA HABÍA SIDO TAN FÁCIL
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar">
                <img
                    loading="lazy"
                    src="/nav-logo.png"
                    className="nav-logo"
                    alt="Navigation logo"
                />
                <div className="nav-links">
                    <a href="#inicio" className="nav-item">Inicio</a>
                    <a href="#guia" className="nav-item">Guia</a>
                    <a href="#excursiones" className="nav-item">Excursiones</a>
                    <a href="#foro" className="nav-item">Foro</a>
                    <a href="#sobre-nosotros" className="nav-item">Sobre Nosotros</a>
                    <a href="#perfil" className="nav-item">Perfil</a>
                </div>
            </nav>
            <div className="main-content">
                <div className="content-layout">
                    <div className="activities-column">
                        <div className="activities-frame">
                            <div className="image-placeholder"></div>
                            <div className="activities-grid">
                                <div className="activity-item">
                                    <div className="activity-circle">
                                        <img
                                            loading="lazy"
                                            src="/explora-icon.png"
                                            className="activity-icon"
                                            alt="Explora icon"
                                        />
                                        <div className="activity-text">EXPLORA</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-circle">
                                        <img
                                            loading="lazy"
                                            src="/rutas.png"
                                            className="activity-icon"
                                            alt="Rutas icon"
                                        />
                                        <div className="activity-text">RUTAS</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-circle">
                                        <img
                                            loading="lazy"
                                            src="/aventura-icon.png"
                                            className="activity-icon"
                                            alt="Aventura icon"
                                        />
                                        <div className="activity-text">AVENTURA</div>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-circle">
                                        <img
                                            loading="lazy"
                                            src="/naturaleza.png"
                                            className="activity-icon"
                                            alt="Naturaleza icon"
                                        />
                                        <div className="activity-text">NATURALEZA</div>
                                    </div>
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="/humboldt.png"
                                className="divider-image"
                                alt="Divider"
                            />
                            <div className="features-grid">
                                <div className="feature-item">
                                    <div className="feature-text">QUEBRADAS</div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-text">PICOS</div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-text">Y MÁS</div>
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="/landscape.png"
                                className="divider-image"
                                alt="Divider"
                            />
                        </div>
                    </div>
                    <div className="info-column">
                        <div className="info-card">
                            <h2 className="info-title">WARAIRAREPANO</h2>
                            <p className="info-description">
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
                            <button className="read-more-btn">Leer más</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
}
