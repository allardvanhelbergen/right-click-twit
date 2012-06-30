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
  var cntString = String(rct.clickCnt);
  chrome.browserAction.setBadgeText({text: cntString});
  rct.clickCnt += 1;
};

rct.getTweets = function(query) {
  query = (!query) ? '' : query;
  console.log('getting Tweets for: ' + query);
}

rct.handleRightClk = function(info, tab) {
  rct.updateTweetCount();
  rct.getTweets(info.selectionText);
}

rct.handleExtClick = function() {
  rct.updateTweetCount(rct.clickCnt);
};

/**
 * Initiates all listeners and global variables.
 */
rct.init = function() {
  console.log('RCT Initialised...');
  
  rct.clickCnt = 0;
  rct.updateTweetCount(rct.clickCnt);
  
  // Create context menu entry.
  chrome.contextMenus.create({
      'type': 'normal',
      'title': 'Get Tweets for "%s"',
      'contexts': ['selection'],
      'onclick': rct.handleRightClk
  });
};


rct.init()
