import { addDecorator, configure } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import plLocaleData from 'react-intl/locale-data/pl';

addLocaleData(enLocaleData);
addLocaleData(plLocaleData);
const messages = {
  en: {
    'buttons.columns': 'Columns',
    'buttons.filter': 'Filter',
    'buttons.new': 'New',
    'buttons.close': 'Close',
    'buttons.search': 'Search',
    'buttons.import': 'Import/Export',
    'buttons.download': 'Download'
  },
  pl: {
    'buttons.columns': 'Kolumny',
    'buttons.filter': 'Filtr',
    'buttons.new': 'Nowy',
    'buttons.close': 'Zamknij',
    'buttons.search': 'Szukaj',
    'buttons.import': 'Import/Export',
    'buttons.download': 'Pobierz'
  }
};

const getMessages = locale => messages[locale];

setIntlConfig({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  getMessages
});

addDecorator(withIntl);

configure(() => require('../stories'), module);
