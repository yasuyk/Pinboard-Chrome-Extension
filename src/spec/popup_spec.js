describe('popup', function() {
  beforeEach(function() {
     spyOn(chrome.runtime, 'getBackgroundPage');
    spyOn(document, 'addEventListener');
    spyOn(pinboard, 'addclickEventListeners');
  });

  it('should add click event listeners' +
     ' when "DOMContentLoaded".', function() {

       runs(function() {
         require(['popup']);
       });
       waits(100);

       runs(function() {

         document.addEventListener.mostRecentCall.args[1]();
         listener = chrome.runtime.getBackgroundPage.mostRecentCall.args[0];
         listener(window);

         expect(pinboard.addclickEventListeners).toHaveBeenCalledWith(document);
       });
     });
});
