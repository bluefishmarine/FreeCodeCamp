(function(){
  /****Variables*****/
  var minutesHTML =  document.querySelector("#minutes");
  var secondsHTML =  document.querySelector("#seconds");
  var sessionIncrease = document.querySelector("#s-increase");
  var sessionDecrease = document.querySelector("#s-decrease");
  var selectedTime = document.querySelector("#s-time");
  var breakTime = document.querySelector("#b-time");
  var breakIncrease = document.querySelector("#b-increase"); 
  var breakDecrease = document.querySelector("#b-decrease");
  var status = document.querySelector(".session strong");
  var warningScreen = document.querySelector(".final");
  var seconds = 0;
  var minutes = 25;
  var sessionLength = 25;
  var breakLength = 5;
  var intervalID;
  var activeModule = "";
  var opacity = 0;
  var sessionOn = false;
  var breakOn = false;
  var startActive;
  var start = document.querySelector(".btn-success");
  var end = document.querySelector(".btn-danger");
  var reset = document.querySelector(".btn-warning");
  
  /****Timer Main Function***/
function timer(){
  if (seconds===0&&minutes===0&&activeModule==="session"){ //Needs to switch to Break
    minutes = breakLength;
    status.innerText = "Break!";
    minutes<10 ? minutesHTML.innerText = "0"+ minutes : minutesHTML.innerText = minutes
    activeModule = "break";
    opacity=0;
    warning(opacity);
  }else
   if (seconds===0&&minutes===0&&activeModule==="break"){ //Needs to switch to Session
    opacity=0;
    warning(opacity);
    minutes = sessionLength;
    status.innerText = "Session"; 
    minutes<10 ? minutesHTML.innerText = "0"+ minutes : minutesHTML.innerText = minutes
    activeModule = "session";
  }else
    if(minutes===0&&seconds<=59){
      opacity+=.016;
      warning(opacity);
      seconds-=1;
      seconds<10 ? secondsHTML.innerText = "0" + seconds : secondsHTML.innerText = seconds;
    }else
  if(seconds===0){
    seconds = 59;
    secondsHTML.innerText = seconds;
    minutes-=1;
    minutes<10 ? minutesHTML.innerText = "0"+ minutes : minutesHTML.innerText = minutes 
  }else{
   seconds-=1;
   seconds<10 ? secondsHTML.innerText = "0" + seconds : secondsHTML.innerText = seconds;
  }  
}
  
 /****Button Functions*****/ 
function startTimer(){
if (startActive){
  return;
}
startActive = true;  
if (activeModule === "break"){
 activeModule = "break"; 
}  
if (!(activeModule === "session")){
  activeModule = "session";
}
intervalID = window.setInterval(timer,1000) 
} 

function endTimer(){
  startActive = false;
  clearInterval(intervalID);
}  

function resetTimer(){
  status.innerText = "Session";
  opacity = 0;
  warning(opacity);
  secondsHTML.innerText = "00";
  seconds = 0;
  minutesHTML.innerText = sessionLength;
  minutes = sessionLength;
  activeModule = "";
  endTimer();
}

/******Increase/Decrease Session Time******/  
function changeTimer(incrementer,timeLimit,maxorminTime){
  if (activeModule){
    return;
  }
  minutes+=incrementer;
  sessionLength+=incrementer;
  if (sessionLength===timeLimit){
    minutes = maxorminTime;
    sessionLength = maxorminTime;
  }
  selectedTime.innerText = sessionLength;
  minutes<10 ? minutesHTML.innerText = "0"+ sessionLength : minutesHTML.innerText =       sessionLength
}
  
/******Increase/Decrease Break Time******/
function changeBreak(incrementer,timeLimit,maxorminTime){
  if (activeModule){
    return;
  }
  breakLength+=incrementer;
  if (breakLength===timeLimit){
    breakLength = maxorminTime;
  }
  breakTime.innerText = breakLength;
}  

/******Warning Screen********/  
function warning(opacity){
  warningScreen.style.backgroundColor = `rgba(255,0,0,${opacity})`;
}  
  

/*****Button Activators******/  
start.addEventListener("click",startTimer);
end.addEventListener("click",endTimer); 
reset.addEventListener("click",resetTimer);
sessionIncrease.addEventListener("click",function(){
  changeTimer(1,61,1);
});
sessionDecrease.addEventListener("click",function(){
  changeTimer(-1,0,60);
});
breakIncrease.addEventListener("click",function(){
  changeBreak(1,61,1);
});
breakDecrease.addEventListener("click",function(){
  changeBreak(-1,0,60);
});


})();