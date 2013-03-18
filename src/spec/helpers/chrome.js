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
