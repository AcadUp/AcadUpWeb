import './firebase_config.js';
// console.log(process.env.password)
let arrID = [];
// var config = {
// 	apiKey: "AIzaSyDSxh_LxDGIjIiPuynem26dlW-gBWdyMVI",
// 	authDomain: "form-a734e.firebaseapp.com",
// 	projectId: "form-a734e",
// 	storageBucket: "form-a734e.appspot.com",
// 	messagingSenderId: "338917384144",
// 	appId: "1:338917384144:web:ce462c62e5ab6acdbfa3d5"
// };
// 	firebase.initializeApp(config);
	// const database = firebase.database();
	const database = firebase.firestore();
	// console.log(database.collection('mcqs').get());

	// database.collection('mcqs').get().then(async(querySnapshot) => {

	// 	//querySnapshot is "iteratable" itself
	// 	await querySnapshot.forEach((userDoc) => {
	
	// 		//userDoc contains all metadata of Firestore object, such as reference and id
	// 		arrID.push(userDoc.id);
	// 		console.log(userDoc.id);
	// 		//If you want to get doc data
	// 		// var userDocData = userDoc.data()
	// 		// console.dir(userDocData)
	
	// 	})
	// 	console.log(arrID);

	// })
	


var currentQuestion = 0;
var tot_marks = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
	var c=180;
	var t;

	

