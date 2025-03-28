import React, { useState, useEffect } from 'react';
import { Footer, Navbar, dbContactMessages } from './App';
import './AboutUs.css';

export function AboutUs({ setPage, addNotification, user }) {
    useEffect(() => void window.history.pushState(null, "", "aboutUs"), []);
    const [formEmail, setFormEmail] = useState('');
    const [formName, setFormName] = useState('');
    const [formPhone, setFormPhone] = useState('');
    const [formMessage, setFormMessage] = useState('');

    async function sendForm(e) {
        e.preventDefault();
        await dbContactMessages.add({
            email: formEmail,
            name: formName,
            phone: formPhone,
            message: formMessage,
        });
        addNotification('Mensaje enviado');
        setFormEmail('');
        setFormName('');
        setFormPhone('');
        setFormMessage('');
    }

    return <>
        <Navbar setPage={setPage} user={user} />
        <div className="aboutus_hero-section">
            <div className="aboutus_hero-content">
                <h1 className="aboutus_main-title">Misión</h1>
                <h2 className="aboutus_subtitle">
                    Nuestra misión consiste en ofrecer una manera conveniente para que los
                    estudiantes de la Universidad Metropolitana puedan descubrir y embarcar
                    excursiones en el parque nacional el Ávila, junto con información
                    detallada y accesible sobre itinerarios, rutas y elementos relacionados,
                    permitiendo que todas las personas interesadas puedan acceder a una
                    manera más sencilla y enriquecedora de adentrarse a la flora y fauna de
                    nuestro país, fomentando valores fundamentales como consciencia
                    ambiental y amor por la naturaleza, con el objetivo de inspirar a
                    nuestros usuarios a conectarse profundamente con el entorno natural.
                </h2>
            </div>
            <img
                loading="lazy"
                src="/personasExplorando.webp"
                className="aboutus_hero-background"
                alt="Hero background"
            />
        </div>
        <div className="aboutus_parteCentral">
            <div className="aboutus_parteCentral__izq">
                <img
                    className="aboutus_parteCentral__izq-img"
                    src="/phone-305741_1280.webp"
                    width={170}
                />
                <p className="aboutus_parteCentral__izq-título1">Teléfono:</p>
                <p className='aboutus_parteCentral__izq-texto'>(+58)424-8014532</p>
                <img
                    className="aboutus_parteCentral__izq-img"
                    src="/9840614.png"
                    width={170}
                />
                <p className="aboutus_parteCentral__izq-título2">Email:</p>
                <p className='aboutus_parteCentral__izq-texto'>direccion@vive-avila.unimet.edu.ve</p>
            </div>
            <div className="aboutus_parteCentral__der">
                <div>
                    <p className="aboutus_parteCentral__der-título">¿Deseas contactarnos?</p>
                    <p className="aboutus_parteCentral__der-subtitulo">
                        Rellene los siguientes campos
                    </p>
                </div>
                <form onSubmit={sendForm} className="aboutus_form user_form">
                    <div className="aboutus_parteCentral__der-texto">
                        <p>Email</p>
                        <input type="email" id="aboutus_email" name="aboutus_email"
                            value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                            className="aboutus_parteCentral__der-input" required minLength="3" maxLength="40" />
                        <p>Nombre y apellido</p>
                        <input type="text" id="aboutus_name" name="aboutus_name"
                            value={formName} onChange={(e) => setFormName(e.target.value)}
                            className="aboutus_parteCentral__der-input" required minLength="3" maxLength="40" />
                        <p>Número de teléfono</p>
                        <input type="number" id="aboutus_phone" name="aboutus_phone"
                            value={formPhone} onChange={(e) => setFormPhone(e.target.value)}
                            className="aboutus_parteCentral__der-input" required minLength="3" maxLength="40" />
                        <p>Mensaje</p>
                        <input type="text" id="aboutus_message" name="aboutus_message"
                            value={formMessage} onChange={(e) => setFormMessage(e.target.value)}
                            className="aboutus_parteCentral__der-input" required minLength="3" maxLength="40" />
                    </div>
                    <button className="aboutus_button2">Enviar</button>
                </form>
            </div>
        </div>
        <div className="aboutus_parteInferior">
            <p className="aboutus_parteInferior__título">Encuéntranos</p>
            <iframe width="100%" height={610} id="gmap_canvas" src="https://maps.google.com/maps?width=1460&height=610&hl=en&q=Universidad%20Metropolitana%20de%20Caracas%20Caracas+(Universidad%20Metropolitana%20de%20Caracas)&t=k&z=16&ie=UTF8&iwloc=B&output=embed" />{" "}
        </div>
        <Footer />
    </>;
}
