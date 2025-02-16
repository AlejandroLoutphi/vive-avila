import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { addDoc, getDocs, query, where, limit } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
	firebaseAuth,
	firebaseUsersCollection,
	Page,
	UserType,
	Footer,
	ErrNofification
} from "./Global";
import { MainPage } from "./MainPage";
import "./App.css";
import './MainPage.css';

function Login({ setPage, setUser, addErrNotification }) {
	const [formEmail, setFormEmail] = useState('');
	const [formPassword, setFormPassword] = useState('');

	async function loginAccount(e) {
		e.preventDefault();
		signInWithEmailAndPassword(firebaseAuth, formEmail, formPassword)
			.then(async (userCredential) => {
				const userAuth = userCredential.user;
				const q = query(firebaseUsersCollection,
					where("uid", "==", userAuth.uid),
					limit(1)
				);
				const querySnapshot = await getDocs(q);
				const user = { ...querySnapshot.docs[0].data(), auth: userAuth };
				setUser(user);
				setPage(Page.start);
			}).catch((e) => {
				switch (e.code) {
					case 'auth/invalid-credential':
						addErrNotification('Error: el email o contraseña son incorrectos');
						return;
					case 'auth/too-many-requests':
						addErrNotification('Error: solicitud bloqueada');
						return;
					default:
						addErrNotification('Error al comunicarse con el servidor');
						console.log(e);
						return;
				}
			});
	}

	// TODO: add loading animation
	return <>
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
		<h2 className="login_to_register">
			¿No tienes cuenta?
			<a onClick={() => setPage(Page.register)}> Regístrate</a>
		</h2 >
		<Footer />
	</>;
}

function Register({ setPage, setUser, addErrNotification }) {
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
			!formPassword ||
			!formPfpBase64) return;
		createUserWithEmailAndPassword(firebaseAuth, formEmail, formPassword)
			.then(async (userCredential) => {
				const userAuth = userCredential.user;
				const dbUser = {
					uid: userAuth.uid,
					username: formUsername,
					phone: formPhone,
					email: formEmail,
					date: formDate,
					type: 'student',
					pfp: formPfpBase64,
				};
				await addDoc(firebaseUsersCollection, dbUser);
				const user = { ...dbUser, auth: userAuth, type: UserType.student };
				setUser(user);
				setPage(Page.start);
			}).catch((e) => {
				switch (e.code) {
					case 'auth/invalid-email':
						addErrNotification('Error: el email es inválido');
						return;
					case 'auth/email-already-in-use':
						addErrNotification('Error: ese email ya ha sido registrado');
						return;
					default:
						addErrNotification('Error al comunicarse con el servidor');
						console.log(e);
						return;
				}
			});
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
				addErrNotification('Error: la imagen es muy grande');
				return;
			}
			setFormPfp(URL.createObjectURL(file));
			setFormPfpBase64(reader.result);
		};
		reader.onerror = () => {
			addErrNotification('Error al subir imagen');
		};
	}

	// TODO: add loading animation
	return <>
		<div className="register_container">
			<div className="register_content">
				<form onSubmit={registerCreateAccount} className="register_form user_form">
					<div className="center">
						<h1 className="register_title title">¡Únete a nuevas experiencias!</h1>
						<h2 className="register_subtitle subtitle">Registrar Usuario</h2>
					</div>
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
						<div className="register_form_section_date register_form_section">
							<label className="register_form_text" htmlFor="register_date">Fecha de Nacimiento</label>
							<input type="date" id="register_date" name="register_date"
								value={formDate} onChange={(e) => setFormDate(e.target.value)}
								className="register_date register_field" required
								max={new Date().toISOString().slice(0, 10)} />
						</div>
						<div className="register_form_section_pfp register_form_section">
							<label className="register_form_text" htmlFor="register_pfp">Foto de Perfil</label>
							{/* si subes una img con error, aún aparece que la has subido
				asumo que ocultaremos eso igual, pero por ahora está raro */}
							<input type="file" id="register_pfp" name="register_pfp" onChange={pfpChange}
								className="register_date register_field" required accept="image/*" />
							<img id="register_pfp_preview" name="register_pfp_preview"
								className="register_pfp_preview pfp_preview" src={formPfp} />
						</div>
						<button type="submit" disabled={!formPfpBase64}
							className="register_submit_button button_1">
							Crear Cuenta
						</button>
					</div>
				</form>
				<h2 className="register_to_login">
					¿Ya tienes cuenta?
					<a className="self_link" onClick={() => setPage(Page.login)}> Inicia Sesión</a>
				</h2 >
			</div>
			<img className="register_img" />
		</div>
		<Footer />
	</>;
}

function App() {
	// Cambiar página defecto
	const [page, setPage] = useState(Page.register);
	const [user, setUser] = useState();
	const [errNotifications, setErrNotifications] = useState([]);

	const notificationDisplayMs = 2000;
	function addErrNotification(n) {
		setErrNotifications(errNotifications => [...errNotifications, n]);
		setTimeout(() =>
			setErrNotifications(errNotifications =>
				errNotifications.slice(1, undefined)
			), notificationDisplayMs);
	};

	// Para mostrar una página, solo hacemos un switch sobre todas
	// las páginas posibles y retornamos ese componente
	switch (page) {
		case Page.register:
			return <>
				{errNotifications.length > 0 && errNotifications.map((n, idx) =>
					<ErrNofification key={idx} text={n} />
				)}
				<Register setPage={setPage} setUser={setUser}
					addErrNotification={addErrNotification} />
			</>;
		case Page.login:
			return <>
				{errNotifications.length > 0 && errNotifications.map((n, idx) =>
					<ErrNofification key={idx} text={n} />
				)}
				<Login setPage={setPage} setUser={setUser}
					addErrNotification={addErrNotification} />;
			</>
		case Page.start:
			return <MainPage setPage={setPage} />;
		default:
			// Placeholder
			return <>
				{user ? <h1>Estás Registrado</h1> : <h1>No está registrado</h1>}
			</>;
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, { key: "app" }));
window.onbeforeunload = () => window.scrollTo(0, 0);
//<iframe width="1460" height="610" frameborder="0" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=1460&amp;height=610&amp;hl=en&amp;q=Universidad%20Metropolitana%20de%20Caracas%20Caracas+(Universidad%20Metropolitana%20de%20Caracas)&amp;t=k&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=ea2f4b417aa47ec70adcc844a9ef3dc3a996e900'></script>
