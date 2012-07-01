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
  $( "#results" ).html(
      $( "#tweet-tmpl" ).render( data )
  );
};

rct.rslt.init();
