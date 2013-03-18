describe('popup', function() {
  beforeEach(function() {
    chrome = {
      runtime: {
        getBackgroundPage: function() {}
      }
    };

    spyOn(chrome.runtime, 'getBackgroundPage');

    document = {
      addEventListener: function() {}
    };

    spyOn(document, 'addEventListener');

    pinboard = {
      contextMenus: {
        setup: function() {}
      },
      saveToPinboard: function() {},
      readLater: function() {},
      unreadBookmarks: function() {},
      allBookmarks: function() {},
      saveToPinboard: function() {}
    };
    spyOn(pinboard.contextMenus, 'setup');
    spyOn(pinboard, 'saveToPinboard');
    spyOn(pinboard, 'readLater');
    spyOn(pinboard, 'unreadBookmarks');
    spyOn(pinboard, 'allBookmarks');
  });

  it('should add click event listeners' +
     ' when "DOMContentLoaded".', function() {

       runs(function() {
         require(['popup']);
       });
       waits(100);

       runs(function() {
         jasmine.getFixtures().fixturesPath = './fixtures';
         loadFixtures('popup_fixture.html');

         document.addEventListener.mostRecentCall.args[1]();
         listener = chrome.runtime.getBackgroundPage.mostRecentCall.args[0];
         listener(window);

         $('#saveToPinboard').click();
         expect(pinboard.saveToPinboard).toHaveBeenCalled();
         $('#readLater').click();
         expect(pinboard.readLater).toHaveBeenCalled();
         $('#unreadBookmarks').click();
         expect(pinboard.unreadBookmarks).toHaveBeenCalled();
         $('#allBookmarks').click();
         expect(pinboard.readLater).toHaveBeenCalled();
       });
     });
});
