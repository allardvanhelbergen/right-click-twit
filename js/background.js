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
 * Array to collect tweets in.
 * @var (Array)
 */
rct.tweets = [];

/**
 * Object to collect tweet history data in, such as query strings.
 * @var (Object)
 */
rct.tweetHistory = {};

/**
 * Count of the amount of searches done to date.
 * @var (int)
 */
rct.searchCnt = 0;

/**
 * Initiates all listeners and global variables.
 */
rct.init = function() {
  // Create Listener for results tab.
  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action == 'getTweets') {
        sendResponse(rct.tweets);
      }
    }
  );
  
  // Get Local Sotrage variables
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

  // Update initial query count.
  rct.updateTweetCount(rct.searchCnt);

  // Create context menu entry.
  chrome.contextMenus.create({
      'type': 'normal',
      'title': 'Get Tweets for "%s"',
      'contexts': ['selection'],
      'onclick': rct.handleRightClick
  });
};

/**
 * Updates the count number shown over the extension icon.
 * @param (int) cnt The number to show.
 */
rct.updateTweetCount = function() {
  var cnt = String(rct.searchCnt);
  chrome.browserAction.setBadgeText({text: cnt});
};

/**
 * Handles what happens when user right clicks: gets the tweets, updates 
 * query count, and adds query to history.
 * @param(Object) info Data that comes from the right click event.
 * @param(Object) tab Data about the tab the event came from.
 */
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
  }
}

/**
 * Makes an AJAX call for given query.
 * @param(String) query The query to make the call for.
 */
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

/**
 * Opens a new tab and sends the tweets to it to be displayed.
 * @param(Object) data The tweets.
 */
rct.processTweets = function(data) {
  rct.tweets = data;
  chrome.tabs.create({'url': 'html/results.html'});
};


// Run code when ready
$(document).ready(
  rct.init
);
