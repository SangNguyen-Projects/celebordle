var maxHeight = 100;

const arr = ['Ariana Grande','Arnold Schwarzenegger','Ben Affleck','Benedict Cumberbatch',
'Brad Pitt','Bruce Willis','Chadwick Boseman','Chris Evans',
'Chris Hemsworth','Denzel Washington','Drake',
'Dwayne Johnson','Ellen DeGeneres',
'Emma Watson','Harrison Ford','Jennifer Aniston','Jennifer Lawrence','Jim Carrey','Johnny Depp', 
'Justin Bieber','Kevin Hart','Kobe Bryant','Mark Wahlberg',
'Megan Fox','Oprah Winfrey','Paul Rudd','Robert Downey Jr','Scarlett Johansson','Tom Cruise',
'Tom Hanks','Tom Holland',
'Vin Diesel','Will Smith'];

var initialRandomInt = Math.floor(Math.random() * arr.length);

var celebrityCapitalized = arr[initialRandomInt];
var checkCelebrity = celebrityCapitalized.toLowerCase();

var alreadyGuessed = [];

var wonOrLost = false;

var score = 0;

function firstImage(){
	var img = "<img id = 'image' src = 'images/";
	img += checkCelebrity;
	img += ".jpg' alt = ''/>"
	document.write(img);
}

function checkInput() {
	if(wonOrLost){
		return;
	}
	var x = document.getElementById('firstLine').value.toLowerCase();
	if(x.trim().length == 0 || !validCelebrity(x)){
		document.getElementById('warning').style.opacity = "1";
		document.getElementById('overlapText').style.opacity = "0";
	}else if(x != checkCelebrity){
		document.getElementById('warning').style.opacity = "0";
		if(!hasAlreadyGuessed(x)){
			maxHeight += 50;
			if(maxHeight <= 400){
				document.getElementById('image').style.maxHeight = maxHeight + "px";
				var obj = document.getElementById("scoreNumber");
				if(score < 100){
					animateValue(obj, score, 0, 3000);
				}else{
					var oldScore = score;
					score -= 100;
					animateValue(obj, oldScore, score, 3000);
				}
			}else{
				wonOrLost = true;
				var popup = document.getElementById("myPopup");
				popup.innerHTML = "WRONG! The celebrity is " + celebrityCapitalized;
				popup.style.backgroundColor = "red";
				popup.classList.remove("correct");
				popup.classList.add("wrong");
  				popup.classList.toggle("show");
			}
			alreadyGuessed.push(x);
			document.getElementById('overlapText').style.opacity = "0";
		}else{
			document.getElementById('overlapText').style.opacity = "1";
		}
	} else{
		var obj = document.getElementById("scoreNumber");
		var oldScore = score;
		score += 1000;
		animateValue(obj, oldScore, score, 5000);

		document.getElementById('image').style.maxHeight = "400px";
		document.getElementById('warning').style.opacity = "0";
		document.getElementById('overlapText').style.opacity = "0";
		wonOrLost = true;
		
		var popup = document.getElementById("myPopup");
		popup.innerHTML = "CORRECT! The celebrity is " + celebrityCapitalized;
		popup.style.backgroundColor = "green";
		popup.classList.remove("wrong");
		popup.classList.add("correct");
  		popup.classList.toggle("show");
	}
}


function hasAlreadyGuessed(celebrity){
	for(let i = 0; i < alreadyGuessed.length; i++){
		if(celebrity == alreadyGuessed[i]){
			return true;
		}
	}
	return false;
}
function validCelebrity(celebrity){
	for(let i = 0; i < arr.length; i++){
		if(celebrity == arr[i].toLowerCase()){
			return true;
		}
	}
	return false;
}

function enterKey(event){
	if(event.key === "Enter"){
		event.preventDefault();
		checkInput();
	}
}

function preventDefault(event){
	if(event.key === "Enter"){
		event.preventDefault();
	}
}


function celebrityOptions(){
	for(let i = 0; i < arr.length; i++){
		var option = "<option value = '";
		option += arr[i];
		option += "'>";
		document.write(option);
	}
}

function changeCelebrity() {
	document.getElementById('firstLine').value = "";
	if(!wonOrLost){
		var obj = document.getElementById("scoreNumber");
		if(score < 200){
			animateValue(obj, score, 0, 3000);
		}else{
			var oldScore = score;
			score -= 200;
			animateValue(obj, oldScore, score, 3000);
		}
	}
	var randomInt = Math.floor(Math.random() * arr.length);
	celebrityCapitalized = arr[randomInt];
	checkCelebrity = celebrityCapitalized.toLowerCase();

	document.getElementById('image').src = "images/" + checkCelebrity + ".jpg";
	

	maxHeight = 100;
	document.getElementById('image').style.maxHeight = "100px";
	document.getElementById('overlapText').style.opacity = "0";
	document.getElementById('warning').style.opacity = "0";
	alreadyGuessed = [];
	wonOrLost = false;
	var popup = document.getElementById("myPopup");
	popup.classList.remove("show");
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

