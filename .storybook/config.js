import { addDecorator, configure } from "@storybook/react";
import { setIntlConfig, withIntl } from "storybook-addon-intl";
import { addLocaleData } from "react-intl";
import enLocaleData from "react-intl/locale-data/en";
import plLocaleData from "react-intl/locale-data/pl";

addLocaleData(enLocaleData);
addLocaleData(plLocaleData);
const messages = {
  en: {
    "buttons.columns": "Columns",
    "buttons.filter": "Filter",
    "buttons.new": "New"
  },
  pl: {
    "buttons.columns": "Kolumny",
    "buttons.filter": "Filtr",
    "buttons.new": "Nowy"
  }
};

const getMessages = locale => messages[locale];

setIntlConfig({
  locales: ["en", "pl"],
  defaultLocale: "en",
  getMessages
});

addDecorator(withIntl);

configure(() => require("../stories"), module);
