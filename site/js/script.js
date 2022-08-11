var maxHeight = 100;

const arr = ['chris evans','drake', 'dwayne johnson','johnny depp', 'justin bieber', 'robert downey jr', 
'tom cruise','tom holland'];
var initialRandomInt = Math.floor(Math.random() * arr.length);

var checkCelebrity = arr[initialRandomInt];

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
				alert("Wrong! The celebrity is " + capitalize(checkCelebrity));
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
		
		alert("Correct! The celebrity is " + capitalize(checkCelebrity));
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
		if(celebrity == arr[i]){
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

function capitalize(name){
	var capitalized = name.charAt(0).toUpperCase();
	for(let i = 1; i < name.length; i++){
			if(name.charAt(i-1) == " "){
				capitalized += name.charAt(i).toUpperCase();
			}else{
				capitalized += name.charAt(i);
			}
		}
	return capitalized;
}

function celebrityOptions(){
	for(let i = 0; i < arr.length; i++){
		var option = "<option value = '";
		option += capitalize(arr[i]);
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
	var newCelebrity = arr[randomInt];

	document.getElementById('image1').src = "images/" + newCelebrity + ".jpg";
	checkCelebrity = newCelebrity

	maxHeight = 100;
	document.getElementById('image1').style.maxHeight = "100px";
	document.getElementById('overlapText').style.opacity = "0";
	document.getElementById('warning').style.opacity = "0";
	alreadyGuessed = [];
	wonOrLost = false;
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