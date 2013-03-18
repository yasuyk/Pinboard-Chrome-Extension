document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  chrome.runtime.getBackgroundPage(
    function(page) {
      page.pinboard.addclickEventListeners(document);
    });
});
