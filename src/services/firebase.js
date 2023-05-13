import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkSIkm_ogPBFq4lBNOEwlIFZdnW5LEFng",
  authDomain: "kinetix-e592a.firebaseapp.com",
  projectId: "kinetix-e592a",
  storageBucket: "kinetix-e592a.appspot.com",
  messagingSenderId: "609126289666",
  appId: "1:609126289666:web:cefbec324536497addf21b",
  measurementId: "G-ETWH3J4CYP"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function generateMediaURL(path) {
  return getDownloadURL(ref(storage, path));
}