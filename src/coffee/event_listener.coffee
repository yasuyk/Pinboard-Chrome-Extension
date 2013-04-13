chrome.commands.onCommand.addListener (command) ->
  # can not specified greater than 4 commands.
  # if specified, The following error occurs.
  # "Too many commands specified for 'commands': The maximum is 4."
  switch command
    when 'save_to_pinboard' then pinboard.saveToPinboard()
    when 'read_later' then pinboard.readLater()
    when 'unread_bookmarks' then pinboard.unreadBookmarks()
    when 'all_bookmarks' then pinboard.allBookmarks()

chrome.tabs.onUpdated.addListener (tabId, changeInfo, tab) ->
  if changeInfo.status is 'loading' and tab.url is 'https://pinboard.in/add'
    chrome.tabs.remove tabId

pinboard.contextMenus.setup pinboard.saveToPinboardPopup
