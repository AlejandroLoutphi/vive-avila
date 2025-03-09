import React, { useState } from "react";
import { initializeApp } from "firebase/app";
// NOTE: use firestore lite?
import { getFirestore, collection, addDoc, getDocs, query, where, limit, getCountFromServer }
	from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged, getAuth, GoogleAuthProvider, sendEmailVerification, signOut }
	from "firebase/auth";
import { MainPage } from "./MainPage";
import { Register } from './Register';
import { EditProfile } from './EditProfile';
import { Login } from './Login';
import { AboutUs } from "./AboutUs";
import { BlogGuide } from "./BlogGuide";
import { GuideHome } from './GuideHome';
import { Excursiones } from "./Excursiones";
import { DetalleExcursion } from "./DetalleExcursion";
import { Forum } from "./Forum";
import "./App.css";

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
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseGoogleProvider = new GoogleAuthProvider();

// Referencias a las colecciones de Firestore que usa la aplicación
export const firebaseUsersCollection = collection(firebaseDb, 'users');
export const firebaseContactMessagesCollection = collection(firebaseDb, 'contactMessages');
export const firebasePendingTripsCollection = collection(firebaseDb, 'pendingTrips');
export const firebaseBlogArticlesCollection = collection(firebaseDb, 'blogArticles');
export const firebaseForumMessagesCollection = collection(firebaseDb, 'forumMessages');

// Cargar la página correcta dependiendo de la página en la URL bar
// TODO: handle the starting page differently depending on UserType
const pageList = Object.freeze({
	"": () => MainPage,
	register: () => Register,
	editProfile: () => EditProfile,
	login: () => Login,
	aboutUs: () => AboutUs,
	blogGuide: () => BlogGuide,
	excursiones: () => Excursiones,
	detalleExcursion: () => DetalleExcursion,
	forum: () => Forum,
});
const pageString = window.location.pathname.split("/", 2)[1];
const pageStartingValue = pageList[pageString]
	?? (window.history.replaceState(null, "", ""), () => MainPage);

// Constantes que determinan cómo guardamos los tipos de usuario
export const UserType = Object.freeze({
	student: undefined,
	admin: 'admin',
	guide: 'guide',
});

// Constantes que determinan cómo guardamos los proveedores de usuario
export const UserProvider = Object.freeze({
	viveAvila: undefined,
	google: 'google',
});

// JSON del usuario guardado en localStorage (valor inicial de usuario)
// Esto lo usamos para cachear el objeto del usuario entre sesiones
const storedUser = window.localStorage.getItem("vive-avila-user");

// Flag para correr código solo durante el primer render
let isFirstRender = true;

// Componente Navbar usado en toda la aplicación
export function Navbar({ setPage, user }) {
	return <nav className="navbar">
		<img loading="lazy" src="/nav-logo.png" className="nav-logo" alt="Navigation logo" />
		<div className="nav-links">
			<a className="nav-item" onClick={() => {
				if (!user) return void setPage(() => MainPage);
				switch (user.type) {
					case UserType.student: setPage(() => MainPage); break;
					case UserType.guide: setPage(() => GuideHome); break;
					case UserType.admin: setPage(() => MainPage); break;
				}
			}}>Inicio</a>
			{(!user || user.type == UserType.student) && <>
				<a onClick={() => setPage(() => BlogGuide)} className="nav-item">Guia</a>
				<a onClick={() => setPage(() => Excursiones)} className="nav-item">Excursiones</a>
				<a onClick={() => setPage(() => Forum)} className="nav-item">Foro</a>
				<a onClick={() => setPage(() => AboutUs)} className="nav-item">Sobre Nosotros</a>
			</>}
			{user ?
				<div className="nav-dropdown-container">
					<a className="nav-item">Perfil</a>
					<div className="nav-dropdown">
						<a onClick={() => setPage(() => MainPage)} className="nav-item">Mi Perfil</a>
						{!user.provider &&
							<a onClick={() => setPage(() => EditProfile)} className="nav-item">
								Editar Perfil
							</a>
						}
						<a onClick={() => {
							signOut(firebaseAuth);
							setPage(() => Login);
						}} className="nav-item">Cerrar Sesión</a>
					</div>
				</div> :
				<a onClick={() => setPage(() => Login)} className="nav-item">Iniciar Sesión</a>
			}
		</div>
	</nav>;
}

// Componente Footer usado en toda la aplicación
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
	</footer>;
}