$(document).ready(function () 
{
	console.log(window.location.href.split('/'))
	console.log(window.location.href.split('/')[4])
	// var name = "<%= data %>";
	// console.log('dsuiayhafdsioyasdffasdygoiu',name)
    // Display the first question
    // $( "#startButton" ).click(function(){
	
	// setTimeout(()=>{

		database.collection('mcqs').get().then(async(querySnapshot) => {

			//querySnapshot is "iteratable" itself
			await querySnapshot.forEach((userDoc) => {
		
				//userDoc contains all metadata of Firestore object, such as reference and id
				arrID.push(userDoc.id);
				console.log(userDoc.id);
				//If you want to get doc data
				// var userDocData = userDoc.data()
				// console.dir(userDocData)
		
			})
			console.log(arrID);
	
			
	var values = arrID;
	$( "#loading" ).css('display', 'none');
	$( "#startButton" ).css('display', 'flex');
	if ($('#instructionsCheck').is(":checked"))
	{
		console.log('checked')
		$( "#startButton" ).prop('disabled', false);
		$("#startButton").removeClass("unticked");
	// it is checked
	}
	else{
		console.log('not checked')
		$( "#startButton" ).prop('disabled', true);
		$("#startButton").addClass("unticked");


	}
	$('#instructionsCheck').change(()=>{
		if ($('#instructionsCheck').is(":checked"))
		{
			console.log('checked')
			$( "#startButton" ).prop('disabled', false);
			$("#startButton").removeClass("unticked");
		// it is checked
		}
		else{
			console.log('not checked')
			$( "#startButton" ).prop('disabled', true);
			$("#startButton").addClass("unticked");

	
		}
	})

	// $('#container')
	// .append(
	// 	$(document.createElement('label')).prop({
	// 		for: 'course'
	// 	}).html('Choose your course: ')
	// )
	// .append(
	// 	$(document.createElement('select')).prop({
	// 		id: 'course',
	// 		name: 'course'
	// 	})
	// )
	// // $("#course").addClass("theme-construction");
	// for (const val of values) {
	// 	$('#course').append($(document.createElement('option')).prop({
	// 		value: val,
	// 		// text: val.charAt(0).toUpperCase() + val.slice(1)
	// 		text: val
	// 	}))
	// }
	$('#container')
	.append(
		$(document.createElement('label')).prop({
			for: 'course'
		}).html(`Selected course: ${window.location.href.split('/')[4]}`)
	)
	// $('#container').text(window.location.href.split('/')[4])
// },5000);	
})
    var that = this;   
	var questionclone = [] 
    $(this).find("#startButton").on("click", function () 
    {
		// console.log($('#course :selected').text());

		// var cn = $('#course :selected').text()
		// $( "#instructions" ).css('display', 'none');
		var cn = window.location.href.split('/')[4]

		database.collection('mcqs').doc(cn).get().then(async(doc) => {

		
			const obj = await doc.data();
		
			console.log(obj);
			for (const [key, value] of Object.entries(obj)) {
				// var choicearr = []
				var arrobj = new Object();
				console.log(key);
				// console.log(value['option1']);
				arrobj.question = key;
				arrobj.choices = [];
				arrobj.choices.push(value['option1']);
				arrobj.choices.push(value['option2']);
				arrobj.choices.push(value['option3']);
				arrobj.choices.push(value['option4']);
				
				

				arrobj.choices.forEach(function(val,index){
					console.log(arrobj.choices);
					// console.log(val,index);
					if(val===value['correct_ans']){
						console.log(val,index);
						arrobj.correctAnswer = index;
						// return index
						return
					}
				})
				// arrobj.correctAnswer = ca;
				arrobj.mark = value['mark'];
				tot_marks+=value['mark'];
				questionclone.push(arrobj);
			}
			console.log(questionclone);
			console.log('jsagjysdafgvbjusdabgsdauiugb',questionclone.length);
	
		})
        setTimeout(()=>{
       
 
    $( "#startButton" ).hide();
	$( "#container" ).hide();
	$( "#instructions" ).hide();
    // $( "#preID" ).show();
    // $( "#nextID" ).show();
	$( "#preID" ).css('display', 'block');
	$( "#nextID" ).css('display', 'block');
     

    displayCurrentQuestion(questionclone);
    $(that).find(".quizMessage").hide();
    $(that).find(".preButton").attr('disabled', 'disabled');
	
	timedCount(questionclone);
	
	$(that).find(".preButton").on("click", function () 
	{		
		console.log("in");
        if (!quizOver) 
		{
			var val = $("input[type='radio']:checked").val();
			if(currentQuestion == 0) { return false; }
	
			if(currentQuestion == 1) {
			  $(".preButton").attr('disabled', 'disabled');
			}
			if(val){
				console.log('PREV VAL',val)
			iSelectedAnswer[currentQuestion] = val;
			}
			currentQuestion--; // Since we have already displayed the first question on DOM ready
				if(currentQuestion !== questionclone.length-1){	
					$(document).find(".nextButton").text("Next Question");
					$('.nextButton').prop("disabled", false);
				}
				if (currentQuestion < questionclone.length) 
				{
					displayCurrentQuestion(questionclone);
					
				} 					
		} else {
			if(viewingAns == 3) { return false; }
			currentQuestion = 0; viewingAns = 3;
			viewResults(questionclone);		
		}
    });
    

	
	// On clicking next, display the next question
    $(that).find(".nextButton").on("click", function () 
	{
        if (!quizOver) 
		{
			
            var val = $("input[type='radio']:checked").val();

            if (val == undefined && currentQuestion == questionclone.length-1) 
			{
				// $('.nextButton').prop("disabled", true);
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } 
			else 
			{
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();
				if (val == questionclone[currentQuestion].correctAnswer) 
				{
					// correctAnswers++;
					correctAnswers+= questionclone[currentQuestion].mark;
				}
				if(val){
				console.log('NEXT VAL',val)
				iSelectedAnswer[currentQuestion] = val;
				}
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				if(currentQuestion >= 1) {
					  $('.preButton').prop("disabled", false);
				}
				if(currentQuestion == questionclone.length-1){
					$(document).find(".nextButton").text("Submit?");
					// var value = $("input[type='radio']:checked").val();
					// if(value){
					// 	console.log('NEXT VAL',value)
					// 	iSelectedAnswer[currentQuestion] = value;
					// 	}
					console.log(iSelectedAnswer)
					var data = iSelectedAnswer.filter(function( element ) {
						return element !== undefined;
					 });
					 console.log(data)
					console.log(data.length)
					console.log(questionclone.length)
					if(data.length < questionclone.length-1)
					{
						$('.nextButton').prop("disabled", true);
					}
					else{
						$('.nextButton').prop("disabled", false);
					}
				}
				// else{
				// 	$(document).find(".nextButton").text("Next Question");
				// 	$('.nextButton').prop("disabled", false);
				// }
				if (currentQuestion < questionclone.length) 
				{
					displayCurrentQuestion(questionclone);
					
				} 
				else 
				{
					displayScore(questionclone);
					$('#iTimeShow').html('Quiz Time Completed!');
					// $('#timer').html("You scored: " + correctAnswers + " out of: " + questionclone.length);
					$('#timer').html("You scored: " + correctAnswers + " out of: " + tot_marks);
					c=185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Try Again?");
					quizOver = true;
					return false;
					
				}
			}
					
		}	
		else 
		{ // quiz is over and clicked the next button (which now displays 'Play Again?'
			// var value = $("input[type='radio']:checked").val();
			// if(value){
				console.log('NEXT VAL',val)
				iSelectedAnswer[currentQuestion] = val;
				quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
				$(document).find(".nextButton").text("Next Question");
				$(document).find(".preButton").text("Previous Question");
				 $(".preButton").attr('disabled', 'disabled');
				resetQuiz();
				viewingAns = 1;
				displayCurrentQuestion(questionclone);
				hideScore();
				// }
				// else{
				// 	alert('Select the last option!')
				// }

		}
    });
},1300);

});
});



