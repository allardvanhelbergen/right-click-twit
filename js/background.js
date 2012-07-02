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
  $.ajax({
      url: 'http://search.twitter.com/search.json',
      type: 'GET',
      dataType: 'jsonp',
      data: {q: query},
      success: function(data, textStatus, xhr) {
        rct.processTweets(data.results);
      },
      error: function(xhr, textStatus, error) {
        console.error(error);
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

rct.handleRightClick = function(info, tab) {
  var query = info.selectionText;

  if (!query) {
    var notification = webkitNotifications.createHTMLNotification(
        'html/notification.html');
    notification.show();
  } else {
    rct.getTweets(query);
  
    rct.searchCnt += 1;
    localStorage.searchCnt = rct.searchCnt;
    rct.updateTweetCount();
  
    rct.tweetHistory.queries.push({'query': query});
    localStorage.tweetHistory = JSON.stringify(rct.tweetHistory);
    console.log(rct.tweetHistory);
    console.log(localStorage.tweetHistory);
  }
}

/**
 * Initiates all listeners and global variables.
 */
rct.init = function() {
  console.log('RCT Initialised...');
  
  // get Local Sotrage variables
  if (!localStorage.tweetHistory) {
    rct.tweetHistory = {'queries': []};
  } else {
    rct.tweetHistory = JSON.parse(localStorage.tweetHistory);
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
      'onclick': rct.handleRightClick
  });
};


rct.handleExtClick = function() {
  
};


rct.init()
