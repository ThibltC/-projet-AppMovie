import { useState } from "react";

import fr_FR from "../i18n/fr_FR";
// import us_US from "../i18n/us_US";

const defaultLanguage = "fr_FR";

const messages = {
    fr_FR,
    // us_US
};

const useTranslation = () => {
    const [language, setLanguage] = useState(defaultLanguage);
    return [
        (key, subkey) => subkey && messages[language][key] ? messages[language][key][subkey] : messages[language][key] || key, setLanguage, language
    ];
};

export default useTranslation;
