describe('content_scripts', function() {
  beforeEach(function() {
    spyOn(chrome.runtime.onMessage, 'addListener');
    callback = jasmine.createSpy();
  });

  it('should add a listener to call callback ' +
     'when got a message to "getSelecion" from background', function() {

       runs(function() {
         require(['content_script']);
       });
       waits(100);

       runs(function() {
         console.log(callback);
         listener = chrome.runtime.onMessage.addListener.mostRecentCall.args[0];
         listener({action: 'getSelection'}, {id: 'id'}, callback);
         expect(callback).toHaveBeenCalled();
       });
     });
});
