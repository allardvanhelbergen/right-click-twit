/**
 * Results script for Right Click Twit
 * Author: Allard van Helbergen (allard@vanhelbergen.com)
 */

// Collect namespace from Background page.
var rct = chrome.extension.getBackgroundPage().rct;

/**
 * Namespace for the result page.
 */
rct.rslt = {};

rct.rslt.init = function() {
  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('Request received', request);
      if (request.action == 'parseTweets') {
        rct.rslt.parseTweets(request.data);
      }
    }
  );
};

rct.rslt.parseTweets = function(data) {
  console.log($('#results'));
  console.log($('#tweet-tmpl'));
  
  var tweets = [];
  
  for (var i = 0, tweet; tweet = data[i]; i++) {
    console.log(tweet);
    
    tweets.push({
        'from_user': tweet.from_user,
        'profile_image_url': tweet.profile_image_url
    });
    
  }
  
  var movies = [
    { name: "The Red Violin", releaseYear: "1998" },
    { name: "Eyes Wide Shut", releaseYear: "1999" },
    { name: "The Inheritance", releaseYear: "1976" }
  ];
  
  console.log(tweets);
  $( "#results" ).html(
      $( "#tweet-tmpl" ).render( tweets )
  );
  
};

rct.rslt.init();
