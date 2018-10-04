import { addDecorator, configure } from "@storybook/react";
import { setIntlConfig, withIntl } from "storybook-addon-intl";
import { addLocaleData } from "react-intl";
import enLocaleData from "react-intl/locale-data/en";
import deLocaleData from "react-intl/locale-data/de";

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);
const messages = {
  en: { "buttons.columns": "Click me!" },
  de: { "buttons.columns": "Klick mich!" }
};

const getMessages = locale => messages[locale];

setIntlConfig({
  locales: ["en", "de"],
  defaultLocale: "en",
  getMessages
});

addDecorator(withIntl);

configure(() => require("../stories"), module);
