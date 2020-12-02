const { app, Tray, Menu } = require('electron');
const clipboardWatcher = require('electron-clipboard-watcher');

const { copyItem, setDefaultItems, showExitDialog } = require('./utils');
const {
  separator,
  noDataItem,
  MAX_MENU_ITEM_NUMBER_OF_CARACTERS,
  TOP_MENU_ICON_URL,
} = require('./constants');

let copiedData = [];

const exitButton = {
  label: 'Exit',
  type: 'normal',
  click: () =>
    showExitDialog().then((id) => {
      if (id === 0) app.quit();
    }),
};

const clearMenu = () => {
  copiedData = [];
};

const addTrayMenuItem = (tray, menuDataArray) => {
  const data = menuDataArray.map((item, index) => ({
    label:
      item.length > MAX_MENU_ITEM_NUMBER_OF_CARACTERS
        ? item.substring(0, MAX_MENU_ITEM_NUMBER_OF_CARACTERS).trim() + '...'
        : item.trim(),
    type: 'normal',
    click: () => copyItem(copiedData[index]),
  }));

  data.push(separator);

  data.push({
    label: 'Clear',
    type: 'normal',
    click: () => {
      clearMenu();
      setDefaultItems(tray, [noDataItem, exitButton]);
    },
  });

  data.push(exitButton);

  const contextMenu = Menu.buildFromTemplate(data);
  tray.setContextMenu(contextMenu);
};

app.dock.hide();

app.on('ready', () => {
  const tray = new Tray(TOP_MENU_ICON_URL);
  tray.setToolTip('CopyBoard Application');

  setDefaultItems(tray, [noDataItem, exitButton]);

  clipboardWatcher({
    watchDelay: 500,
    onTextChange: function (text) {
      if (!copiedData.includes(text)) copiedData.push(text);
      addTrayMenuItem(tray, copiedData);
    },
  });
});
