chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action && sender.tab) {
      switch (request.action) {
      case 'getSelection':
        sendResponse(window.getSelection().toString());
      }
    }
  });
