import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCNnuRYlRguDsrS41mfDH3TjfhGA0h_bwY",
    authDomain: "crwn-db-12bac.firebaseapp.com",
    projectId: "crwn-db-12bac",
    storageBucket: "crwn-db-12bac.appspot.com",
    messagingSenderId: "631051181334",
    appId: "1:631051181334:web:20a63d1e16e81e77f80437",
    measurementId: "G-WC8VQ61YMV"
};

export const createUserProfileDocument =  async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;