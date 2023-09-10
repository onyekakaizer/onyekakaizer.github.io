  
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
  
  function getAllStaffers(){
    getParameters();
    getAppointments();
      var status = 1;
      const que = query(ref(db,'staff'),orderByChild('status'),equalTo(status));

      get(que).then((snapshot) => {
        if (snapshot.exists()) {

          var staffers = [];

          snapshot.forEach(function (childSnapshot) {

            staffers.push(childSnapshot.val());

        });

        addStaffersForDisplay(staffers);

        //console.log(snapshot.val().name);
        } else {
          alert("Error: No User already added");
        }
      }).catch((error) => {
        console.error(error);
      });
	
							
}

window.onload = getAllStaffers();

function  addStaffersForDisplay(staffers){
    staffers.forEach(element => {

    sendToDisplay(element.sn, element.department,element.email, element.faculty, 
        element.firstname, element.lastname, element.loginkey, element.password, element.staffno, element.status,element.title);

  });
}



function getParameters(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const lastname = urlParams.get('lastname');
    const firstname = urlParams.get('firstname');
    const email = urlParams.get('email');

    document.getElementById("names").innerHTML = lastname +" "+ firstname;
    //document.getElementById("u_email").innerHTML = 'Email : ' + u_email;
    //document.getElementById("u_phone").innerHTML = 'Phone : ' + u_phone;
    //document.getElementById("u_address").innerHTML = 'Address : ' + u_address;
    //alert(id);
    }


var staffers_div = document.getElementById('staffers_div');
//var bg_white = document.getElementById('bg_white');

var radioId = 1;

function sendToDisplay(sn, department,email, faculty, firstname, lastname, loginkey, 
    password, staffno, status,title){


        let text_darkA = document.createElement('a');
        text_darkA.classList.add ('text-dark');
        text_darkA.setAttribute("href", 'stud_councillorprofileview.html?sn='+sn+'&department='+department+'&email='+email+'&faculty='
               +faculty+'&firstname='+firstname+'&lastname='+lastname+'&staffno='+staffno+'&title='+title);

        let osahan_gift_card_item1Div = document.createElement('div');
        osahan_gift_card_item1Div.classList.add ('osahan-gift', 'card_item1', 'align-items-center', 'row', 'm-0', 'bg-white', 'shadow-sm', 'border-rad8', 'mb-3', 'align-items-center');


        let pl_3_py_3_py_3Div = document.createElement('div');
        pl_3_py_3_py_3Div.classList.add ('pl-3', 'py-3', 'py-3', 'd-flex', 'border-0');

        let img_fluid = document.createElement("img");
        img_fluid.src = "img/avatar.png";
        img_fluid.classList.add ('img-fluid', 'm-auto');

        pl_3_py_3_py_3Div.appendChild(img_fluid);


        let pl_3_py_3Div = document.createElement('div');
        pl_3_py_3Div.classList.add ('pl-3', 'py-3');

        
        let gift_cardDiv = document.createElement('div');
        gift_cardDiv.classList.add ('gift-card');

        let l_hght_18H6 = document.createElement('h6');
        l_hght_18H6.classList.add ('l-hght-18','pt-6');

        let h6_Text = document.createTextNode(firstname +" "+lastname);
        l_hght_18H6.appendChild(h6_Text);

        gift_cardDiv.appendChild(l_hght_18H6);


        let mt_2_pb_1Div = document.createElement('div');
        mt_2_pb_1Div.classList.add ('mt-2', 'pb-1');

        let small_mb_0P = document.createElement("p");
        small_mb_0P.classList.add ('small', 'mb-0', 'l-hght-10', 'text-warning', 'gift-code');


        let node = document.createTextNode("Book Appointment");
        small_mb_0P.appendChild(node);


        let icofont_ui_copyitalics = document.createElement('i');
        icofont_ui_copyitalics.classList.add ('icofont-ui-copy');


        small_mb_0P.appendChild(icofont_ui_copyitalics);

        mt_2_pb_1Div.appendChild(small_mb_0P);

        pl_3_py_3Div.appendChild(gift_cardDiv);
        pl_3_py_3Div.appendChild(mt_2_pb_1Div);



        osahan_gift_card_item1Div.appendChild(pl_3_py_3_py_3Div);
        osahan_gift_card_item1Div.appendChild(pl_3_py_3Div);



        text_darkA.appendChild(osahan_gift_card_item1Div);
        staffers_div.appendChild(text_darkA);


}




function getAppointments(){

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
    const que = query(ref(db,'appointments'));

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        var appointments = [];

        snapshot.forEach(function (childSnapshot) {

          childSnapshot.forEach(function (childSnapshot2) {

          if(childSnapshot2.val().regno == sessregno){
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

    sendToAppointListDisplay(element.sn, element.student,element.dates, element.time, element.assigned_counsellor, element.status);

});
}


var appointlist = document.getElementById('appointlist');
//var bg_white = document.getElementById('bg_white');

function sendToAppointListDisplay(sn, student,dates, time, assigned_counsellor, status){


    let messenger_bg_warningDiv = document.createElement('div');
    messenger_bg_warningDiv.classList.add ('messenger', 'bg-warning', 'shadow-sm', 'p-3', 'd-flex', 'align-items-center', 'rounded-1', 'mb-2');

    let icofont_support_mr_3italics = document.createElement('i');
    icofont_support_mr_3italics.classList.add ('icofont-support', 'mr-3', 'h5', 'mb-0', 'text-success');

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

    let counselenode = document.createTextNode("Councellor : "+assigned_counsellor);
    mb_small_0P.appendChild(counselenode);


    messenger_bg_warningDiv.appendChild(mb_small_0P);


    appointlist.appendChild(messenger_bg_warningDiv);



}





