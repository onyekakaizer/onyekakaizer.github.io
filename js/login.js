  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, orderByChild,equalTo } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

  const logintype = document.getElementById("logintype");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const authButtonElememt = document.getElementById("auth_button");
  
  
  authButtonElememt.addEventListener("click", function(){

  	let getEmail = email.value;
  	let getPassword = password.value;
    let getLogintype = logintype.value;


    if(getLogintype == '' || getEmail == '' || getPassword == ''){

       		alert("Please complete any blank field!");

     		}

    else{

      var loginkey = md5(getEmail+getPassword);

      const que = query(ref(db,getLogintype),orderByChild('loginkey'),equalTo(loginkey));

      // console.log(que);

      get(que).then((snapshot) => {
        if (snapshot.exists()) {

          snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();
            var firstname = childSnapshot.val().firstname;
            var lastname = childSnapshot.val().lastname;
            var email = childSnapshot.val().email;

            console.log(lastname);

            if(getLogintype == "students"){

              sessionStorage.setItem("key", loginkey);
              //sessionStorage.setItem("u_level", u_level);

              window.open('studentcp.html?firstname='+firstname+'&lastname='+lastname+'&email='+email, "_self");

              //window.open("studentcp.html", "_self");

            }
            else if(getLogintype == "staff"){

              sessionStorage.setItem("key", loginkey);
              sessionStorage.setItem("u_level", u_level);

              window.open("staffcp.html", "_self");

            }

            

        });

        //console.log(snapshot.val().name);
        } else {
          alert("Error: Invalid Login Details");
        }
      }).catch((error) => {
        console.error(error);
      });

  }
	
							
}
);