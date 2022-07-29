var maxHeight = 200;

function input() {
	var x = document.getElementById('firstLine').value;
	if(x != "Justin Bieber" && x != "justin bieber"){
		maxHeight += 100;
		document.getElementById('image1').style.maxHeight = maxHeight + "px";
	}
}