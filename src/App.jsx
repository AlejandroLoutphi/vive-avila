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
import { BlogGuide } from "./BlogGuide";
import { AboutUs } from "./AboutUs";
import { GuideHome } from './GuideHome';
import { EditProfile } from './EditProfile';
import { Register } from './Register';
import { Login } from './Login';
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
const firebaseDb = getFirestore(firebaseApp);
export const firebaseUsersCollection = collection(firebaseDb, 'users');
export const firebaseContactMessagesCollection = collection(firebaseDb, 'contactMessages');
export const firebasePendingTripsCollection = collection(firebaseDb, 'pendingTrips');
export const firebaseBlogArticlesCollection = collection(firebaseDb, 'blogArticles');
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseGoogleProvider = new GoogleAuthProvider();

// "enum" para guardar en qué página estamos
// JS no soporta enums, así que solo usamos una
// colección constante de valores inmutables
export const Page = Object.freeze({
	start: "start",
	register: "register",
	editProfile: "editProfile",
	login: "login",
	aboutUs: "aboutUs",
	blogGuide: "blogGuide",
});

export const UserType = Object.freeze({
	admin: 'admin',
	guide: 'guide',
	student: 'student',
});

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
				<a onClick={() => setPage(Page.blogGuide)} className="nav-item">Guia</a>
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

function Notification({ text }) {
	return <div className="notification">
		{text}
	</ div>
}

function NotificationContainer({ notifications }) {
	return <>
		{notifications.length > 0 && notifications.map((n, idx) =>
			<Notification key={idx} text={n} />
		)}
	</>
}

function App() {
	// Cambiar página defecto
	const [page, setPage] = useState(Page.register);
	const [user, setUser] = useState();
	const [notifications, setNotifications] = useState([]);

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
		setNotifications(notifications => [...notifications, n]);
		setTimeout(() =>
			setNotifications(notifications =>
				notifications.slice(1, undefined)
			), notificationDisplayMs);
	};

	// Para mostrar una página, solo hacemos un switch sobre todas
	// las páginas posibles y retornamos ese componente
	switch (page) {
		case Page.register:
			return <>
				<NotificationContainer notifications={notifications} />
				<Register setPage={setPage} setUser={setUser}
					addNotification={addNotification} googleSignIn={googleSignIn} />
			</>;

		case Page.editProfile:
			if (user.provider) break;
			return <>
				<NotificationContainer notifications={notifications} />
				<EditProfile setPage={setPage} user={user} setUser={setUser}
					addNotification={addNotification} />
			</>;

		case Page.login:
			return <>
				<NotificationContainer notifications={notifications} />
				<Login setPage={setPage} setUser={setUser}
					addNotification={addNotification} googleSignIn={googleSignIn} />
			</>;

		case Page.start:
			if (user && user.type === UserType.guide) {
				return <>
					<NotificationContainer notifications={notifications} />
					<GuideHome user={user} setPage={setPage} addNotification={addNotification} />
				</>;
			}
			return <>
				<NotificationContainer notifications={notifications} />
				<MainPage setPage={setPage} user={user} />
			</>;

		case Page.aboutUs:
			return <>
				<NotificationContainer notifications={notifications} />
				<AboutUs setPage={setPage} addNotification={addNotification} user={user} />
			</>;

		case Page.blogGuide:
			return <>
				<NotificationContainer notifications={notifications} />
				<BlogGuide setPage={setPage} user={user} />
			</>;
	}
	// Placeholder
	return <>
		<h1>{user ? 'Estás Registrado' : 'No está registrado'}</h1>
	</>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
window.onbeforeunload = () => {
	window.scrollTo(0, 0);
}
