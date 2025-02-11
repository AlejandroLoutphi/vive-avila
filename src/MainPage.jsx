import React from 'react';

function MainPage() {
    return (
        <>
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
            <footer className="main-footer">
                <div className="footer-content">
                    <div className="footer-title-container">
                        <div className="footer-line"></div>
                        <h2 className="footer-title">Vive Ávila</h2>
                        <div className="footer-line"></div>
                    </div>
                    <div className="footer-info">
                        Más información
                        <br />
                        (+58)424-8014532
                    </div>
                </div>
            </footer>
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jomhuria&family=Josefin+Slab&display=swap');

        .home-page {
          background-color: #d9d9d9;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Jomhuria', cursive;
        }
        .hero-section {
          position: relative;
          min-height: 425px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 127px 70px 45px;
        }
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-content {
          position: relative;
          background-color: rgba(0, 0, 0, 0.65);
          width: 100%;
          max-width: 1200px;
          padding: 40px;
        }
        .hero-layout {
          display: flex;
          gap: 20px;
        }
        .logo-column {
          flex: 0 0 44%;
        }
        .logo-container {
          background-color: #fff;
          padding: 11px 15px;
          margin-top: -73px;
        }
        .logo-image {
          width: 100%;
          height: auto;
        }
        .text-column {
          flex: 0 0 56%;
        }
        .text-container {
          color: #fff;
          text-align: center;
        }
        .main-title {
          font-size: 96px;
          line-height: 1;
          margin: 0;
        }
        .subtitle {
          font-family: 'Josefin Slab', serif;
          font-size: 24px;
          margin-top: -16px;
        }
        .navbar {
          background-color: #64966d;
          display: flex;
          align-items: center;
          padding: 4px 80px 4px 0;
          color: #fff;
        }
        .nav-logo {
          width: 204px;
          height: auto;
        }
        .nav-links {
          display: flex;
          gap: 60px;
          margin-left: auto;
        }
        .nav-item {
          color: #fff;
          text-decoration: none;
          font-size: 40px;
        }
        .main-content {
          display: flex;
          padding: 40px;
        }
        .content-layout {
          display: flex;
          gap: 20px;
        }
        .activities-column {
          flex: 0 0 73%;
        }
        .activities-frame {
          display: flex;
          flex-direction: column;
        }
        .image-placeholder {
          background-color: #ccc;
          height: 200px;
        }
        .activities-grid {
          display: flex;
          justify-content: space-around;
          padding: 83px 70px;
        }
        .activity-item {
          text-align: center;
        }
        .activity-circle {
          position: relative;
          width: 217px;
          height: 217px;
        }
        .activity-icon {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        .activity-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.65);
          border-radius: 50%;
          color: #fff;
          font-size: 40px;
        }
        .divider-image {
          width: 100%;
          height: auto;
        }
        .features-grid {
          display: flex;
          justify-content: space-around;
          padding: 63px 70px;
        }
        .feature-item {
          width: 228px;
          height: 228px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.65);
          color: #fff;
          font-size: 40px;
        }
        .info-column {
          flex: 0 0 27%;
        }
        .info-card {
          background-color: #64966d;
          color: #fff;
          padding: 66px 40px;
          margin-top: 751px;
        }
        .info-title {
          font-size: 64px;
          margin: 0;
        }
        .info-description {
          font-family: 'Josefin Slab', serif;
          font-size: 24px;
          text-align: justify;
          margin-top: 37px;
        }
        .read-more-btn {
          background-color: #765d4e;
          color: #fff;
          border: none;
          border-radius: 55px;
          padding: 13px 37px;
          font-size: 24px;
          cursor: pointer;
          margin-top: 20px;
          font-family: 'Josefin Slab', serif;
        }
        .main-footer {
          background-color: #212121;
          color: #fff;
          padding: 43px 80px 112px;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-title-container {
          display: flex;
          align-items: center;
          gap: 44px;
        }
        .footer-line {
          flex-grow: 1;
          height: 1px;
          background-color: #fff;
        }
        .footer-title {
          font-size: 64px;
          margin: 0;
        }
        .footer-info {
          font-size: 40px;
          margin-top: 37px;
          text-align: center;
        }
        @media (max-width: 991px) {
          .hero-section,
          .navbar,
          .main-content,
          .main-footer {
            padding-left: 20px;
            padding-right: 20px;
          }
          .hero-layout,
          .content-layout {
            flex-direction: column;
          }
          .logo-column,
          .text-column,
          .activities-column,
          .info-column {
            flex: 1 1 auto;
            width: 100%;
          }
          .nav-links {
            flex-wrap: wrap;
            gap: 20px;
          }
          .activities-grid,
          .features-grid {
            flex-wrap: wrap;
            gap: 20px;
          }
          .info-card {
            margin-top: 40px;
          }
          .main-title {
            font-size: 60px;
          }
          .subtitle,
          .nav-item,
          .activity-text,
          .feature-item,
          .info-description,
          .read-more-btn,
          .footer-info {
            font-size: 20px;
          }
          .info-title,
          .footer-title {
            font-size: 40px;-
          }
        }
      `}</style>
        </>
    );
}

export default MainPage;
