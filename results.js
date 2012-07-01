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
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");

      if (request.action == 'parseTweets') {
        console.log(request.data);
      }
    }
  );
};


rct.rslt.init();
