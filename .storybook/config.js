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
    'buttons.export': 'Export',
    'buttons.download': 'Download',
    'buttons.delete': 'Delete',
    'buttons.clear': 'Clear',
    'dt.page.size': 'Page size:',
    'dt.selected':
      '{numSelected, number} {numSelected, plural, one {row selected} other {rows selected} }',
    'dt.page.of': '{from}-{to} of {count}',
  },
  pl: {
    'buttons.columns': 'Kolumny',
    'buttons.filter': 'Filtr',
    'buttons.new': 'Nowy',
    'buttons.close': 'Zamknij',
    'buttons.search': 'Szukaj',
    'buttons.import': 'Import/Eksport',
    'buttons.export': 'Eksport',
    'buttons.download': 'Pobierz',
    'buttons.delete': 'Usuń',
    'buttons.clear': 'Wyczyść',
    'dt.page.size': 'Rozmiar strony:',
    'dt.selected':
      '{numSelected, number} {numSelected, plural, one {wiersz zaznaczony} few {wiersze zaznaczone} other {wierszy zaznaczonych} }',
    'dt.page.of': '{from}-{to} z {count}',
  },
};

const getMessages = locale => messages[locale];

setIntlConfig({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  getMessages,
});

addDecorator(withIntl);

configure(() => require('../stories'), module);
