import React, { useState } from "react";
import { initializeApp } from "firebase/app";
// NOTE: use firestore lite?
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, query, where, limit, getCountFromServer, updateDoc, arrayUnion, deleteField, getDocsFromServer }
  from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged, getAuth, GoogleAuthProvider, sendEmailVerification, signOut }
  from "firebase/auth";
import { MainPage } from "./MainPage";
import { Register } from "./Register";
import { EditProfile } from "./EditProfile";
import { Login } from "./Login";
import { AboutUs } from "./AboutUs";
import { BlogGuide } from "./BlogGuide";
import { GuideHome } from "./GuideHome";
import { Excursiones } from "./Excursiones";
import { DetalleExcursion } from "./DetalleExcursion";
import { Forum } from "./Forum";
import { AdminPage } from "./AdminPage";
import { AdminTours } from "./AdminTours";
import { Gallery } from "./Gallery";
import { MiPerfil } from "./MiPerfil";
import "./App.css";
import { AdminActivity } from "./AdminActivity";

// Setup de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBfqXp33H3Zj_8GfzjHnxW4RIMC4F5ACc",
  authDomain: "vive-avila.firebaseapp.com",
  projectId: "vive-avila",
  storageBucket: "vive-avila.firebasestorage.app",
  messagingSenderId: "889941160937",
  appId: "1:889941160937:web:ed10617ded750209689178",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseGoogleProvider = new GoogleAuthProvider();

class DbCollection {
  constructor(name) {
    this.name = name;
    this.collection = collection(firebaseDb, name);
  }

  async get(...constraints) {
    const q = query(this.collection, ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), docRef: doc.ref }));
  }

  async getOne(...constraints) {
    const q = query(this.collection, ...constraints, limit(1));
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    if (!doc) return;
    return { ...doc.data(), docRef: doc.ref };
  }

  async doc(id) {
    const dbDoc = await getDoc(doc(firebaseDb, this.name, id));
    return dbDoc.exists() && { ...dbDoc.data(), docRef: dbDoc.ref };
  }

  async count(...constraints) {
    const q = query(this.collection, ...constraints);
    const querySnapshot = await getCountFromServer(q);
    return querySnapshot.data().count;
  }

  async add(obj) {
    const { docRef: _, ...dbObj } = obj
    addDoc(this.collection, dbObj);
  }
}

export const dbUsers = new DbCollection("users");
export const dbContactMessages = new DbCollection("contactMessages");
export const dbPendingTrips = new DbCollection("pendingTrips");
export const dbBlogArticles = new DbCollection("blogArticles");
export const dbForumMessages = new DbCollection("forumMessages");
export const dbReservations = new DbCollection("reservations");
export const dbReviews = new DbCollection("reviews");

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
  gallery: () => Gallery,
  profile: () => MiPerfil,
  adminTours: () => AdminTours,
  adminActivity: () => AdminActivity,
});
const pageString = window.location.pathname.split("/", 2)[1];
const pageStartingValue =
  pageList[pageString] ??
  (window.history.replaceState(null, "", ""), () => MainPage);

export const UserType = Object.freeze({
  student: undefined,
  admin: "admin",
  guide: "guide",
});

export const UserProvider = Object.freeze({
  viveAvila: undefined,
  google: "google",
});

const storedUser = window.localStorage.getItem("vive-avila-user");
let isFirstRender = true;

