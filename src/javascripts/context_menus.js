pinboard.contextMenus = (function() {
  'use strict';

  var SAVE_TO_PINBOARD = 'Save to Pinboard';
  var SAVE_SELECTION_PINBOARD = 'Save Selection to Pinboard';
  var SAVE_URL_TO_PINBOARD = 'Save URL to Pinboard';
  var SAVE_IMAGE_URL_TO_PINBOARD = 'Save Image URL to Pinboard';
  var SAVE_AUDIO_URL_TO_PINBOARD = 'Save Audio URL to Pinboard';
  var SAVE_VIDEO_URL_TO_PINBOARD = 'Save Video URL to Pinboard';

  var MENU_ID_PAGE = 'page';
  var MENU_ID_SELECTION = 'selection';
  var MENU_ID_LINK = 'link';
  var MENU_ID_IMAGE = 'image';
  var MENU_ID_AUDIO = 'audio';
  var MENU_ID_VIDEO = 'video';

  var setup = function(onClockCallback) {
    chrome.contextMenus.create({
      'title': SAVE_TO_PINBOARD,
      'id': MENU_ID_PAGE,
      'contexts': [MENU_ID_PAGE]
    });
    chrome.contextMenus.create({
      'title': SAVE_SELECTION_PINBOARD,
      'id': MENU_ID_SELECTION,
      'contexts': [MENU_ID_SELECTION]
    });
    chrome.contextMenus.create({
      'title': SAVE_URL_TO_PINBOARD,
      'id': MENU_ID_LINK,
      'contexts': [MENU_ID_LINK]
    });

    chrome.contextMenus.create({
      'title': SAVE_IMAGE_URL_TO_PINBOARD,
      'id': MENU_ID_IMAGE,
      'contexts': [MENU_ID_IMAGE]
    });
    chrome.contextMenus.create({
      'title': SAVE_AUDIO_URL_TO_PINBOARD,
      'id': MENU_ID_AUDIO,
      'contexts': [MENU_ID_AUDIO]
    });
    chrome.contextMenus.create({
      'title': SAVE_VIDEO_URL_TO_PINBOARD,
      'id': MENU_ID_VIDEO,
      'contexts': [MENU_ID_VIDEO]
    });

    chrome.contextMenus.onClicked.addListener(onclick);
    callback = onClockCallback;
  };

  var callback;

  var onclick = function(info, tab) {
    if (chrome.extension.lastError || chrome.runtime.lastError) {
      //console.log(chrome.extension.lastError);
      //console.log(chrome.runtime.lastError);
      return;
    } else {
      var config;
      if (info.menuItemId === MENU_ID_LINK) {
        config = {
          url: info.linkUrl,
          title: info.linkUrl
        };
      } else if (info.menuItemId === MENU_ID_IMAGE ||
                 info.menuItemId === MENU_ID_AUDIO ||
                 info.menuItemId === MENU_ID_VIDEO) {
        config = {
          url: info.srcUrl,
          title: info.srcUrl
        };
      } else {
        config = {
          url: info.pageUrl,
          title: tab.title,
          description: info.selectionText
        };
      }
      callback(config);
    }
  };

  return {
    setup: setup
  };
})();
