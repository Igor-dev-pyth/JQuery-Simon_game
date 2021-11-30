var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var isStarted = false;
var level = "0";

$(document).keydown(function() {
  if (!isStarted) {       //if isStarted (! false = true), а потом !false = true
    $("#level-title").text("Level " + level);
    nextSequence();
    isStarted = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = this.id;
  // $(this).attr("id")
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4)
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeToggle(100).fadeToggle(100);
  playSound(randomChosenColor);
}
// $(document).click(function() {NextSequence()});
// setInterval(nextSequence, 800);
// сначала кликнуть куда-нибудь = провзаимодействовать с окном

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  };
}

function startOver() {
  level = "0";
  gamePattern = [];
  isStarted = false;
}
