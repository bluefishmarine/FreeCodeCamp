// Design a cash register drawer function checkCashRegister() 
// that accepts purchase price as the first argument (price), 
// payment as the second argument (cash), and cash-in-drawer (cid) 
// as the third argument.

// cid is a 2D array listing available currency.

// Return the string "Insufficient Funds" if cash-in-drawer is 
// less than the change due. Return the string "Closed" if 
// cash-in-drawer is equal to the change due.

// Otherwise, return change in coin and bills, sorted in 
// highest to lowest order.


function checkCashRegister(price, cash, cid) {
  var change = [];
  var difference = cash-price;
  var changeDue = cash-price;
  var startPoint = cid.length-1;
  
   var roundedNum = function(num){
    return Number(num.toFixed(2));
  };
  
  
  var cashObject = {
    PENNY: .01,
    NICKEL: .05,
    DIME: .10,
    QUARTER: .25,
    ONE: 1.00,
    FIVE: 5.00,
    TEN: 10.00,
    TWENTY: 20.00,
    "ONE HUNDRED": 100.00
  };

  
  for (var x = startPoint; x>=0; x--){
    var closestValue;
    var quantityofDemomination = Math.floor(changeDue/cashObject[cid[x][0]]);
    if (quantityofDemomination <= cid[x][1]/cashObject[cid[x][0]]){
      if (quantityofDemomination>0){
        change.push([cid[x][0],quantityofDemomination*cashObject[cid[x][0]]]);
      }
      closestValue = quantityofDemomination*cashObject[cid[x][0]];
      changeDue = roundedNum(changeDue - closestValue);
    }else{
      quantityofDemomination = Math.floor(cid[x][1]/cashObject[cid[x][0]]);
      if (quantityofDemomination>0){
        change.push([cid[x][0],quantityofDemomination*cashObject[cid[x][0]]]);
      }
      closestValue = quantityofDemomination*cashObject[cid[x][0]];
      changeDue = roundedNum(changeDue - closestValue);
    }
  }
  
  var totalCash = roundedNum(change.reduce(function(acc,val){
    return acc+val[1];
  },0));
  
   var totalCash1 = roundedNum(cid.reduce(function(acc,val){
    return acc+val[1];
  },0));
  
    
  if (difference > totalCash){
    return  "Insufficient Funds";
  }
  
  if (difference === totalCash1){
    return "Closed";
  }

  return change;
  
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], 
  ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], 
  ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], 
  ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
