import React, { useState, createContext, useContext, ReactNode } from "react";
import { Language } from "../utils/types";

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Create a context with a default value
const LanguageContext = createContext<LanguageContextProps>({
  language: "en", // default language
  setLanguage: () => {}, // noop function for default
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
