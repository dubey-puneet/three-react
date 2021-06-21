import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "hebrew",
  resources: {
    en: {
      translations: require("../translations/en/common.json")
    },
    hebrew: {
      translations: require("../translations/hebrew/common.json")
    }
  },
  ns: ["translations"],
  defaultNS: "translations"
})

i18n.languages = ["en", "hebrew"]

export default i18n
