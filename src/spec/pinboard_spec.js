describe('pinboad', function() {
  var spyEvent;
  beforeEach(function() {
    loadFixtures('pinboard_fixture.html');
  });

  it('should load a fixture', function() {
    expect($('#saveToPinboard')).toExist();
  });

  function eventFire(selector, etype){
    var el = document.querySelector(selector);
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }

  it('should add click event listeners', function() {

    spyOn(pinboard, 'saveToPinboard');
    spyOn(pinboard, 'readLater');
    spyOn(pinboard, 'unreadBookmarks');
    spyOn(pinboard, 'allBookmarks');

    pinboard.addclickEventListeners(document);
    eventFire('#saveToPinboard', 'click');
    expect(pinboard.saveToPinboard).toHaveBeenCalled();
    eventFire('#readLater', 'click');
    expect(pinboard.readLater).toHaveBeenCalled();
    eventFire('#unreadBookmarks', 'click');
    expect(pinboard.unreadBookmarks).toHaveBeenCalled();
    eventFire('#allBookmarks', 'click');
    expect(pinboard.readLater).toHaveBeenCalled();
  });
});
