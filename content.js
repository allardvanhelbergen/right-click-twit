/**
 * Content script for Right Click Twit
 * Author: Allard van Helbergen (allard@vanhelbergen.com)
 */

// Collect namespace from Background page.
var rct = chrome.extension.getBackgroundPage().rct;

/**
 * Namespace for the content script.
 */
rct.con = {};

rct.con.getSelection = function() {
  var selection = window.getSelection().toString();
  if (selection) {
    sendResponse({data: selection});
  } else {
    alert('Please select text to look for in Tweets.')
};

rct.con.init = function() {
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection") {
      rct.con.handleGetSelection();
    }
  });
};

rct.con.init();

