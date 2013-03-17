var pinboard = {};

const REGEX_SAVE_URL = /^http[s]?\:\/\/pinboard\.in\/add/;

function saveToPinboard() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];

    if (!tab.url.match(REGEX_SAVE_URL)) {
      chrome.tabs.sendMessage(
        tab.id,
        {action: 'getSelection'},
        function(selection) {
          saveToPinboardPopup({
            url: tab.url,
            title: tab.title,
            description: selection
          });
        });
    }
  });
}

const BASE_URL = 'https://pinboard.in';

function saveToPinboardPopup(config) {
  var c = config || {},
      url = c.url,
      title = c.title,
      description = c.description || '',
      pinboardUrl = BASE_URL + '/add?',
      fullUrl;

  fullUrl = pinboardUrl + 'showtags=yes' + '&url=' + encodeURIComponent(url) +
    '&description=' + encodeURIComponent(description) +
    '&title=' + encodeURIComponent(title);

  open(fullUrl, 'Pinboard',
       'toolbar=no,scrollbars=yes,width=750,height=700');
}

function readLater() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];

    var readlater = open(
      BASE_URL + '/add?later=yes&noui=yes&jump=close&url=' +
        encodeURIComponent(tab.url) + '&title=' +
        encodeURIComponent(tab.title), 'Pinboard',
      'toolbar=no');

    readlater.resizeTo(0, 0);
    readlater.blur();
  });
}

function unreadBookmarks() {
  open(BASE_URL + '/toread/');
}

function allBookmarks() {
  open(BASE_URL);
}
