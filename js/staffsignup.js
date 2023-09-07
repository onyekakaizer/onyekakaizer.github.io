  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, orderByChild,equalTo,serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA119qRhafASuNkPhozMqcrW1LmR6RNYm0",
    authDomain: "upload-image-bdd34.firebaseapp.com",
    projectId: "upload-image-bdd34",
    storageBucket: "upload-image-bdd34.appspot.com",
    messagingSenderId: "789533799147",
    appId: "1:789533799147:web:4e05b0d70b24737b1c84ae"
  };
  
  //var firebase = initializeApp(firebaseConfig);
  //console.log(firebase);

  const app = initializeApp(firebaseConfig);
  console.log(app);
  // Get a reference to the database service
  const db = getDatabase();


  function  writeStudentData(firstname,lastname,email,staffno,faculty,department,password) {
    console.log("queuuuuuuuuuuuuuuu");
        const dates = new Date();
        var dateToString = dates.toString()
        var uid = md5(dateToString);
        uid = uid.substr(0, 10);

        var loginkey = md5(email+password);
        //var stock_value = qtysupplied*supplyprice;

        const todayDate = () => {
          let d = new Date();
          //d.setDate(d.getDate() + 7);
          d.setDate(d.getDate());
          console.log(d);
          return d.toISOString().split('T')[0];
        };
        console.log(todayDate());
        todayDate(); // 2018-10-17 (if current date is 2018-10-18)


    set(ref(db, 'staff/' + staffno), {
        sn:uid,
        firstname:firstname,
        lastname:lastname,
        email:email,
        staffno:staffno,
        department:department,
        faculty:faculty,
        password:password,
        loginkey:loginkey,
        status:1
    }).then(()=>{
        alert("Counsellor Account Created Successfully");
        window.open('login.html', "_self");
    }).catch(()=>{
        alert("Error: Counsellor Not Successfully Added");
    });
  }

  var saveBtn  = document.getElementById("saveButton");


  saveBtn.addEventListener('click', ()=>{ 
    
  var firstname  = document.getElementById("firstname").value;
  var lastname  = document.getElementById("lastname").value;
  var email  = document.getElementById("email").value;
  var staffno  = document.getElementById("staffno").value;
  var faculty  = document.getElementById("faculty").value;
  var department  = document.getElementById("department").value;
  var password  = document.getElementById("password").value;
  var cpassword  = document.getElementById("cpassword").value;

  if(firstname == ""){
    alert("Error: Please Insert First Name");
  }
  else if(lastname == ""){
    alert("Error: Please Insert Last Name");
  }
  else if(email == ""){
    alert("Error: Please Insert Email Address");
  }
  else if(staffno == ""){
    alert("Error: Please Insert Reg Number");
  }
  else if(faculty == ""){
    alert("Error: Please Select Faculty");
  }
  else if(department == ""){
    alert("Error: Please Select Department");
  }
  else if(password == ""){
    alert("Error: Please Insert Password");
  }
  else if(cpassword == ""){
    alert("Error: Please Insert Confirm Password");
  }
  else{
    console.log("que");
    const que = query(ref(db,'staff'),orderByChild('staffno'),equalTo(staffno));

    // console.log(que);

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        alert("Error: Student's Already Exists In Record");

      //console.log(snapshot.val().name);
      } else {
        
        writeStudentData(firstname,lastname,email,staffno,faculty,department,password);
            
      }
    }).catch((error) => {
      console.error(error);
    });
 
  }

    

});
  



