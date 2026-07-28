import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import esTranslations from '../../assets/i18n/es.json';
import enTranslations from '../../assets/i18n/en.json';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>(this.getSavedLanguage());
  public currentLang$: Observable<string> = this.currentLangSubject.asObservable();

  private translations: Record<string, any> = {
    ES: esTranslations,
    EN: enTranslations,
    es: esTranslations,
    en: enTranslations
  };

  constructor() {}

  private getSavedLanguage(): string {
    const saved = localStorage.getItem('app_lang');
    return (saved === 'EN' || saved === 'en') ? 'EN' : 'ES';
  }

  get currentLang(): string {
    return this.currentLangSubject.value;
  }

  setLanguage(lang: string): void {
    const normalized = lang.toUpperCase() === 'EN' ? 'EN' : 'ES';
    localStorage.setItem('app_lang', normalized);
    this.currentLangSubject.next(normalized);
  }

  toggleLanguage(): string {
    const newLang = this.currentLang === 'ES' ? 'EN' : 'ES';
    this.setLanguage(newLang);
    return newLang;
  }

  translate(key: string, params?: Record<string, any>): string {
    if (!key) return '';
    const lang = this.currentLang;
    const dict = this.translations[lang] || this.translations['ES'];

    const keys = key.split('.');
    let value: any = dict;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value === 'string' && params) {
      Object.keys(params).forEach(pKey => {
        value = value.replace(new RegExp(`{{${pKey}}}`, 'g'), params[pKey]);
      });
    }

    return typeof value === 'string' ? value : key;
  }
}
