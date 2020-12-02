const { resolve } = require('path');

const separator = {
  label: 'separator',
  type: 'separator',
};

const noDataItem = {
  label: 'Sem dados copiados',
  type: 'normal',
  enabled: false,
};

const MAX_MENU_ITEM_NUMBER_OF_CARACTERS = 36;
const TOP_MENU_ICON_URL = resolve(__dirname, 'assets', 'iconTemplate.png');

module.exports = {
  separator,
  noDataItem,
  MAX_MENU_ITEM_NUMBER_OF_CARACTERS,
  TOP_MENU_ICON_URL,
};
