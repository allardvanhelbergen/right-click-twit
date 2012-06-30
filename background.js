/**
 * Right Click Twit
 * A chrome extension that shows tweets from selected text on right click.
 * Author: Allard van Helbergen (allard@vanhelbergen.com)
 */

/**
 * Namespace for functions for Right CLick Twit.
 */
var rct = {};

/**
 * Updates the count number shown over the extension icon.
 * @param (int) cnt The number to show.
 */
rct.updateTweetCount = function() {
  var cnt = String(rct.searchCnt);
  chrome.browserAction.setBadgeText({text: cnt});
};

rct.getTweets = function(query) {
  if (!query) {
    // TODO: system notification query undefined.
  }
  
  console.log('Getting Tweets for: ' + query);
  
}

rct.handleRightClk = function(info, tab) {
  rct.searchCnt =+ 1;
  rct.updateTweetCount();
  rct.getTweets(info.selectionText);
  // TODO(allard):open new tab, show results;
}

rct.handleExtClick = function() {
  // TODO(allard):collect last ten history, show in popup
};

/**
 * Initiates all listeners and global variables.
 */
rct.init = function() {
  console.log('RCT Initialised...');
  
  rct.searchCnt = 0;
  rct.updateTweetCount(rct.searchCnt);
  
  // Create context menu entry.
  chrome.contextMenus.create({
      'type': 'normal',
      'title': 'Get Tweets for "%s"',
      'contexts': ['selection'],
      'onclick': rct.handleRightClk
  });
};


rct.init()
