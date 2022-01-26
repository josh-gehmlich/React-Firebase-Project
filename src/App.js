import React from "react";
import "./App.css";

import { useAuthState } from "react-firebase-hooks/auth";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import Home from "./home/home";
import db from "./firebase";

const auth = getAuth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user && (
        <header style={{ marginTop: 80 }}>
          <SignOut />
        </header>
      )}

      <section>{user ? <HomeView /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      window.localStorage.setItem("email", user.email);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      console.log(docs);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <button onClick={signInWithGoogle} style={{ marginTop: 100 }}>
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return auth.currentUser && <button onClick={logOut}>Sign Out</button>;
}

const logOut = () => {
  window.localStorage.clear();
  auth.signOut();
};

function HomeView({ comments }) {
  return <Home comments={comments} />;
}

export default App;
