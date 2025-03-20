import React, { useState, useEffect } from "react";
import { updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { Footer } from "./App";
import { MainPage } from "./MainPage";
// Edit Profile (por ahora) reusa Register.css

export function EditProfile({ setPage, user, setAndStoreUser, addNotification }) {
    useEffect(() => void window.history.pushState(null, "", "editProfile"), []);
    if (!user) return void setPage(() => MainPage);
    const [formUsername, setFormUsername] = useState(user.username);
    const [formPhone, setFormPhone] = useState(user.phone);
    const [formDate, setFormDate] = useState(user.date);
    const [formPassword, setFormPassword] = useState('');
    const [formPfp, setFormPfp] = useState();
    const [formPfpBase64, setFormPfpBase64] = useState(user.pfp);

    async function uploadEdit(e) {
        e.preventDefault();
        if (!formUsername || !formPhone || !formPfpBase64) return;
        const fieldsToUpdate = { username: formUsername, phone: formPhone, pfp: formPfpBase64 };
        if (formPassword) {
            if (!user.auth) return void addNotification('Error al comunicarse con el servidor');
            await updatePassword(user.auth, formPassword);
        }
        await updateDoc(user.docRef, fieldsToUpdate);
        addNotification('Usuario modificado');
        setAndStoreUser({ ...user, ...fieldsToUpdate });
    }

    async function pfpChange(e) {
        // Para guardar la imagen en Firestore, la convertimos a Base64
        setFormPfp();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result.length >= 1000000)
                return void addNotification('Error: la imagen es muy grande');
            setFormPfp(URL.createObjectURL(file));
            setFormPfpBase64(reader.result);
        };
        reader.onerror = () => void addNotification('Error al subir imagen');
    }

    return <>
        <div className="register_container">
            <div className="register_content">
                <a className="register_back" onClick={() => setPage(() => MainPage)}>Atrás</a>
                <div className="center">
                    <h1 className="register_title title">Cambia los detalles de su perfil</h1>
                </div>
                <form onSubmit={uploadEdit} className="register_form user_form">
                    <div className="divisor">
                        <div className="register_form_section_name register_form_section">
                            <label className="register_form_text" htmlFor="editProfile_name">Nombre Completo</label>
                            <input type="text" id="editProfile_name" name="register_name"
                                value={formUsername} onChange={(e) => setFormUsername(e.target.value)}
                                className="register_name register_field" required minLength="3" maxLength="40" />
                        </div>
                        {/* existe el type="tel", pero idk si lo queremos usar */}
                        <div className="register_form_section_phone register_form_section">
                            <label className="register_form_text" htmlFor="editProfile_phone">Número de Teléfono</label>
                            <input type="number" id="editProfile_phone" name="register_phone"
                                value={formPhone} onChange={(e) => setFormPhone(e.target.value)}
                                className="register_phone register_field" required minLength="3" maxLength="40" />
                        </div>
                        {!user.provider && <div className="register_form_section_password register_form_section">
                            <label className="register_form_text" htmlFor="editProfile_password">Contraseña</label>
                            <input type="password" id="editProfile_password" name="register_password"
                                value={formPassword} onChange={(e) => setFormPassword(e.target.value)}
                                className="register_password register_field" minLength="6" maxLength="40"
                                placeholder="(sin cambios)" />
                        </div>}
                    </div>
                    <div className="divisor">
                        <div className="register_form_section_pfp register_form_section">
                            <label className="register_form_text_pfp register_form_text" htmlFor="editProfile_pfp">
                                Foto de Perfil
                                <br />
                                <img id="editProfile_pfp_preview" name="register_pfp_preview"
                                    className="register_pfp_preview pfp_preview"
                                    src={formPfp ? formPfp : formPfpBase64} />
                            </label>
                            {/* si subes una img con error, aún aparece que la has subido
                asumo que ocultaremos eso igual, pero por ahora está raro */}
                            <input type="file" id="editProfile_pfp" name="register_pfp" onChange={pfpChange}
                                className="register_pfp register_field" accept="image/*" />
                        </div>
                        <div className="register_form_section_date register_form_section">
                            <label className="register_form_text" htmlFor="editProfile_date">Fecha de Nacimiento</label>
                            <input type="date" id="editProfile_date" name="register_date"
                                value={formDate} onChange={(e) => setFormDate(e.target.value)}
                                className="register_date register_field" required
                                max={new Date().toISOString().slice(0, 10)} />
                        </div>
                        <button type="submit" disabled={!formPfpBase64}
                            className="register_submit_button button_1">
                            Cambiar
                        </button>
                    </div>
                </form>
            </div>
            <img className="register_img" />
        </div>
        <Footer />
    </>;
}
