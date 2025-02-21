import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
// NOTE: use firestore lite?
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	where,
	limit,
	getCountFromServer
} from "firebase/firestore";
import {
	signInWithPopup,
	onAuthStateChanged,
	getAuth,
	GoogleAuthProvider,
	signOut
} from "firebase/auth";
import { MainPage } from "./MainPage";
import { AboutUs } from "./AboutUs";
import { GuideHome } from './GuideHome';
import { EditProfile } from './EditProfile';
import { Register } from './Register';
import { Login } from './Login';
import "./App.css";
import './MainPage.css';
import './AboutUs.css';
import './GuideHome.css';

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
export const firebasePendingTripsCollection = collection(firebaseDb, 'pendingTrips');
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseGoogleProvider = new GoogleAuthProvider();

// "enum" para guardar en qué página estamos
// JS no soporta enums, así que solo usamos una
// colección constante de valores inmutables
export const Page = Object.freeze({
	start: Symbol(),
	register: Symbol(),
	editProfile: Symbol(),
	login: Symbol(),
	aboutUs: Symbol(),
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

export function Navbar({ setPage, user }) {
	return <nav className="navbar">
		<img loading="lazy" src="/nav-logo.png" className="nav-logo" alt="Navigation logo" />
		<div className="nav-links">
			<a onClick={() => setPage(Page.start)} className="nav-item">Inicio</a>
			{(!user || user.type == UserType.student) && <>
				<a onClick={() => setPage(Page.start)} className="nav-item">Guia</a>
				<a onClick={() => setPage(Page.start)} className="nav-item">Excursiones</a>
				<a onClick={() => setPage(Page.start)} className="nav-item">Foro</a>
				<a onClick={() => setPage(Page.aboutUs)} className="nav-item">Sobre Nosotros</a>
			</>}
			{user ?
				<div className="nav-dropdown-container">
					<a className="nav-item">Perfil</a>
					<div className="nav-dropdown">
						<a onClick={() => setPage(Page.start)} className="nav-item">Mi Perfil</a>
						{user.provider &&
							<a onClick={() => setPage(Page.editProfile)} className="nav-item">
								Editar Perfil
							</a>
						}
						<a onClick={() => {
							signOut(firebaseAuth);
							setPage(Page.login);
						}} className="nav-item">Cerrar Sesión</a>
					</div>
				</div> :
				<a onClick={() => setPage(Page.login)} className="nav-item">Iniciar Sesión</a>
			}
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



function App() {
	// Cambiar página defecto
	const [page, setPage] = useState(Page.start);
	const [user, setUser] = useState();
	const [errNotifications, setErrNotifications] = useState([]);

	useEffect(() => onAuthStateChanged(firebaseAuth, async (userAuth) => {
		if (!userAuth) {
			setUser();
			return;
		}
		const q = query(firebaseUsersCollection,
			where("uid", "==", userAuth.uid),
			limit(1)
		);
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.docs[0]) return;
		const dbUser = querySnapshot.docs[0].data();
		setUser({ ...dbUser, auth: userAuth, type: dbUser.type });
	}), []);

	async function googleSignIn(e) {
		e.preventDefault();
		signInWithPopup(firebaseAuth, firebaseGoogleProvider)
			.then(async (result) => {
				const userAuth = result.user;
				const q = query(firebaseUsersCollection,
					where("uid", "==", userAuth.uid),
					limit(1)
				);
				const querySnapshot = await getCountFromServer(q);
				if (querySnapshot.data().count > 0) {
					setPage(Page.start);
					return;
				}
				let dbUser = {
					uid: userAuth.uid,
					username: userAuth.displayName,
					email: userAuth.email,
					type: UserType.student,
					provider: UserProvider.google,
				};
				if (userAuth.phoneNumber) dbUser.phone = userAuth.phoneNumber;
				if (userAuth.photoURL) dbUser.pfp = userAuth.photoURL;
				await addDoc(firebaseUsersCollection, dbUser);
				setUser({ ...dbUser, auth: userAuth, type: UserType.student });
				setPage(Page.start);
			}).catch((e) => {
				switch (e.code) {
					case 'auth/popup-closed-by-user':
					case 'auth/cancelled-popup-request':
					case 'auth/user-cancelled':
						return;
					default:
						console.log(e);
				}
			});
	}

	const notificationDisplayMs = 5000;
	function addNotification(n) {
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
					<Notification key={idx} text={n} />
				)}
				<Register setPage={setPage} setUser={setUser}
					addNotification={addNotification} googleSignIn={googleSignIn} />
			</>;

		case Page.editProfile:
			if (user.provider) break;
			return <>
				{errNotifications.length > 0 && errNotifications.map((n, idx) =>
					<Notification key={idx} text={n} />
				)}
				<EditProfile setPage={setPage} user={user} setUser={setUser}
					addNotification={addNotification} />
			</>;

		case Page.login:
			return <>
				{errNotifications.length > 0 && errNotifications.map((n, idx) =>
					<Notification key={idx} text={n} />
				)}
				<Login setPage={setPage} setUser={setUser}
					addNotification={addNotification} googleSignIn={googleSignIn} />
			</>;

		case Page.start:
			if (user && user.type === UserType.guide) {
				return <>
					{errNotifications.length > 0 && errNotifications.map((n, idx) =>
						<Notification key={idx} text={n} />
					)}
					<GuideHome user={user} setPage={setPage} addNotification={addNotification} />
				</>;
			}
			return <>
				{errNotifications.length > 0 && errNotifications.map((n, idx) =>
					<Notification key={idx} text={n} />
				)}
				<MainPage setPage={setPage} user={user} />
			</>;

		case Page.aboutUs:
			return <>
				{errNotifications.length > 0 && errNotifications.map((n, idx) =>
					<Notification key={idx} text={n} />
				)}
				<AboutUs setPage={setPage} addNotification={addNotification} user={user} />
			</>;
	}
	// Placeholder
	return <>
		<h1>{user ? 'Estás Registrado' : 'No está registrado'}</h1>
	</>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, { key: "app" }));
window.onbeforeunload = () => {
	window.scrollTo(0, 0);
}
//<iframe width="1460" height="610" frameborder="0" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=1460&amp;height=610&amp;hl=en&amp;q=Universidad%20Metropolitana%20de%20Caracas%20Caracas+(Universidad%20Metropolitana%20de%20Caracas)&amp;t=k&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=ea2f4b417aa47ec70adcc844a9ef3dc3a996e900'></script>
