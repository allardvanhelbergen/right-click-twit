/**
 * Popup script for Right Click Twit
 * Author: Allard van Helbergen (allard@vanhelbergen.com)
 */

// Collect namespace from Background page.
var rct = chrome.extension.getBackgroundPage().rct;

/**
 * Namespace for the popup page.
 */
rct.pop = {};

/**
 * Initiates code, renders query history.
 */
rct.pop.init = function() {
  $('#latest-searches').html(
      $('#query-tmpl').render(rct.tweetHistory.queries)
  );
};


// Run code when ready
$(document).ready(
  rct.pop.init
);

