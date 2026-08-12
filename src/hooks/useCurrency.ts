import { useTranslation } from 'react-i18next';

// Very basic static conversion rates relative to THB (Thai Baht)
const rates = {
  THB: 1,
  USD: 0.029,
  CNY: 0.21,
  EUR: 0.027,
  JPY: 4.35,
  GBP: 0.023,
};

type SupportedCurrency = keyof typeof rates;

function getCurrencyFromLanguage(lang: string): SupportedCurrency {
  const prefix = lang.split('-')[0].toLowerCase();
  switch (prefix) {
    case 'th': return 'THB';
    case 'zh': return 'CNY';
    case 'en': return 'USD';
    case 'es': return 'EUR'; // Simplifying
    case 'fr': return 'EUR';
    case 'ja': return 'JPY';
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
