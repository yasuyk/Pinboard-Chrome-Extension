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
  });

  it('should add click event listeners' +
     'when "DOMContentLoaded".', function() {

       runs(function() {
         require(['popup']);
       });
       waits(100);

       runs(function() {
         jasmine.getFixtures().fixturesPath = './fixtures';
         loadFixtures('popup_fixture.html');

         document.addEventListener.mostRecentCall.args[1]();
         chrome.runtime.getBackgroundPage.mostRecentCall.args[0](window);

         $('.save_to_pinboard').trigger('click');
         expect(saveToPinboard).toHaveBeenCalled();
         $('.read_later').trigger('click');
         expect(readLater).toHaveBeenCalled();
         $('.unread_bookmarks').trigger('click');
         expect(unreadBookmarks).toHaveBeenCalled();
         $('.all_bookmarks').trigger('click');
         expect(readLater).toHaveBeenCalled();
       });
     });
});