export function Navbar({ setPage, user }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <img
        loading="lazy"
        src="/nav-logo.png"
        className="nav-logo"
        alt="Navigation logo"
      />
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a className="nav-item" onClick={() => {
          if (!user) return void setPage(() => MainPage);
          switch (user.type) {
            case UserType.student:
              setPage(() => MainPage);
              break;
            case UserType.guide:
              setPage(() => GuideHome);
              break;
            case UserType.admin:
              setPage(() => AdminPage);
              break;
          }
        }}>Inicio</a>
        {(!user || user.type === UserType.student) &&
          <>
            <a onClick={() => setPage(() => BlogGuide)} className="nav-item">
              Guía
            </a>
            <a onClick={() => setPage(() => Excursiones)} className="nav-item">
              Excursiones
            </a>
            <a onClick={() => setPage(() => Forum)} className="nav-item">
              Foro
            </a>
            <a onClick={() => setPage(() => Gallery)} className="nav-item">
              Galeria
            </a>
            <a onClick={() => setPage(() => AboutUs)} className="nav-item">
              Sobre Nosotros
            </a>
          </>
        }
        {user && user.type === UserType.admin && <>
          <a onClick={() => setPage(() => AdminTours)} className="nav-item">Tours</a>
          <a onClick={() => setPage(() => AdminTours)} className="nav-item">Actividad</a>
        </>}
        {user ? (
          <div className="nav-dropdown-container">
            <a className="nav-item">
              Perfil
              {user.pfp && !user.provider && <div className="nav-pfp-wrapper"><img className="nav-pfp" src={user.pfp} /></div>}
            </a>
            <div className="nav-dropdown">
              <a onClick={() => setPage(() => MiPerfil)} className="nav-item">
                Mi Perfil
              </a>
              <a onClick={() => setPage(() => EditProfile)} className="nav-item">
                Editar Perfil
              </a>
              <a
                onClick={() => {
                  signOut(firebaseAuth);
                  setPage(() => Login);
                }}
                className="nav-item"
              >
                Cerrar Sesión
              </a>
            </div>
          </div>
        ) : (
          <a onClick={() => setPage(() => Login)} className="nav-item">
            Iniciar Sesión
          </a>
        )}
      </div>
      <div className="burger" onClick={() => setIsOpen(!isOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer>
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
  );
}

export function App() {
  const [Page, setPage] = useState(pageStartingValue);
  const [user, setUser] = useState(storedUser && JSON.parse(storedUser));
  const [notification, setNotification] = useState();
  const [excursionSeleccionada, setExcursionSeleccionada] = useState();

  function setAndStoreUser(u) {
    if (!u) window.localStorage.removeItem("vive-avila-user");
    else window.localStorage.setItem(
      "vive-avila-user",
      JSON.stringify({
        ...u,
        auth: undefined,
      })
    );
    setUser(u);
  }

  const notificationDisplayMs = 5000;
  function addNotification(n) {
    setNotification(n);
    setTimeout(() => setNotification(), notificationDisplayMs);
  }

  if (isFirstRender)
    onAuthStateChanged(firebaseAuth, async (userAuth) => {
      if (!userAuth) return void setAndStoreUser();
      if (userAuth.uid === user?.uid)
        return void setAndStoreUser({ ...user, auth: userAuth });
      if (!userAuth.email.endsWith("@correo.unimet.edu.ve") && !userAuth.email.endsWith("@unimet.edu.ve"))
        return void addNotification("Error: Solo se permiten correos de la UNIMET");
      if (!userAuth.emailVerified) {
        signOut(firebaseAuth);
        try {
          await sendEmailVerification(userAuth);
          addNotification(
            "Email de verificación enviado. Puede iniciar sesión después de hacer click en el link dentro de este."
          );
        } catch (e) {
          switch (e.code) {
            case "auth/too-many-requests":
              addNotification("Error al comunicarse con el servidor");
              return;
          }
        }
        return;
      }
      const dbUser = await dbUsers.getOne(where("email", "==", userAuth.email));
      switch (dbUser.type) {
        case UserType.student: setPage(() => MainPage); break;
        case UserType.guide: setPage(() => GuideHome); break;
        case UserType.admin: setPage(() => AdminPage); break;
      }
      setAndStoreUser({ ...dbUser, auth: userAuth });
    });
  isFirstRender = false;

  async function googleSignIn(e) {
    e.preventDefault();
    try {
      const result = await signInWithPopup(firebaseAuth, firebaseGoogleProvider);
      const userAuth = result.user;
      if (!userAuth.email.endsWith("@correo.unimet.edu.ve") && !userAuth.email.endsWith("@unimet.edu.ve"))
        return void addNotification("Error: Solo se permiten correos de la UNIMET");
      if (await dbUsers.count(where("email", "==", userAuth.email))) return void setPage(() => MainPage);
      dbUsers.add({
        uid: userAuth.uid,
        username: userAuth.displayName,
        email: userAuth.email,
        phone: userAuth.phoneNumber,
        pfp: userAuth.photoURL,
        provider: UserProvider.google,
      });
      setPage(() => MainPage);
    } catch (e) {
      switch (e.code) {
        case "auth/popup-closed-by-user":
        case "auth/cancelled-popup-request":
        case "auth/user-cancelled":
          return;
        default:
          console.log(e);
      }
    }
  }

  return <>
    <Page
      setPage={setPage}
      user={user}
      setAndStoreUser={setAndStoreUser}
      addNotification={addNotification}
      googleSignIn={googleSignIn}
      excursionSeleccionada={excursionSeleccionada}
      setExcursionSeleccionada={setExcursionSeleccionada}
    />
    {notification && <div className="notification">{notification}</div>}
  </>;

}

// console also fix imports
//updateDoc(doc(firebaseDb, "pendingTrips/WQU5qThbW6zEFM68BHwT"), {
//  guide: arrayUnion({
//    uid: "VArvN9FDYIDly0QM86zX",
//    date: "2025-04-11",
//  })
//});
//updateDoc(doc(firebaseDb, "users/9aGvt9H8J3Dj9UwBw7jE"), {
//  type: deleteField("type"),
//});
//updateDoc(doc(firebaseDb, "users/hGBgZvewgbiiSPFTmr65"), {
//  type: UserType.admin,
//});
