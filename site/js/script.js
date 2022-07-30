var maxHeight = 150;

const arr = ['dwayne johnson', 'justin bieber', 'robert downey jr'];
var initialRandomInt = Math.floor(Math.random() * arr.length);

var checkCelebrity = arr[initialRandomInt];

function firstImage(){
	var img = "<img id = 'image1' src = 'images/";
	img += checkCelebrity;
	img += ".jpg' alt = ''/>"
	document.write(img);
}
function input() {
	var x = document.getElementById('firstLine').value.toLowerCase();
	if(x != checkCelebrity){
		maxHeight += 100;
		if(maxHeight <= 550){
			document.getElementById('image1').style.maxHeight = maxHeight + "px";
		}
	}else{
		var celebrityCapitalized = checkCelebrity.charAt(0).toUpperCase();
		for(let i = 1; i < checkCelebrity.length; i++){
			if(checkCelebrity.charAt(i-1) == " "){
				celebrityCapitalized += checkCelebrity.charAt(i).toUpperCase();
			}else{
				celebrityCapitalized += checkCelebrity.charAt(i);
			}
		}
		document.getElementById('image1').style.maxHeight = "550px";
		alert("Correct! The celebrity is " + celebrityCapitalized);
	}
}

function changeCelebrity() {
	var randomInt = Math.floor(Math.random() * arr.length);
	var newCelebrity = arr[randomInt];

	document.getElementById('image1').src = "images/" + newCelebrity + ".jpg";
	checkCelebrity = newCelebrity

	maxHeight = 150;
	document.getElementById('image1').style.maxHeight = "150px";
}