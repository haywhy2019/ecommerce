import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyCCbhw490kw83Cp3MYD8K_ITYJxpNtSHvI",
    authDomain: "ecom-db-ef01d.firebaseapp.com",
    projectId: "ecom-db-ef01d",
    storageBucket: "ecom-db-ef01d.appspot.com",
    messagingSenderId: "1033913206575",
    appId: "1:1033913206575:web:94fe702916696b378243da",
    measurementId: "G-EZZ9J9PR7K"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
 
    if(!snapShot.exists) {
      const {displayName, email} = userAuth
      const createdAt = new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(e){
        console.log("error creating user", e.message)
      }
      
    }

    return userRef 
  }

  firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({promp: "select_account"})
export const signinWithGoogle = () => auth.signInWithPopup(provider)