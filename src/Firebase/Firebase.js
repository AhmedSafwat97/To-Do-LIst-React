
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyB9o-5_hwxXdt7hibd-3vAfFyrtdPO7ljc",
    authDomain: "sign-up-398c8.firebaseapp.com",
    projectId: "sign-up-398c8",
    storageBucket: "sign-up-398c8.appspot.com",
    messagingSenderId: "252992845196",
    appId: "1:252992845196:web:2e0229cb3b723b22f212a9",
    measurementId: "G-P59VVCF6KS"
}

    const app = initializeApp(firebaseConfig);

    export const auth = getAuth(app);