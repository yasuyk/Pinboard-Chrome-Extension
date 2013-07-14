/* jshint -W079, -W098 */
// suppress "Redefinition of pinboard'. (W079)
// suppress "'pinboard' is defined but never used. (W098)"

var pinboard = (function() {
// TODO: 'use strict' causes <error: illegal access> on Chrome 28.
//  'use strict';

  var REGEX_SAVE_URL = /^http[s]?\:\/\/pinboard\.in\/add/;
  var BASE_URL = 'https://pinboard.in';

  var saveToPinboardPopup = function(config) {
    var c = config || {},
        url = c.url,
        title = c.title,
        description = c.description || '',
        pinboardUrl = BASE_URL + '/add?',
        fullUrl;

    fullUrl = pinboardUrl + 'showtags=yes' + '&url=' + encodeURIComponent(url) +
      '&description=' + encodeURIComponent(description) +
      '&title=' + encodeURIComponent(title);

    window.open(fullUrl, 'Pinboard',
                'toolbar=no,scrollbars=yes,width=750,height=700');
  };

  var saveToPinboard = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];

      if (!tab.url.match(REGEX_SAVE_URL)) {
        chrome.tabs.sendMessage(
          tab.id,
          {action: 'getSelection'},
          function(selection) {
            saveToPinboardPopup({
              url: tab.url,
              title: tab.title,
              description: selection
            });
          });
      }
    });
  };

  var readLater = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];

      var readlater = window.open(
        BASE_URL + '/add?later=yes&noui=yes&jump=close&url=' +
          encodeURIComponent(tab.url) + '&title=' +
          encodeURIComponent(tab.title), 'Pinboard',
        'toolbar=no');

      readlater.resizeTo(0, 0);
      readlater.blur();
    });
  };

  var unreadBookmarks = function() {
    window.open(BASE_URL + '/toread/');
  };

  var allBookmarks = function() {
    window.open(BASE_URL);
  };

  var addclickEventListeners = function(doc) {
    doc.querySelector('#saveToPinboard').addEventListener(
      'click', this.saveToPinboard);
    doc.querySelector('#readLater').addEventListener(
      'click', this.readLater);
    doc.querySelector('#unreadBookmarks').addEventListener(
      'click', this.unreadBookmarks);
    doc.querySelector('#allBookmarks').addEventListener(
      'click', this.allBookmarks);
  };

  return {
    saveToPinboardPopup: saveToPinboardPopup,
    saveToPinboard: saveToPinboard,
    readLater: readLater,
    unreadBookmarks: unreadBookmarks,
    allBookmarks: allBookmarks,
    addclickEventListeners: addclickEventListeners
  };
})();
