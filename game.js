
buttonColours=["red", "blue", "green", "yellow"];
gamePattern=[];
userClickedPattern=[];
var level=1;

var started=false;
$(document).on("keydown", function(){
if(started==false){
    nextSequence();
started=true;
}   
})

// nextSequence();


$(".btn").on("click", function(event){
    var userChosenColour=event.target.id;
    // console.log(event.target.id);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    // console.log(userClickedPattern);
    if(level===(userClickedPattern.length+1)){
    checkAnswer();
    }
    
})

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 
    // console.log(gamePattern);
    $("h1").text("Level "+level);    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
    level++;
}

function playSound(soundFile){
    var audio = new Audio("./sounds/"+soundFile+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $(".btn").removeClass("pressed");
    }, 100);
}

function checkAnswer(){
    if (JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern)){
        // console.log("sucess");
        setTimeout(nextSequence, 1000);
        userClickedPattern=[];
    }
    else{
        $("h1").text( "Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        // console.log("failure");
        startOver();
    }
}

function startOver(){
    userClickedPattern=[];
    level=1;
    gamePattern=[];
    started=false;
}