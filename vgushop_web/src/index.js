import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot, getDoc, doc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAZG0B_TR_TMrzoKLdnMsNkzoon9GxK_fY",
    authDomain: "testv1-7e5fa.firebaseapp.com",
    databaseURL: "https://testv1-7e5fa-default-rtdb.firebaseio.com",
    projectId: "testv1-7e5fa",
    storageBucket: "testv1-7e5fa.appspot.com",
    messagingSenderId: "294616967068",
    appId: "1:294616967068:web:f0989eda0d9706f39c4a59"
  }


//init firebase app
  initializeApp(firebaseConfig)

//init services
const db = getFirestore()


//collection ref
const colRef = collection(db, 'products')


//get collection data

onSnapshot(colRef, (snapshot) => {
    let products = []
    snapshot.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id })
    })
    console.log(products)
})


/*------------------------------------------------------------------------------------------------------------------------------------*/
//get specific data
class Product {
    constructor (productTitle, productPrice, productDescription ) {
        this.productTitle = productTitle;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
    }
    toString() {
        return this.productTitle + ', ' + this.productPrice + ', ' + this.productDescription;
    }
}

// Firestore data converter
const productConverter = {
    toFirestore: (product) => {
        return {
            productTitle: product.productTitle,
            productPrice: product.productPrice,
            productDescription: product.productDescription
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Product(data.productTitle, data.productPrice, data.productDescription);
    }
};

const documentid = "08302bfd-399c-4871-bdfe-50e7d70c674e"; //documentid come with the specific price tag
const ref = doc(db, "products", documentid).withConverter(productConverter);
const docSnap = await getDoc(ref);
if (docSnap.exists()) {
  // Convert to Product object
  const product = docSnap.data();
  // Use a Product instance method
  console.log(product.toString());
} else {
  console.log("No such document!");
}

/*------------------------------------------------------------------------------------------------------------------------------------*/
// const docRef = doc(db, "products", "08302bfd-399c-4871-bdfe-50e7d70c674e");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }
