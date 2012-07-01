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
  // This has to happen here because popup cancels onClick event.
  rct.handleExtClick();
};

rct.pop.init();

