chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    'use strict';
    if (request.action && sender.tab) {
      switch (request.action) {
      case 'getSelection':
        sendResponse(window.getSelection().toString());
      }
    }
  });
