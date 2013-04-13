document.addEventListener 'DOMContentLoaded', ->
  chrome.runtime.getBackgroundPage (page) ->
    page.pinboard.addclickEventListeners document
