pinboard.contextMenus = {}

SAVE_TO_PINBOARD = 'Save to Pinboard'
SAVE_SELECTION_PINBOARD = 'Save Selection to Pinboard'
SAVE_URL_TO_PINBOARD = 'Save URL to Pinboard'
SAVE_IMAGE_URL_TO_PINBOARD = 'Save Image URL to Pinboard'
SAVE_AUDIO_URL_TO_PINBOARD = 'Save Audio URL to Pinboard'
SAVE_VIDEO_URL_TO_PINBOARD = 'Save Video URL to Pinboard'

MENU_ID_PAGE = 'page'
MENU_ID_SELECTION = 'selection'
MENU_ID_LINK = 'link'
MENU_ID_IMAGE = 'image'
MENU_ID_AUDIO = 'audio'
MENU_ID_VIDEO = 'video'
callback = null

pinboard.contextMenus.setup = (onClickCallback) ->
  chrome.contextMenus.create({
    'title': SAVE_TO_PINBOARD,
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

  chrome.contextMenus.onClicked.addListener(pinboard.contextMenus.onclick)
  callback = onClickCallback


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
