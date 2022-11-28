export interface Language {
  code: string;
  name: string;
}

export interface LanguageDetection {
  confidence: string;
  language: string;
}

export interface TranslatedText {
  translatedText: string;
  error?: string;
}
