document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  chrome.runtime.getBackgroundPage(
    function(page) {
      document.querySelector('#saveToPinboard').addEventListener(
        'click', page.pinboard.saveToPinboard);
      document.querySelector('#readLater').addEventListener(
        'click', page.pinboard.readLater);
      document.querySelector('#unreadBookmarks').addEventListener(
        'click', page.pinboard.unreadBookmarks);
      document.querySelector('#allBookmarks').addEventListener(
        'click', page.pinboard.allBookmarks);
    });
});
