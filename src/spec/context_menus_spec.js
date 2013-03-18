describe('context_menus', function() {
  beforeEach(function() {
    spyOn(chrome.contextMenus, 'create');
    spyOn(chrome.contextMenus.onClicked, 'addListener');

    callback = jasmine.createSpy();
  });

  it('should Save to Pinboard when menuItemId is page.', function() {
       runs(function() {
         require(['context_menus']);
       });
       waits(100);

       runs(function() {
         pinboard.contextMenus.setup(callback);
         var linkUrl = 'http://linkUrl';
         listener = chrome.contextMenus.onClicked.addListener.
           mostRecentCall.args[0];
         listener({menuItemId: 'link', linkUrl: linkUrl}, null);
         expect(callback).toHaveBeenCalledWith({url: linkUrl, title: linkUrl});
       });
     });

  it('should Save [Image, Audio, Video] URL to Pinboard ' +
     'when menuItemId is [iamge, audio, video].', function() {
       runs(function() {
         require(['context_menus']);
       });
       waits(100);

       runs(function() {
         pinboard.contextMenus.setup(callback);
         var srcUrl = 'http://srcUrl';
         listener = chrome.contextMenus.onClicked.addListener.
           mostRecentCall.args[0];
         listener({menuItemId: 'image', srcUrl: srcUrl}, null);
         expect(callback).toHaveBeenCalledWith({url: srcUrl, title: srcUrl});
         listener({menuItemId: 'audio', srcUrl: srcUrl}, null);
         expect(callback).toHaveBeenCalledWith({url: srcUrl, title: srcUrl});
         listener({menuItemId: 'video', srcUrl: srcUrl}, null);
         expect(callback).toHaveBeenCalledWith({url: srcUrl, title: srcUrl});
       });
     });

  it('should Save (selectionText) to Pinboard ' +
     'when menuItemId is [page, selection].', function() {
       runs(function() {
         require(['context_menus']);
       });
       waits(100);

       runs(function() {
         pinboard.contextMenus.setup(callback);
         var pageUrl = 'http://pageUrl';
         var title = 'title';
         listener = chrome.contextMenus.onClicked.addListener.
           mostRecentCall.args[0];
         listener({menuItemId: 'page', pageUrl: pageUrl, selectionText: ''},
                  {title: title});
         expect(callback).toHaveBeenCalledWith({
           url: pageUrl, title: title, description: ''});
         listener({menuItemId: 'selection', pageUrl: pageUrl,
                   selectionText: 'selection'},
                  {title: title});
         expect(callback).toHaveBeenCalledWith({
           url: pageUrl, title: title, description: 'selection'});
       });
     });
});
