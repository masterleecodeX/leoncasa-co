import { useTranslation } from 'react-i18next';

// Very basic static conversion rates relative to THB (Thai Baht)
const rates = {
  THB: 1,
  USD: 0.029,
  CNY: 0.21,
  EUR: 0.027,
  JPY: 4.35,
  GBP: 0.023,
  KRW: 38.6,
  INR: 2.4,
  AED: 0.11,
  RUB: 2.65,
  BRL: 0.14,
  VND: 712.5,
  IDR: 450.2,
  TRY: 0.9,
};

type SupportedCurrency = keyof typeof rates;

function getCurrencyFromLanguage(lang: string): SupportedCurrency {
  const prefix = lang.split('-')[0].toLowerCase();
  switch (prefix) {
    case 'th': return 'THB';
    case 'zh': return 'CNY';
    case 'en': return 'USD';
    case 'es': return 'EUR';
    case 'fr': return 'EUR';
    case 'de': return 'EUR';
    case 'it': return 'EUR';
    case 'ja': return 'JPY';
    case 'ko': return 'KRW';
    case 'hi': return 'INR';
    case 'ar': return 'AED';
    case 'ru': return 'RUB';
    case 'pt': return 'BRL';
    case 'vi': return 'VND';
    case 'id': return 'IDR';
    case 'tr': return 'TRY';
    default: return 'USD';
  }
}

export function useCurrency() {
  const { i18n } = useTranslation();
  
  // Use current i18n language or fallback to browser language
  const currentLang = i18n.language || navigator.language || 'en';
  const targetCurrency = getCurrencyFromLanguage(currentLang);
  const rate = rates[targetCurrency];

  const formatPrice = (basePriceInTHB: number) => {
    const converted = basePriceInTHB * rate;
    return new Intl.NumberFormat(currentLang, {
      style: 'currency',
      currency: targetCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(converted);
  };

  return { formatPrice, targetCurrency };
}
