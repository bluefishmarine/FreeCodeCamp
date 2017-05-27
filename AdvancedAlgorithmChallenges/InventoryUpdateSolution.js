// Compare and update the inventory stored in a 2D array against 
// a second 2D array of a fresh delivery. 
// Update the current existing inventory item quantities (in arr1). 
// If an item cannot be found, add the new item and quantity 
// into the inventory array. The returned inventory array 
// should be in alphabetical order by item.

function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    var curInvObj = {};
    
    for (var index of arr1){
      curInvObj[index[1]] = index[0];
    }
    
    for (var index1 of arr2){
      if (curInvObj.hasOwnProperty(index1[1])){
        curInvObj[index1[1]]+=index1[0];
      }else{
        curInvObj[index1[1]] = index1[0];
      }
    }
    
    curInvObj.createList = function(){
      var newList = [];
      newList.push([0,"@"]);
      for (var index in this){
         for (var newListIndex = 0; newListIndex<newList.length; newListIndex++){
      if (index.charCodeAt(0)<newList[newListIndex][1].charCodeAt(0)){
        newList.splice(newListIndex,0,[this[index],index]);
        break;
      }
    }
     if (newListIndex == newList.length){
        newList.push([this[index],index]);
        }
      }
      newList.shift();
      return newList;
    };
    
    Object.defineProperty(curInvObj, "createList", {
      enumerable: false
    });
    
    return curInvObj.createList();
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);