function timedCount(qnarr)
	{
		if(c == 185) 
		{ 
			return false; 
		}
		
		var hours = parseInt( c / 3600 ) % 24;
		var minutes = parseInt( c / 60 ) % 60;
		var seconds = c % 60;
		var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
		$('#timer').html(result);
		
		if(c == 0 )
		{
					displayScore(qnarr);
					$('#iTimeShow').html('Quiz Time Completed!');
					// $('#timer').html("You scored: " + correctAnswers + " out of: " + qnarr.length);
					$('#timer').html("You scored: " + correctAnswers + " out of: " + tot_marks);
					c=185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Try Again?");
					quizOver = true;
					return false;
					
		}
		
		/*if(c == 0 )
		{	
			if (!quizOver) 
			{
				var val = $("input[type='radio']:checked").val();
            	if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					c=15;
				} 
				else 
				{
					displayScore();
					$('#timer').html('');
					c=16;
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;
				}
			}
			else 
			{ // quiz is over and clicked the next button (which now displays 'Play Again?'
				quizOver = false;
				$(document).find(".nextButton").text("Next Question");
				resetQuiz();
				displayCurrentQuestion();
				hideScore();
			}		
		}	*/
		c = c - 1;
		t = setTimeout(function()
		{
			timedCount(qnarr)
		},1000);
	}
	
	
// This displays the current question AND the choices
function displayCurrentQuestion(qnarr) 
{

	if(c == 185) { c = 180; timedCount(); }
    //console.log("In display current Question");
	console.log(qnarr);
    var question = qnarr[currentQuestion].question;
	var mark = qnarr[currentQuestion].mark;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = qnarr[currentQuestion].choices.length;
    // Set the questionClass text to the current question
	console.log(qnarr[currentQuestion]);
    $(questionClass).text(question);
	$('#marks').text('Marks: '+mark);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
    for (let i = 0; i < numChoices; i++) 
	{
        choice = qnarr[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		} else {
			$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		}
    }
}

async function resetQuiz()
{	var data = {};
	var course_name = window.location.href.split('/')[4];
	data['markString']="You scored: " + correctAnswers + " out of: " + tot_marks;
	data['courseName']=course_name;
	console.log('sddsjosidjuo',data);
	// var formBody = [];
	// for (var property in data) {
	// var encodedKey = encodeURIComponent(property);
	// var encodedValue = encodeURIComponent(details[property]);
	// formBody.push(encodedKey + "=" + encodedValue);
	// }
	// formBody = formBody.join("&");
	currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
	await firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log('in authentication');
			console.log(user.email);
			data['mymail']=user.email;
		} else {
			data['mymail']="vinit.mundra@somaiya.edu"
			console.log('not signed in');
		  // No user is signed in.
		}
	  });
	fetch('http://localhost:5000/trial', {
	method: 'POST', // or 'PUT'
	headers: {
		'Content-Type': 'application/json',
		// 'Content-Type': 'application/x-www-form-urlencoded',
		'Accept': 'application/json'
	},
	body: JSON.stringify(data),
	})
	.then(response => (response.ok)?console.log('ssss'):console.log("problem"))
	// .then(data => {
	// console.log('Success:', data);
	// })
	.catch((error)=>{
		console.log('sds'+error);
	})

	console.log('end');
	// location.reload();
}

function displayScore(qnarr)
{
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + tot_marks);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() 
{
    $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults(qnarr) 
{

	if(currentQuestion == qnarr.length) { currentQuestion = 0;return false; }
	if(viewingAns == 1) { return false; }

	hideScore();
	console.log(currentQuestion);
    var question = qnarr[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = qnarr[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
	for (let i = 0; i < numChoices; i++) 
	{
        choice = qnarr[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			if(qnarr[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		} else {
			if(qnarr[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		}
    }
	
	currentQuestion++;
	
	setTimeout(function()
		{
			viewResults(qnarr);
		},3000);
}
