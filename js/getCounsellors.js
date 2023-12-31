  
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
  

window.onload = getAppointments();


function getParameters(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const lastname = urlParams.get('lastname');
  const firstname = urlParams.get('firstname');
  const title = urlParams.get('title');
  const email = urlParams.get('email');

  document.getElementById("names").innerHTML = title +" "+lastname +" "+ firstname;
  //document.getElementById("u_email").innerHTML = 'Email : ' + u_email;
  //document.getElementById("u_phone").innerHTML = 'Phone : ' + u_phone;
  //document.getElementById("u_address").innerHTML = 'Address : ' + u_address;
  //alert(id);
  }

function getAppointments(){

  getParameters();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const appdate = urlParams.get('appdate');
  var sessregno= sessionStorage.getItem("regno");
  console.log(sessregno);


  

  // if(appdate == ""){
  //     console.log("Empty");
  //     alert("Error: Please Select a Date");
  //     window.open("javascript:history.back()", "_self");
  // }
  // else{

  //getParameters();
    var status = 1;
    let sSn = sessionStorage.getItem("sn");
    const que = query(ref(db,'appointments'));

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        var appointments = [];

        snapshot.forEach(function (childSnapshot) {

          childSnapshot.forEach(function (childSnapshot2) {

          if(childSnapshot2.val().counsellor_sn == sSn){
              appointments.push(childSnapshot2.val());
              console.log(childSnapshot2.val().regno);
          }

  
        });



      });

      getAppointmentsForDisplay(appointments);

      //console.log(snapshot.val().name);
      } else {
        alert("Error: No Appointment already added");
      }
    }).catch((error) => {
      console.error(error);
    });

            
}


function  getAppointmentsForDisplay(appointments){
  appointments.forEach(element => {

    sendToAppointListDisplay(element.sn, element.student,element.dates, element.time, element.status);

});
}


var appointlist = document.getElementById('appointlist');
//var bg_white = document.getElementById('bg_white');

function sendToAppointListDisplay(sn, student,dates, time, status){


    let messenger_bg_warningDiv = document.createElement('div');
    messenger_bg_warningDiv.classList.add ('messenger', 'bg-warning', 'shadow-sm', 'p-3', 'd-flex', 'align-items-center', 'rounded-1', 'mb-2');

    let icofont_support_mr_3italics = document.createElement('i');
    icofont_support_mr_3italics.classList.add ('icofont-support', 'mr-3', 'h5', 'mb-0', 'text-danger');

    messenger_bg_warningDiv.appendChild(icofont_support_mr_3italics);

    let mb_small_0P = document.createElement("p");
    mb_small_0P.classList.add ('small', 'mb-0');


    let timenode = document.createTextNode(dates+ " "+time);
    mb_small_0P.appendChild(timenode);

    let br = document.createElement("br");
    mb_small_0P.appendChild(br);


    let appointeenode = document.createTextNode("Scheduled By : "+student);
    mb_small_0P.appendChild(appointeenode);

    let br2 = document.createElement("br");
    mb_small_0P.appendChild(br2);

    let cancelbtn = document.createElement("button");
    cancelbtn.classList.add ('btn', 'btn-primary', 'btn-sm');
    cancelbtn.type = "button";
    cancelbtn.innerHTML = "Cancel Appointment";
    cancelbtn.onclick = function () {
      alert("Appointment Cancelled");
    };


    mb_small_0P.appendChild(cancelbtn);


    messenger_bg_warningDiv.appendChild(mb_small_0P);


    appointlist.appendChild(messenger_bg_warningDiv);



}





