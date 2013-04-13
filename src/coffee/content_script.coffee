chrome.extension.onMessage.addListener  (request, sender, sendResponse) ->
  if request.action and sender.tab
    switch request.action
      when 'getSelection'
        sendResponse window.getSelection().toString()
