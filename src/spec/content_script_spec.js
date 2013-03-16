describe('content_scripts', function() {
  beforeEach(function() {
    chrome = {
      extension: {
        onMessage: {
          addListener: function() {}
        }
      }
    };

    spyOn(chrome.extension.onMessage, 'addListener');
    callback = jasmine.createSpy();
  });

  it('should add a listener to call callback ' +
     'when got a message to "getSelecion" from background', function() {

       runs(function() {
         require(['content_script']);
       });
       waits(100);

       runs(function() {
         listener = chrome.extension.onMessage.
           addListener.mostRecentCall.args[0];
         listener({action: 'getSelection'}, {tab: 'tab'}, callback);
         expect(callback).toHaveBeenCalled();
       });
     });
});
