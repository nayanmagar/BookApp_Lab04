import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDU4zz__uD6PLhnRaPn5xofdrO6yT5Vah0",
    authDomain: "advwebdev-dbf13.firebaseapp.com",
    databaseURL: "https://advwebdev-dbf13-default-rtdb.firebaseio.com",
    projectId: "advwebdev-dbf13",
    storageBucket: "advwebdev-dbf13.appspot.com",
    messagingSenderId: "625348954341",
    appId: "1:625348954341:web:b99a86e6b040135872ec0c",
    measurementId: "G-F6LLJ4L3F6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);