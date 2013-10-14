var chrome = {
  commands: {
    onCommand: {
      addListener: function() {}
    }
  },
  contextMenus: {
    create: function() {},
    onClicked: {
      addListener: function() {}
    }
  },
  extension: {
    onMessage: {
      addListener: function() {}
    },
    lastError: null
  },
  runtime: {
    onMessage: {
      addListener: function() {}
    },
    onInstalled: {
      addListener: function() {}
    },
    lastError: null,
    getBackgroundPage: function() {}
  },
  tabs: {
    onUpdated: {
      addListener: function() {}
    },
    query: function() {},
    remove: function() {}
  }
};