// Componente Top-level
export function App() {
	// Variable que guarda el estado de qué página mostrar
	// Esto emplea una versión del patrón "State"
	// Como solo llamaríamos un método de las clases "State", guardamos las funciones directamente
	// Para mostrar la página seleccionada, solo llamamos <Page />
	// Cambiamos la página con setPage(() => MyPage)
	// Con esto reemplazamos React Router sin usar switch's
	const [Page, setPage] = useState(pageStartingValue);

	// Objeto de usuario similar al usado en la DB
	// También guarda un documentReference y una referencia a Firebase Auth
	const [user, setUser] = useState(storedUser && JSON.parse(storedUser));

	// Cuando hay un error, mostramos una notificación al usuario
	const [notification, setNotification] = useState();

	// Estado pasado entre páginas
	const [excursionSeleccionada, setExcursionSeleccionada] = useState();

	// Como usamos localStorage para cachear al usuario, tenemos una función para automatizar eso
	function setAndStoreUser(user) {
		if (!user) window.localStorage.removeItem("vive-avila-user");
		else window.localStorage.setItem("vive-avila-user", JSON.stringify({
			...user,
			auth: undefined,
		}));
		setUser(user);
	}

	const notificationDisplayMs = 5000;
	function addNotification(n) {
		setNotification(n);
		setTimeout(() => setNotification(), notificationDisplayMs);
	}

	// Se corre esta función cada vez que el usuario inicia o cierra sesión
	if (isFirstRender) onAuthStateChanged(firebaseAuth, async (userAuth) => {
		if (!userAuth) return void setAndStoreUser();
		// Para no recargar el usuario que ya cacheamos
		if (userAuth.uid == user?.uid) return void setAndStoreUser({ ...user, auth: userAuth });
		// No iniciamos sesión si el email no está verificado; mandamos un email de verificación nuevo
		if (!userAuth.emailVerified) {
			signOut(firebaseAuth);
			try {
				await sendEmailVerification(userAuth);
				addNotification('Email de verificación enviado. Puede iniciar sesión después de hacer click en el link dentro de este.');
			} catch (e) {
				switch (e.code) {
					case 'auth/too-many-requests':
						addNotification('Error al comunicarse con el servidor');
						return;
				}
			}
			return;
		}
		const q = query(firebaseUsersCollection,
			where("email", "==", userAuth.email),
			limit(1)
		);
		const querySnapshot = await getDocs(q);
		const userDoc = querySnapshot.docs[0];
		if (!userDoc) return;
		const dbUser = userDoc.data();
		switch (dbUser.type) {
			case UserType.student: setPage(() => MainPage); break;
			case UserType.guide: setPage(() => GuideHome); break;
			// TODO: admin home
			case UserType.admin: setPage(() => MainPage); break;
		}
		setAndStoreUser({ ...dbUser, auth: userAuth, docRef: userDoc.ref });
	});
	isFirstRender = false;

	// Sign In con Google funciona tanto para registrarse como para iniciar sesión
	// Para no duplicar esta función, la ponemos acá
	async function googleSignIn(e) {
		e.preventDefault();
		try {
			const result = await signInWithPopup(firebaseAuth, firebaseGoogleProvider);
			const userAuth = result.user;
			const q = query(firebaseUsersCollection, where("email", "==", userAuth.email), limit(1));
			const querySnapshot = await getCountFromServer(q);
			if (querySnapshot.data().count > 0) return void setPage(() => MainPage);
			// Si el usuario se está registrando, guardamos la data guardada en su cuenta de Google
			let dbUser = {
				uid: userAuth.uid,
				username: userAuth.displayName,
				email: userAuth.email,
				phone: userAuth.phoneNumber ?? undefined,
				pfp: userAuth.photoURL ?? undefined,
				provider: UserProvider.google,
			};
			addDoc(firebaseUsersCollection, dbUser);
			setPage(() => MainPage);
		} catch (e) {
			switch (e.code) {
				case 'auth/popup-closed-by-user':
				case 'auth/cancelled-popup-request':
				case 'auth/user-cancelled':
					return;
				default:
					console.log(e);
			}
		}
	}

	return <>
		<Page setPage={setPage} user={user} setAndStoreUser={setAndStoreUser}
			addNotification={addNotification} googleSignIn={googleSignIn}
			excursionSeleccionada={excursionSeleccionada}
			setExcursionSeleccionada={setExcursionSeleccionada} />
		{notification && <div className="notification">{notification}</div>}
	</>;
}
