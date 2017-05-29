// Return the number of total permutations of the provided string that 
// don't have repeated consecutive letters. Assume that all 
// characters in the provided string are each unique.

// For example, aab should return 2 because it has 6 total 
// permutations (aab, aab, aba, aba, baa, baa), 
// but only 2 of them (aba and aba) don't have 
// the same letter (in this case a) repeating.


function permAlone(str) {
  function letterSwap(word,pos1,pos2){
  var tempWord = word.split("");
  var l1 = tempWord[pos1];
  var l2 = tempWord[pos2];
  tempWord[pos1] = l2;
  tempWord[pos2] = l1;
  return tempWord.join('');
}

// console.log(letterSwap("abc",0,1));

function makePermutation(word){
  var oldWord = word;
  var newWord = word;
  var wordList = [];
  wordList.push(word);
  while (oldWord != newWord){
    newWord = function(){
    for (var pos = 0; pos<word.length-1; pos++){
    if (pos == word.length-1){
      return letterSwap(newWord,pos,pos+1);
    }
    wordList.push(letterSwap(newWord,pos,pos+1));
  }();
    }
  }
  return wordList;
}

makePermutation("abc");
}

permAlone('aab');