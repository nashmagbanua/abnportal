import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0-PNkHDcLW356892joz-8KDVYRXQbShg",
  authDomain: "abnportal-fb070.firebaseapp.com",
  projectId: "abnportal-fb070",
  storageBucket: "abnportal-fb070.appspot.com",
  messagingSenderId: "124537892733",
  appId: "1:124537892733:web:82725bb557f8521348a614"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addChemicalToFirebase = async () => {
  const chemicalName = document.getElementById("chemical-name").value;
  const chemicalQuantity = parseFloat(document.getElementById("chemical-quantity").value);
  const chemicalUnit = document.getElementById("chemical-unit").value;
  const operatorName = document.getElementById("operator-name").value;

  const convertedQuantity = chemicalUnit === "CBY" ? chemicalQuantity * 25 : chemicalQuantity;

  try {
    await addDoc(collection(db, "chemicals"), {
      name: chemicalName,
      quantity: convertedQuantity,
      originalQty: chemicalQuantity,
      unit: chemicalUnit,
      addedBy: operatorName,
      dateAdded: serverTimestamp()
    });

    alert("Chemical added successfully!");
  } catch (error) {
    console.error("Error adding chemical:", error);
    alert("Failed to add chemical. Check console.");
  }
};
window.addChemicalToFirebase = addChemicalToFirebase;
