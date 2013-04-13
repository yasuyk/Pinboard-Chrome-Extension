pinboard.contextMenus = {}

pinboard.contextMenus.SAVE_TO_PINBOARD = 'Save to Pinboard'
pinboard.contextMenus.SAVE_SELECTION_PINBOARD = 'Save Selection to Pinboard'
pinboard.contextMenus.SAVE_URL_TO_PINBOARD = 'Save URL to Pinboard'
pinboard.contextMenus.SAVE_IMAGE_URL_TO_PINBOARD = 'Save Image URL to Pinboard'
pinboard.contextMenus.SAVE_AUDIO_URL_TO_PINBOARD = 'Save Audio URL to Pinboard'
pinboard.contextMenus.SAVE_VIDEO_URL_TO_PINBOARD = 'Save Video URL to Pinboard'

pinboard.contextMenus.MENU_ID_PAGE = 'page'
pinboard.contextMenus.MENU_ID_SELECTION = 'selection'
pinboard.contextMenus.MENU_ID_LINK = 'link'
pinboard.contextMenus.MENU_ID_IMAGE = 'image'
pinboard.contextMenus.MENU_ID_AUDIO = 'audio'
pinboard.contextMenus.MENU_ID_VIDEO = 'video'
pinboard.contextMenus.callback = null

pinboard.contextMenus.setup (onClockCallback) ->
  chrome.contextMenus.create({
    'title': @SAVE_TO_PINBOARD,
    'id': MENU_ID_PAGE,
    'contexts': [MENU_ID_PAGE]
  })
  chrome.contextMenus.create({
    'title': SAVE_SELECTION_PINBOARD,
    'id': MENU_ID_SELECTION,
    'contexts': [MENU_ID_SELECTION]
  })
  chrome.contextMenus.create({
    'title': SAVE_URL_TO_PINBOARD,
    'id': MENU_ID_LINK,
    'contexts': [MENU_ID_LINK]
  })

  chrome.contextMenus.create({
    'title': SAVE_IMAGE_URL_TO_PINBOARD,
    'id': MENU_ID_IMAGE,
    'contexts': [MENU_ID_IMAGE]
  })
  chrome.contextMenus.create({
    'title': SAVE_AUDIO_URL_TO_PINBOARD,
    'id': MENU_ID_AUDIO,
    'contexts': [MENU_ID_AUDIO]
  })
  chrome.contextMenus.create({
    'title': SAVE_VIDEO_URL_TO_PINBOARD,
    'id': MENU_ID_VIDEO,
    'contexts': [MENU_ID_VIDEO]
  })

  chrome.contextMenus.onClicked.addListener(onclick)
  pinboard.contextMenus.callback = onClockCallback


pinboard.contextMenus.onclick = (info, tab) ->
  if chrome.extension.lastError or chrome.runtime.lastError
    #console.log(chrome.extension.lastError)
    #console.log(chrome.runtime.lastError)
    return
  else
    if info.menuItemId is MENU_ID_LINK
      config = {
        url: info.linkUrl,
        title: info.linkUrl
      }
    else if info.menuItemId is MENU_ID_IMAGE or
                 info.menuItemId is MENU_ID_AUDIO or
                 info.menuItemId is MENU_ID_VIDEO
      config = {
        url: info.srcUrl,
        title: info.srcUrl
      }
    else
      config = {
        url: info.pageUrl,
        title: tab.title,
        description: info.selectionText
      }

    callback(config)
