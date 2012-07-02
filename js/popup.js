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

rct.pop.init = function() {
  console.log('working');

  $('#latest-searches').html(
      $('#query-tmpl').render(rct.tweetHistory.queries)
  );
  
  /*for (var i = 0, query; query = rct.tweetHistory.queries[i]; i++) {
    $('#latest-searches').append(
        $('<li>').html(query.query)
    );
  }*/
};

$(document).ready(
  rct.pop.init
);

