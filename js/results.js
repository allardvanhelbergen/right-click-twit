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

/**
 * Initiates all listeners and global variables.
 */
rct.rslt.init = function() {
  // Send message to get tweets.
  chrome.extension.sendMessage(
    {'action': 'getTweets'},
    rct.rslt.parseTweets
  );
};

/**
 * Renders tweets to page.
 * @param(Array) data Collection of tweet data.
 */
rct.rslt.parseTweets = function(data) {
  $('#results').html(
      $('#tweet-tmpl').render(data)
  );
};


// Run code when ready
$(document).ready(
  rct.rslt.init
);

