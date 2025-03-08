import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, Footer } from "./App";
import './Login.css';
import { Register } from "./Register";

export function Login({ setPage, addNotification, googleSignIn }) {
    useEffect(() => void window.history.pushState(null, "", "login"), []);
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');

    async function loginAccount(e) {
        e.preventDefault();
        signInWithEmailAndPassword(firebaseAuth, formEmail, formPassword)
            .catch((e) => {
                switch (e.code) {
                    case 'auth/invalid-credential':
                        addNotification('Error: el email o contraseña son incorrectos');
                        return;
                    case 'auth/too-many-requests':
                        addNotification('Error: solicitud bloqueada');
                        return;
                    case 'auth/network-request-failed':
                        addNotification('Error al comunicarse con el servidor');
                        return;
                    case 'auth/quota-exceeded':
                        addNotification('Error al comunicarse con el servidor');
                        return;
                    default:
                        // TODO: quitar esto
                        addNotification('Error genérico');
                        console.log(e);
                        return;
                }
            });
    }

    // TODO: add loading animation
    return <>
        <div className="login_big_container">
            <h1 className="login_title title">¡Bienvenido de nuevo!</h1>
            <form onSubmit={loginAccount} className="login_form user_form">
                <h2 className="login_subtitle subtitle">Inicio de Sesión</h2>
                <div className="login_form_section_email login_form_section">
                    <h3 className="login_form_text">Correo Electrónico</h3>
                    <input type="email" id="login_email" name="login_email"
                        value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                        className="login_email login_field" required minLength="3" maxLength="40" />
                </div>
                <div className="login_form_section_password login_form_section">
                    <h3 className="login_form_text">Contraseña</h3>
                    <input type="password" id="login_password" name="login_password"
                        value={formPassword} onChange={(e) => setFormPassword(e.target.value)}
                        className="login_password login_field" required minLength="6" maxLength="40" />
                </div>
                <button type="submit" className="login_submit_button button_1">Iniciar Sesión</button>
            </form>
            <div className="login_divisor">
                <button type="button" onClick={googleSignIn}
                    className="login_google_button login_button_1">
                    Inicia Sesión con Google
                </button>
            </div>
            <h2 className="login_to_register">
                ¿No tienes cuenta?
                <a onClick={() => setPage(() => Register)}> Regístrate</a>
            </h2 >
        </div>
        <Footer />
        <img className="register_img" />
    </>;
}
