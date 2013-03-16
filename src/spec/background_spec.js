describe('background', function() {
  beforeEach(function() {
    chrome = {
      tabs: {
        onUpdated: {
          addListener: function() {}
        },
        remove: function() {}
      },
      commands: {
        onCommand: {
          addListener: function() {}
        }
      }
    };

    spyOn(chrome.tabs, 'remove');
    spyOn(chrome.tabs.onUpdated, 'addListener');
    spyOn(chrome.commands.onCommand, 'addListener');

    saveToPinboard = jasmine.createSpy();
    readLater = jasmine.createSpy();
    unreadBookmarks = jasmine.createSpy();
    allBookmarks = jasmine.createSpy();
  });

  it('should add listeners when loaded.', function() {

    runs(function() {
      require(['background']);
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
      expect(saveToPinboard).toHaveBeenCalled();
      listener('read_later');
      expect(readLater).toHaveBeenCalled();
      listener('unread_bookmarks');
      expect(unreadBookmarks).toHaveBeenCalled();
      listener('all_bookmarks');
      expect(readLater).toHaveBeenCalled();
    });
  });
});
