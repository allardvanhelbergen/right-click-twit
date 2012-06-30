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
  console.log('adding listeners');

  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a background:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
    });
  /*chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request);
      if (request.action == 'parseTweets') {
        console.log('Parsing Tweets');
        rct.rslt.parseTweets(request.data);
      }
    }
  );*/
};

rct.rslt.parseTweets = function(tweets) {
  /*for (var i = 0, tweet = tweets[i]; i++) {
    console.log(tweet);
    $('#results').append(
      $('#tweetTmpl').render(movies)
    );
  }*/
  console.log(tweets);
  console.log($('#results'));
  console.log($('#tweetTmpl').render(tweets));
  $('#results').append($('#tweetTmpl').render(tweets));
};


rct.rslt.init();
