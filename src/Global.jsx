import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
export const firebaseUsersCollection = collection(firebaseDb, 'users');

// "enum" para guardar en qué página estamos
// JS no soporta enums, así que solo usamos una
// colección constante de valores inmutables
export const Page = Object.freeze({
	start: Symbol(),
	register: Symbol(),
	login: Symbol(),
});

export const UserType = Object.freeze({
	admin: Symbol(),
	guide: Symbol(),
	student: Symbol(),
})

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


export function ErrNofification({ text }) {
	return <div id="err_notification" className="err_notification notification">
		{text}
	</ div>
}
