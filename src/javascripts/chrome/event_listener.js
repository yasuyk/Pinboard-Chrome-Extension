chrome.commands.onCommand.addListener(function(command) {
  // can not specified greater than 4 commands.
  // if specified, The following error occurs.
  // "Too many commands specified for 'commands': The maximum is 4."
  'use strict';

  switch (command) {
  case 'save_to_pinboard':
    pinboard.saveToPinboard();
    break;
  case 'read_later':
    pinboard.readLater();
    break;
  case 'unread_bookmarks':
    pinboard.unreadBookmarks();
    break;
  case 'all_bookmarks':
    pinboard.allBookmarks();
    break;
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  'use strict';
  if (changeInfo.status === 'loading') {
    if (tab.url === 'https://pinboard.in/add') {
      chrome.tabs.remove(tabId);
    }
  }
});

chrome.runtime.onInstalled.addListener(function() {
  'use strict';
  pinboard.contextMenus.setup(pinboard.saveToPinboardPopup);
});
