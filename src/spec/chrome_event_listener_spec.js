describe('chrome/event_listener', function() {
  beforeEach(function() {
    spyOn(chrome.tabs, 'remove');
    spyOn(chrome.tabs.onUpdated, 'addListener');
    spyOn(chrome.commands.onCommand, 'addListener');

    spyOn(pinboard, 'saveToPinboard');
    spyOn(pinboard, 'readLater');
    spyOn(pinboard, 'unreadBookmarks');
    spyOn(pinboard, 'allBookmarks');
    spyOn(pinboard.contextMenus, 'setup');
  });

  it('should add listeners when loaded.', function() {
    runs(function() {
      require(['event_listener']);
    });
    waits(100);

    runs(function() {
      listener = chrome.tabs.onUpdated.
        addListener.mostRecentCall.args[0];
      var tabId = 1;
      listener(tabId, {status: 'loading'}, {url: 'https://pinboard.in/add'});
      expect(chrome.tabs.remove).toHaveBeenCalledWith(tabId);

      listener = chrome.commands.onCommand.
        addListener.mostRecentCall.args[0];
      listener('save_to_pinboard');
      expect(pinboard.saveToPinboard).toHaveBeenCalled();
      listener('read_later');
      expect(pinboard.readLater).toHaveBeenCalled();
      listener('unread_bookmarks');
      expect(pinboard.unreadBookmarks).toHaveBeenCalled();
      listener('all_bookmarks');
      expect(pinboard.readLater).toHaveBeenCalled();

      // should call pinboard.contextMenus.setup when chrome.runtime.onInstalled
      expect(pinboard.contextMenus.setup).toHaveBeenCalled();
    });
  });
});
