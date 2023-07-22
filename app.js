import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getAuth , createUserWithEmailAndPassword ,
   signInWithEmailAndPassword , onAuthStateChanged  } 
   from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

   import { getFirestore , doc, setDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyB31ox1ABc41g_BamAamxqpn2QGqZCJ27A",
  authDomain: "foodside-9bead.firebaseapp.com",
  databaseURL: "https://foodside-9bead-default-rtdb.firebaseio.com",
  projectId: "foodside-9bead",
  storageBucket: "foodside-9bead.appspot.com",
  messagingSenderId: "793400657115",
  appId: "1:793400657115:web:7e838cb1b89a37011878fe",
  measurementId: "G-FX1WHKFJCB"
};

const app = initializeApp(firebaseConfig);
console.log(app)
const db = getFirestore(app);

const auth = getAuth(app);




// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

const signBtn = document.getElementById('signIn_Btn')

signBtn.addEventListener('click' , createUserWithEP)




function createUserWithEP(){
  const fullName = document.getElementById('na')
const email = document.getElementById('em')
const password = document.getElementById('pass')

createUserWithEmailAndPassword(auth, email.value, password.value)
  .then( async (userCredential) => {
    // Signed in   
    const user = userCredential.user;
    console.log(user.uid)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
}

const addDateInFireStore = async ()=>{

  const input=document.getElementById("todoInput")

    // Signed in   
      
   
       const reference = doc(db, "Todos", auth.currentUser.uid)
   
       console.log(reference)
   
       await setDoc(reference, {
         value : input.value,
   
  
  })
 

    // ...
  }
 
  


const todoDiv = document.getElementById('todo_div')
const signIndiv = document.getElementById('main')

onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    todoDiv.style.display = 'block';
    signIndiv.style.display = 'none' ; 

  } else {
    console.log('User Majood Nhi Hn')
  }
});



const addTodoBtn = document.getElementById('AddTodo_btn')
const delTodoBtn = document.getElementById('DelTodo_btn')
const dete = new Date()

addTodoBtn.addEventListener('click' ,addTodo )

function addTodo(){
  const input=document.getElementById("todoInput")

  const itemDiv = document.getElementById('ulParent')
     const list = `<li>

     <input type="text" value ="${input.value}"/>
     ${dete.toLocaleString()}
     <button>Delete</button>
     <button>Edit</button>

     </li>`

     itemDiv.innerHTML += list

     addDateInFireStore()

     document.getElementById("todoInput").value = ''
   
}