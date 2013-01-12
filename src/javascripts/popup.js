
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading') {
    if (tab.url == 'https://pinboard.in/add') {
      chrome.tabs.remove(tabId);
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.getBackgroundPage(
    function(page) {
      var methods = {
        save_to_pinboard: page.saveToPinboard,
        read_later: page.readLater,
        unread_bookmarks: page.unreadBookmarks,
        all_bookmarks: page.allBookmarks
      };
      for (var key in methods) {
        document.querySelector('#' + key).addEventListener(
          'click', methods[key]);
      }
    });
});
