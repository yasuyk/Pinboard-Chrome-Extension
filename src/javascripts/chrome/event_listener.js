
chrome.commands.onCommand.addListener(function(command) {
  // can not specified greater than 4 commands.
  // if specified, The following error occurs.
  // "Too many commands specified for 'commands': The maximum is 4."

  switch (command) {
  case 'save_to_pinboard': saveToPinboard(); break;
  case 'read_later': readLater(); break;
  case 'unread_bookmarks': unreadBookmarks(); break;
  case 'all_bookmarks': allBookmarks(); break;
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    if (tab.url == 'https://pinboard.in/add') {
      chrome.tabs.remove(tabId);
    }
  }
});
