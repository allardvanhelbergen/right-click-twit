/**
 * Right Click Twit
 * A chrome extension that shows tweets from selected text on right click.
 * Author: Allard van Helbergen (allard@vanhelbergen.com)
 */

/**
 * Namespace for functions for Right Click Twit.
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
    var notification = webkitNotifications.createHTMLNotification(
        'html/notification.html');
    notification.show();
  }

  //TODO: add query to history
  //JSON.stringify
  //TODO: add failure clause
  $.ajax({
      url: 'http://search.twitter.com/search.json',
      type: 'GET',
      dataType: 'jsonp',
      data: {q: query},
      success: function(data, textStatus, xhr) {
        rct.processTweets(data.results);
      }
    }
  );
}

rct.processTweets = function(data) {
  chrome.tabs.create({
      'url': 'html/results.html'
    },
    function(tab) {
      chrome.tabs.sendMessage(tab.id, {'action': 'parseTweets', 'data': data});
    }
  );
};

rct.handleRightClk = function(info, tab) {
  rct.searchCnt += 1;
  localStorage.searchCnt = rct.searchCnt;
  
  rct.updateTweetCount();
  rct.getTweets(info.selectionText);
}

rct.handleExtClick = function() {
  // TODO(allard):collect last ten history, show in popup
};

/**
 * Initiates all listeners and global variables.
 */
rct.init = function() {
  console.log('RCT Initialised...');
  
  // get Local Sotrage variables
  if (!localStorage.tweetHistory) {
    rct.tweetHistory = {};
  } else {
    rct.tweetHistory = localStorage.tweetHistory;
  }
  
  if (!localStorage.searchCnt) {
    rct.searchCnt = 0;
  } else {
    rct.searchCnt = parseInt(localStorage.searchCnt);
  }
  
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
