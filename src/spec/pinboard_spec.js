describe('pinboad', function() {
  var spyEvent;
  beforeEach(function() {
    loadFixtures('pinboard_fixture.html');
  });

  it('should load a fixture', function() {
    expect($('#saveToPinboard')).toExist();
  });

  it('should add click event listeners', function() {

    spyOn(pinboard, 'saveToPinboard');
    spyOn(pinboard, 'readLater');
    spyOn(pinboard, 'unreadBookmarks');
    spyOn(pinboard, 'allBookmarks');

    pinboard.addclickEventListeners(document);
    $('#saveToPinboard').click();
    expect(pinboard.saveToPinboard).toHaveBeenCalled();
    $('#readLater').click();
    expect(pinboard.readLater).toHaveBeenCalled();
    $('#unreadBookmarks').click();
    expect(pinboard.unreadBookmarks).toHaveBeenCalled();
    $('#allBookmarks').click();
    expect(pinboard.readLater).toHaveBeenCalled();
  });
});
