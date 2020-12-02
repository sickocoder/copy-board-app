const { Notification, Menu, clipboard, dialog } = require('electron');
const { TOP_MENU_ICON_URL } = require('./constants');

const copyItem = (text) => {
  clipboard.writeText(text);

  const myNotification = new Notification('CopyBoard', {
    body: 'Text copied',
  });

  myNotification.show();
};

const setDefaultItems = (tray, items) => {
  const contextMenu = Menu.buildFromTemplate(items);
  tray.setContextMenu(contextMenu);
};

const showExitDialog = () =>
  dialog
    .showMessageBox(undefined, {
      icon: TOP_MENU_ICON_URL,
      type: 'question',
      title: 'Test',
      message: 'this is a test',
      buttons: ['EXIT', 'CANCEL'],
    })
    .then((data) => data.response);

module.exports = { copyItem, setDefaultItems, showExitDialog };
