$(function() { /*When DOM is ready*/
  
  /**Resize the 'next Quote' button for mobile**/
  function resizeButton(){
    var browser = $(window).width();
    var mobileScreenSize = 500;
        if (browser <= mobileScreenSize) {
          var $button = $('#button');
          $button.parent().removeClass('button-move');
          $button.addClass('btn-block');
          $("#tweet").addClass('btn-block');
        }
  }
  
/**function to display Quote**/
function displayQuote(data){
    var quote = data.quoteText;
    $("#quote").fadeOut(500,function(){
    $('#quote').html('<em>' +'"' + data.quoteText +'"'+'</em>').fadeIn(500);
  });
}  

/**Function to display Author**/  
function displayAuthor(data){
    var author = data.quoteAuthor;
    $("#author").fadeOut(800,function(){
    $('#author').html('<em>' +'~' + author +'</em>').fadeIn(800);
  });
}  

    /**set text for Tweet**/
  function loadTweet(text){
    var quote = text.quoteText.replace(' ','%20');
    var author = text.quoteAuthor;
    var tweetLink = 'https://twitter.com/intent/tweet?url=/&text="'
    var link = tweetLink + quote +'"'+ author;
    $("#tweet").attr("href", link);
  }
  
  
/***Ajax request to get quote***/
 function getQuote(){
    $('#button').on('click',function(){
    $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
    success: function(data) {
      displayQuote(data), 
      displayAuthor(data),
      loadTweet(data)
    }
  }) 
})
  }
  
getQuote();
resizeButton();  
});

