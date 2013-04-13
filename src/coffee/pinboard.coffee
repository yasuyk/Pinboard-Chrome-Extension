
REGEX_SAVE_URL = /^http[s]?\:\/\/pinboard\.in\/add/
BASE_URL = 'https://pinboard.in'

pinboard.saveToPinboardPopup = (config) ->
  c = config or {}
  url = c.url
  title = c.title
  description = c.description || ''
  pinboardUrl = BASE_URL + '/add?'

  fullUrl = pinboardUrl + 'showtags=yes' + '&url=' + encodeURIComponent(url) +
  '&description=' + encodeURIComponent(description) +
  '&title=' + encodeURIComponent(title)

  window.open(fullUrl, 'Pinboard',
  'toolbar=no,scrollbars=yes,width=750,height=700')


pinboard.saveToPinboard = ->
  chrome.tabs.query {active: true, currentWindow: true}, (tabs) ->
    tab = tabs[0]

    if !tab.url.match(REGEX_SAVE_URL)
      chrome.tabs.sendMessage(
        tab.id,
        {action: 'getSelection'},
        (selection) ->
          pinboard.saveToPinboardPopup({
            url: tab.url,
            title: tab.title,
            description: selection
          }))

pinboard.readLater = ->
  chrome.tabs.query {active: true, currentWindow: true}, (tabs) ->
    tab = tabs[0]
    readlater = window.open(
      BASE_URL + '/add?later=yes&noui=yes&jump=close&url=' +
      encodeURIComponent(tab.url) + '&title=' +
      encodeURIComponent(tab.title), 'Pinboard',
     'toolbar=no')

    readlater.resizeTo 0, 0
    readlater.blur()

pinboard.unreadBookmarks = ->  window.open(BASE_URL + '/toread/')

pinboard.allBookmarks = ->  window.open(BASE_URL)

pinboard.addclickEventListeners = (doc) =>
  doc.querySelector('#saveToPinboard').addEventListener(
    'click', pinboard.saveToPinboard)
  doc.querySelector('#readLater').addEventListener(
    'click', pinboard.readLater)
  doc.querySelector('#unreadBookmarks').addEventListener(
    'click', pinboard.unreadBookmarks)
  doc.querySelector('#allBookmarks').addEventListener(
    'click', pinboard.allBookmarks)
