var maxHeight = 100;

const arr = ['Ariana Grande','Arnold Schwarzenegger','Ben Affleck','Brad Pitt','Bruce Willis','Chris Evans',
'Chris Hemsworth','Denzel Washington','Drake',
'Dwayne Johnson','Emma Watson','Harrison Ford','Jennifer Aniston','Jennifer Lawrence','Jim Carrey','Johnny Depp', 
'Justin Bieber','Kevin Hart','Mark Wahlberg',
'Megan Fox','Oprah Winfrey','Robert Downey Jr','Scarlett Johansson','Tom Cruise','Tom Hanks','Tom Holland',
'Vin Diesel','Will Smith'];

var initialRandomInt = Math.floor(Math.random() * arr.length);

var celebrityCapitalized = arr[initialRandomInt];
var checkCelebrity = celebrityCapitalized.toLowerCase();

var alreadyGuessed = [];

var wonOrLost = false;

var score = 0;

function firstImage(){
	var img = "<img id = 'image1' src = 'images/";
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
				document.getElementById('image1').style.maxHeight = maxHeight + "px";
			}else{
				wonOrLost = true;
				var obj = document.getElementById("scoreNumber");
				var oldScore = score;
				score -= 200;
				animateValue(obj, oldScore, score, 3000);
				alert("Wrong! The celebrity is " + celebrityCapitalized);
			}
			alreadyGuessed.push(x);
			document.getElementById('overlapText').style.opacity = "0";
		}else{
			document.getElementById('overlapText').style.opacity = "1";
		}
	} else{
		var obj = document.getElementById("scoreNumber");
		var oldScore = score;
		score += scoreIncrease(maxHeight);
		animateValue(obj, oldScore, score, 5000);

		document.getElementById('image1').style.maxHeight = "400px";
		document.getElementById('warning').style.opacity = "0";
		document.getElementById('overlapText').style.opacity = "0";
		wonOrLost = true;
		
		var popup = document.getElementById("myPopup");
		popup.innerHTML = "Correct! The celebrity is " + celebrityCapitalized;
  		popup.classList.toggle("show");
	}
}

function scoreIncrease(mHeight){
	var subtractBy = (mHeight - 100) / 50 * 100;
	return 1000 - subtractBy;
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
	if(!wonOrLost && score >= 200){
		var obj = document.getElementById("scoreNumber");
		var oldScore = score;
		score -= 200;
		animateValue(obj, oldScore, score, 3000);
	}
	var randomInt = Math.floor(Math.random() * arr.length);
	celebrityCapitalized = arr[randomInt];
	checkCelebrity = celebrityCapitalized.toLowerCase();

	document.getElementById('image1').src = "images/" + checkCelebrity + ".jpg";
	

	maxHeight = 100;
	document.getElementById('image1').style.maxHeight = "100px";
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