
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];


function playSound(name){
    $(".btn").click(function(){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
    });
}

function animatePress(currentColour){
    $("#" + currentColour).click(function(){
        $("#"+currentColour).addClass("pressed")
        setTimeout(function(){
            $("#"+currentColour).removeClass("pressed")
        },100);
    })
}

var started = 0;
var level = 0;


$(document).keydown(function(){
    if(started === 0){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = 1;
    }
});



function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3")
    audio.play();    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var indexofLastColour = userClickedPattern.length - 1
    checkAnswer(indexofLastColour);
});

function startOver(){
    level = 0;
    started = 0;
    gamePattern = [];
}



