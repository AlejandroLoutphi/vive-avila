import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseUsersCollection, Page, Footer } from "./App";
import './Register.css';

export function Register({ setPage, addNotification, googleSignIn }) {
    const [formUsername, setFormUsername] = useState('');
    const [formPhone, setFormPhone] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formDate, setFormDate] = useState('2005-01-01');
    const [formPfp, setFormPfp] = useState();
    const [formPfpBase64, setFormPfpBase64] = useState();

    async function registerCreateAccount(e) {
        e.preventDefault();
        if (!formUsername ||
            !formPhone ||
            !formEmail ||
            !formPassword) return;
        if (!formPfpBase64) {
            addNotification("Debe subir una foto de perfil");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, formEmail, formPassword);
            const userAuth = userCredential.user;
            const dbUser = {
                uid: userAuth.uid,
                username: formUsername,
                phone: formPhone,
                email: formEmail,
                date: formDate,
                pfp: formPfpBase64,
            };
            addDoc(firebaseUsersCollection, dbUser);
            setPage(Page.login);
        } catch (e) {
            switch (e.code) {
                case 'auth/invalid-email':
                    addNotification('Error: el email es inválido');
                    return;
                case 'auth/email-already-in-use':
                    addNotification('Error: ese email ya ha sido registrado');
                    return;
                default:
                    // TODO: quitar esto
                    addNotification('Error genérico');
                    console.log(e);
                    return;
            }
        }
    }

    async function pfpChange(e) {
        // TODO: placeholder image
        // setFormPfp(idk some placeholder image);
        setFormPfp();
        setFormPfpBase64();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result.length >= 1000000) {
                addNotification('Error: la imagen es muy grande');
                return;
            }
            setFormPfp(URL.createObjectURL(file));
            setFormPfpBase64(reader.result);
        };
        reader.onerror = () => {
            addNotification('Error al subir imagen');
        };
    }

    // TODO: add loading animation
    return <>
        <div className="register_container">
            <div className="register_content">
                <div className="center">
                    <h1 className="register_title title">¡Únete a nuevas experiencias!</h1>
                    <h2 className="register_subtitle subtitle">Registrar Usuario</h2>
                </div>
                <form onSubmit={registerCreateAccount} className="register_form user_form">
                    <div className="divisor">
                        <div className="register_form_section_name register_form_section">
                            <label className="register_form_text" htmlFor="register_name">Nombre Completo</label>
                            <input type="text" id="register_name" name="register_name"
                                value={formUsername} onChange={(e) => setFormUsername(e.target.value)}
                                className="register_name register_field" required minLength="3" maxLength="40" />
                        </div>
                        {/* existe el type="tel", pero idk si lo queremos usar */}
                        <div className="register_form_section_phone register_form_section">
                            <label className="register_form_text" htmlFor="register_phone">Número de Teléfono</label>
                            <input type="number" id="register_phone" name="register_phone"
                                value={formPhone} onChange={(e) => setFormPhone(e.target.value)}
                                className="register_phone register_field" required minLength="3" maxLength="40" />
                        </div>
                        <div className="register_form_section_email register_form_section">
                            <label className="register_form_text" htmlFor="register_email">Correo Electrónico</label>
                            <input type="email" id="register_email" name="register_email"
                                value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                                className="register_email register_field" required minLength="3" maxLength="40" />
                        </div>
                        <div className="register_form_section_password register_form_section">
                            <label className="register_form_text" htmlFor="register_password">Contraseña</label>
                            <input type="password" id="register_password" name="register_password"
                                value={formPassword} onChange={(e) => setFormPassword(e.target.value)}
                                className="register_password register_field" required minLength="6" maxLength="40" />
                        </div>
                    </div>
                    <div className="divisor">
                        <div className="register_form_section_pfp register_form_section">
                            <label className="register_form_text_pfp register_form_text" htmlFor="register_pfp">
                                Foto de Perfil
                                <br />
                                <img id="register_pfp_preview" name="register_pfp_preview"
                                    className="register_pfp_preview pfp_preview"
                                    src={formPfp ? formPfp : 'avatar-icon-vector-illustration.jpg'} />
                            </label>
                            {/* si subes una img con error, aún aparece que la has subido
                asumo que ocultaremos eso igual, pero por ahora está raro */}
                            <input type="file" id="register_pfp" name="register_pfp" onChange={pfpChange}
                                className="register_pfp register_field" accept="image/*" />
                        </div>
                        <div className="register_form_section_date register_form_section">
                            <label className="register_form_text" htmlFor="register_date">Fecha de Nacimiento</label>
                            <input type="date" id="register_date" name="register_date"
                                value={formDate} onChange={(e) => setFormDate(e.target.value)}
                                className="register_date register_field" required
                                max={new Date().toISOString().slice(0, 10)} />
                        </div>
                        <button type="submit" className="register_submit_button button_1">
                            Crear Cuenta
                        </button>
                    </div>
                </form>
                <div className="divisor">
                    <button type="button" onClick={googleSignIn}
                        className="register_google_button button_1">
                        Registrarse con Google
                    </button>
                </div>
                <h2 className="register_to_login">¿Ya tienes cuenta? <a
                    className="self_link" onClick={() => setPage(Page.login)}> Inicia Sesión</a>
                </h2 >
            </div>
            <img className="register_img" />
        </div>
        <Footer />
    </>;
}
