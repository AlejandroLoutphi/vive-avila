import React from "react";
import { initializeApp } from "firebase/app";
// NOTE: use firestore lite?
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

// Setup de Firebase
const firebaseConfig = {
	apiKey: "AIzaSyCBfqXp33H3Zj_8GfzjHnxW4RIMC4F5ACc",
	authDomain: "vive-avila.firebaseapp.com",
	projectId: "vive-avila",
	storageBucket: "vive-avila.firebasestorage.app",
	messagingSenderId: "889941160937",
	appId: "1:889941160937:web:ed10617ded750209689178"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseUsersCollection = collection(firebaseDb, 'users');
export const firebaseContactMessagesCollection = collection(firebaseDb, 'contactMessages');
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseGoogleProvider = new GoogleAuthProvider();

// "enum" para guardar en qué página estamos
// JS no soporta enums, así que solo usamos una
// colección constante de valores inmutables
export const Page = Object.freeze({
	inicio: Symbol(),
	registro: Symbol(),
	editarPerfil: Symbol(),
	login: Symbol(),
	sobreNosotros: Symbol(),
	guia: Symbol(),
	excursiones: Symbol(),       
	galeria: Symbol(),           
  });
  
  

export const UserType = Object.freeze({
	admin: 'admin',
	guide: 'guide',
	student: 'student',
})

export const UserProvider = Object.freeze({
	viveAvila: undefined,
	google: 'google',
});

export function Navbar({ setPage }) {
	return <nav className="navbar">
		<img
			loading="lazy"
			src="/nav-logo.png"
			className="nav-logo"
			alt="Navigation logo"
		/>
		<div className="nav-links">
			<a onClick={() => setPage(Page.start)} className="nav-item">Inicio</a>
			<a onClick={() => setPage(Page.start)} className="nav-item">Guia</a>
			<a onClick={() => setPage(Page.start)} className="nav-item">Excursiones</a>
			<a onClick={() => setPage(Page.start)} className="nav-item">Foro</a>
			<a onClick={() => setPage(Page.aboutUs)} className="nav-item">Sobre Nosotros</a>
			<div className="nav-dropdown-container">
				<a className="nav-item">Perfil</a>
				<div className="nav-dropdown">
					<a onClick={() => setPage(Page.start)} className="nav-item">Mi Perfil</a>
					<a onClick={() => setPage(Page.editProfile)} className="nav-item">Editar Perfil</a>
					<a onClick={() => {
						signOut(firebaseAuth);
						setPage(Page.login);
					}} className="nav-item">Cerrar Sesión</a>
				</div>
			</div>
		</div>
	</nav>
}

export function Footer() {
	return <footer>
		<div className="footer_content">
			<div className="footer_title_container">
				<div className="footer_line"></div>
				<h2 className="footer_title">Vive Ávila</h2>
				<div className="footer_line"></div>
			</div>
			<div className="footer_info">
				Más información
				<br />
				(+58)424_8014532
			</div>
		</div>
	</footer>
}


export function Notification({ text }) {
	return <div id="err_notification" className="err_notification notification">
		{text}
	</ div>
}
