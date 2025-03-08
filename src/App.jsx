import React, { useState } from "react";
import { initializeApp } from "firebase/app";
// NOTE: use firestore lite?
import { getFirestore, collection, addDoc, getDocs, query, where, limit, getCountFromServer }
	from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged, getAuth, GoogleAuthProvider, sendEmailVerification, signOut }
	from "firebase/auth";
import { MainPage } from "./MainPage";
import { BlogGuide } from "./BlogGuide";
import { AboutUs } from "./AboutUs";
import { GuideHome } from './GuideHome';
import { EditProfile } from './EditProfile';
import { Login } from './Login';
import { Excursiones } from "./Excursiones";
import "./App.css";

let isFirstRender = true;

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
const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseGoogleProvider = new GoogleAuthProvider();

// Referencias a las colecciones de Firestore que usa la aplicación
export const firebaseUsersCollection = collection(firebaseDb, 'users');
export const firebaseContactMessagesCollection = collection(firebaseDb, 'contactMessages');
export const firebasePendingTripsCollection = collection(firebaseDb, 'pendingTrips');
export const firebaseBlogArticlesCollection = collection(firebaseDb, 'blogArticles');

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

// JSON del usuario guardado en Localstorage (valor inicial de usuario)
const storedUser = window.localStorage.getItem("vive-avila-user");


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
				<a onClick={() => setPage(() => MainPage)} className="nav-item">Foro</a>
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

export function App() {
	// Cambiar página defecto
	const [PageComponent, setPage] = useState(() => MainPage);
	const [user, setUser] = useState(storedUser && JSON.parse(storedUser));
	const [excursionSeleccionada, setExcursionSeleccionada] = useState();
	const [notifications, setNotifications] = useState([]);

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
		setNotifications(notifications => [...notifications, n]);
		setTimeout(() =>
			setNotifications(notifications => notifications.slice(1)), notificationDisplayMs);
	};

	if (isFirstRender) {
		onAuthStateChanged(firebaseAuth, async (userAuth) => {
			if (!userAuth) return void setAndStoreUser();
			if (userAuth.uid == user?.uid) return void setAndStoreUser({ ...user, auth: userAuth });
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
	}
	isFirstRender = false;

	async function googleSignIn(e) {
		e.preventDefault();
		try {
			const result = await signInWithPopup(firebaseAuth, firebaseGoogleProvider);
			const userAuth = result.user;
			const q = query(firebaseUsersCollection,
				where("email", "==", userAuth.email),
				limit(1)
			);
			const querySnapshot = await getCountFromServer(q);
			if (querySnapshot.data().count > 0) return void setPage(() => MainPage);
			let dbUser = {
				uid: userAuth.uid,
				username: userAuth.displayName,
				email: userAuth.email,
				provider: UserProvider.google,
			};
			if (userAuth.phoneNumber) dbUser.phone = userAuth.phoneNumber;
			if (userAuth.photoURL) dbUser.pfp = userAuth.photoURL;
			setPage(() => MainPage);
			addDoc(firebaseUsersCollection, dbUser);
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
		<PageComponent setPage={setPage} user={user} setAndStoreUser={setAndStoreUser}
			addNotification={addNotification} googleSignIn={googleSignIn}
			excursionSeleccionada={excursionSeleccionada}
			setExcursionSeleccionada={setExcursionSeleccionada} />
		{notifications.length > 0 && notifications.map((text, idx) =>
			<div className="notification" key={idx}>{text}</div>
		)}
	</>;
}
