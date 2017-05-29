// Fill in the object constructor with the following methods below:

// getFirstName()
// getLastName()
// getFullName()
// setFirstName(first)
// setLastName(last)
// setFullName(firstAndLast)

// Run the tests to see the expected output for each method.

// The methods that take an argument must accept only one 
// argument and it has to be a string.

// These methods must be the only available means of 
// interacting with the object.

var Person = function(firstAndLast) {
    // Complete the method below and implement the others similarly
  var names;
  var firstName;
  var lastName;
  setFirstandLast(firstAndLast);
  this.setFirstName = function(name){
    firstName = name;
  };
  this.setLastName = function(name){
    lastName = name;
  };
  this.setFullName = function(firstAndLast){
   setFirstandLast(firstAndLast);
  };
  this.getFirstName = function(){
    return firstName;
  };
   this.getLastName = function(){
    return lastName;
  };
   this.getFullName = function(){
    return firstName + " " + lastName;
  };
    function setFirstandLast(firstAndLast){
    names = firstAndLast.split(" ");
    firstName = names[0];
    lastName = names[1];
   }
};

var bob = new Person('Bob Ross');
bob.getFullName();
