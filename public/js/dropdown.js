import './firebase_config.js';

let arrID = [];

const database = firebase.firestore();

$(document).ready(function () 
{

database.collection('mcqs').get().then(async(querySnapshot) => {
    await querySnapshot.forEach((userDoc) => {
        arrID.push(userDoc.id);
        console.log(userDoc.id);
    })
    console.log(arrID);

    
var values = arrID;

$('#container')
.append(
    $(document.createElement('label')).prop({
        for: 'course'
    }).html('Choose your course: ')
)
.append(
    $(document.createElement('select')).prop({
        id: 'course',
        name: 'course'
    })
)
// $("#course").addClass("theme-construction");
for (const val of values) {
    $('#course').append($(document.createElement('option')).prop({
        value: val,
        // text: val.charAt(0).toUpperCase() + val.slice(1)
        text: val
    }))
}
// },5000);	
})

$( "#submit" ).click(function() {
    // export var x = $('#dropDownId :selected').text();
    var x = $('#container :selected').text();
    console.log(x)
    window.location.assign(`/quiz/${x}`)
    // alert( "Handler for .click() called." );
  });

})