function Play() {
	Start();
  document.getElementById("play").style.display = "none";
  document.getElementById("demo").style.display = "none";
  document.getElementById("pause").style.display = "inline";
  document.getElementById("replay").style.display = "inline";
  document.getElementById("right").style.display = "inline";
  document.getElementById("score").style.display = "inline";
  document.getElementById("level").style.display = "inline";
}

function Pause() {
  clearInterval(Area.interval);
  document.getElementById("play").style.display = "inline";
  document.getElementById("pause").style.display = "none";
}

function GameOver() {
	clearInterval(Area.interval);
  document.getElementById("pause").style.display = "none";
  document.getElementById("play").style.display = "none";
	document.getElementById("replay").style.display = "inline";
  document.getElementById("right").style.display = "none";
  document.getElementById("gameover").style.display = "inline";
}
