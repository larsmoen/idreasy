import { useState } from "react";
import translations from "../utils/translations";
import { Language } from "../utils/types";

const useLanguage = (initialLanguage: Language = "nn") => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return { language, setLanguage, t };
};

export default useLanguage;
