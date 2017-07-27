var input = "";
var result = "";
var display = "";
var operator;
var operatorNotActive = true;
var equalsActive = false;
var decimalActive = false;


$("#clear").on("click",function(){
    clearInput();
})

$("#delete").on("click",function(){
    input = deleteOne(input);
    display = deleteOne($("#inputBox").text());
    $("#inputBox").text(display||"0");
})

/********Number Buttons*******/
$(".number").on("click",function(){
   if (equalsActive){
     display = "";
     result = "";
     equalsActive = false;
   }
   input+=$(this).text();
   display+=$(this).text();
   if (display.length>19){
    clearInput();
    $("#inputBox").text("Limit Exceeded");
   }else{
   $("#inputBox").text(display);
   operatorNotActive = true;  
   } 
})

/****Equals Button*****/
$(".equals").on("click",function(){
      if (operatorNotActive&&operator){
        console.log(input);  
        evaluateExpression(input);
        display = result;
        $("#inputBox").text(display);
        input = "";
        // display = "";
        equalsActive = true;
        operatorNotActive = true;
      } 
})

/*************Operator Buttons***********/
$("#add,#divide,#multiply,#subtract").on("click",function(){
  if ((input||result)&&operatorNotActive){
    operator = $(this).attr("id");
    display+=Calculator[operator]();
    $("#inputBox").text(display);
    // display = "";
    input+=Calculator[operator]();
    equalsActive = false;
    operatorNotActive = false;
    decimalActive = false;
  }
})

/********Decimal**********/
$("#decimal").on("click",function(){
   if (decimalActive){
     return;
   }else{
     decimalActive = true;
     input+=$(this).text();
     display+=$(this).text();
     $("#inputBox").text(display);  
   } 
})

var Calculator = {
  add: function(){
    return "+";
  },
  subtract: function(){
    return "-";
  },
  multiply: function(){
    return "*";
  },
  divide: function(){
    return "/";
  }
}

/*********AC Button Clears all Inputs********/
function clearInput(){
  input = "";
  operator = null;
  result = "";
  operatorNotActive = true;
  equalsActive = false;
  decimalActive = false;
  display = "";
  $("#inputBox").text(0);
}

/*********CE Button Clears One Input********/
function deleteOne(input){
  var regex = /[+\-/*]\d*\.?\d+/g;
  var parsedEquation = input.match(regex);
  if (parsedEquation){
    var itemToRemoveLocation = parsedEquation.length-1;
    var itemToRemove = parsedEquation[itemToRemoveLocation];
    return input.replace(itemToRemove,"");  
  }
  clearInput();
  return "";
}

/*********Main Function To Evaluate Final Input*******/
function evaluateExpression(expression){
  var regex = /\d*(\.?\d+)?[+-/*]\d*\.?\d+/gi;
  var parsedEquation = expression.match(regex);
  console.log(parsedEquation);
  var equation = "";
  result = parsedEquation.reduce(function(acc,val){
    equation = acc + formatInput(val);
    return eval(equation).toString();
  },result)
}

/*******Format Input******/
//Fix weird inputs like 0001.1 or 0000.1
function formatInput(input){
  var splitInput = input.split(/([/*+-])/g);
  if (splitInput[0]){
    splitInput[0] = Number(splitInput[0]);
    splitInput[2] = Number(splitInput[2]);
    input = splitInput.join("");
  }else{
    splitInput[2] = Number(splitInput[2]);
    input = splitInput.join("");
  }
  return input;
}


