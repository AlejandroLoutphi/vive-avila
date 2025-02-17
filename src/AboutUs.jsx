import React from 'react';
import { Footer, Navbar } from './Global';

export function AboutUs({ setPage }) {
    return <>
        <Navbar setPage={setPage} />
        <div className="aboutus_parteSuperior">
            <div className="aboutus_parteSuperior__contenido">
                <p className="aboutus_parteSuperior__contenedor-título">Misión</p>
                <p className="aboutus_parteSuperior__contenedor-texto">
                    Nuestra misión consiste en ofrecer una manera conveniente para que los
                    estudiantes de la Universidad Metropolitana puedan descubrir y embarcar
                    excursiones en el parque nacional el Ávila, junto con información
                    detallada y accesible sobre itinerarios, rutas y elementos relacionados,
                    permitiendo que todas las personas interesadas puedan acceder a una
                    manera más sencilla y enriquecedora de adentrarse a la flora y fauna de
                    nuestro país, fomentando valores fundamentales como consciencia
                    ambiental y amor por la naturaleza, con el objetivo de inspirar a
                    nuestros usuarios a conectarse profundamente con el entorno natural.
                </p>
            </div>
            <div>
                <img className="aboutus_parteSuperior__img"
                    src="personasExplorando.webp" />
            </div>
        </div>
        <div className="aboutus_parteCentral">
            <div className="aboutus_parteCentral__izq parteCentral__izq-texto">
                <img
                    className="aboutus_parteCentral__izq-img"
                    src="https://cdn.pixabay.com/photo/2014/04/02/11/16/phone-305741_1280.png"
                    width={170}
                />
                <p className="aboutus_parteCentral__izq-título1">Teléfono:</p>
                <p>tlf. (+58)424-8014532</p>
                <img
                    className="aboutus_parteCentral__izq-img"
                    src="https://cdn-icons-png.flaticon.com/512/9840/9840614.png"
                    width={170}
                />
                <p className="aboutus_parteCentral__izq-título2">Email:</p>
                <p>example@gmail.com</p>
            </div>
            <div className="aboutus_parteCentral__der">
                <div>
                    <p className="aboutus_parteCentral__der-título">¿Deseas contactarnos?</p>
                    <p className="aboutus_parteCentral__der-subtítulo">
                        Rellene los siguientes campos
                    </p>
                </div>
                <div className="aboutus_parteCentral__der-texto">
                    <p>Email</p>
                    <input className="aboutus_parteCentral__der-input"
                        type="text" />
                    <p>Nombre y apellido</p>
                    <input className="aboutus_parteCentral__der-input"
                        type="text" />
                    <p>Número de teléfono</p>
                    <input className="aboutus_parteCentral__der-input"
                        type="text" />
                    <p>Mensaje</p>
                    <input className="aboutus_parteCentral__der-input"
                        type="text" />
                </div>
                <div className="aboutus_parteCentral__der-inferior">
                    <button className="aboutus_button1" />
                    <p>Acepto términos y condiciones</p>
                </div>
                <button className="aboutus_button2">Enviar</button>
            </div>
        </div>
        <div className="aboutus_parteInferior">
            <p className="aboutus_parteInferior__título">Encuéntranos</p>
            <iframe width="100%" height={610} id="gmap_canvas" src="https://maps.google.com/maps?width=1460&height=610&hl=en&q=Universidad%20Metropolitana%20de%20Caracas%20Caracas+(Universidad%20Metropolitana%20de%20Caracas)&t=k&z=16&ie=UTF8&iwloc=B&output=embed" />{" "}
        </div>
        <Footer />
    </>;
}
