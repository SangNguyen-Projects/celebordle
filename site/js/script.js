var maxHeight = 100;

const arr = ['chris evans', 'dwayne johnson', 'justin bieber', 'robert downey jr', 
'tom holland'];
var initialRandomInt = Math.floor(Math.random() * arr.length);

var checkCelebrity = arr[initialRandomInt];


function firstImage(){
	var img = "<img id = 'image1' src = 'images/";
	img += checkCelebrity;
	img += ".jpg' alt = ''/>"
	document.write(img);
}

function checkInput() {
	var x = document.getElementById('firstLine').value.toLowerCase();
	if(x.trim().length == 0 || !validCelebrity(x)){
		document.getElementById('warning').style.opacity = "1";
	}else if(x != checkCelebrity){
		document.getElementById('warning').style.opacity = "0";
		maxHeight += 50;
		if(maxHeight <= 400){
			document.getElementById('image1').style.maxHeight = maxHeight + "px";
		}
	} else{
		document.getElementById('image1').style.maxHeight = "400px";
		document.getElementById('warning').style.opacity = "0";
		alert("Correct! The celebrity is " + capitalize(checkCelebrity));
	}
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
	var randomInt = Math.floor(Math.random() * arr.length);
	var newCelebrity = arr[randomInt];

	document.getElementById('image1').src = "images/" + newCelebrity + ".jpg";
	checkCelebrity = newCelebrity

	maxHeight = 100;
	document.getElementById('image1').style.maxHeight = "100px";
}