"use client";

import { useContext } from "react";
import { AuthContext } from "@/lib/authcontext";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import ChatRoom from "./ChatRoom";

const AuthForm = () => {
  const user = useContext(AuthContext);

  const signInWithgoogle = async () => {
    const provider = new GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const signOutAccount = async () => {
    await signOut(auth);
  };

  return (
    <>
      {!user ? (
        <>
          <h1> Sign In</h1>
          <button onClick={signInWithgoogle}>Sign In With Google</button>
        </>
      ) : (
        <ChatRoom user={user} signOutAccount={signOutAccount} />
      )}
    </>
  );
};

export default AuthForm;
