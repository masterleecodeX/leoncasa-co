import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // General
      "Home": "Home",
      "Components": "Components",
      "Docs": "Docs",
      "List": "List",
      "Simple": "Simple",
      "With Icon": "With Icon",
      "Login": "Login",
      "Account": "Account",
      "Settings": "Settings",
      "Admin Panel": "Admin Panel",
      "Logout": "Logout",
      
      // Hero10 
      "Build faster interfaces": "Build faster interfaces",
      "with": "with",
      "Ready-Made Blocks": "Ready-Made Blocks",
      "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.": "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.",
      "Get Started": "Get Started",
      "How it works": "How it works",
      
      // Hero04
      "A gallery for the work": "A gallery for the work",
      "you are proud of.": "you are proud of.",
      "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.": "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.",
      "Start your gallery": "Start your gallery",
      "See examples": "See examples",
      
      // Footer
      "Product": "Product",
      "Features": "Features",
      "Pricing": "Pricing",
      "Testimonials": "Testimonials",
      "Company": "Company",
      "FAQs": "FAQs",
      "About Us": "About Us",
      "Privacy Policy": "Privacy Policy",
      "Terms of Services": "Terms of Services",
      "Resources": "Resources",
      "Blog": "Blog",
      "Changelog": "Changelog",
      "Brand": "Brand",
      "Help": "Help"
    }
  },
  es: {
    translation: {
      "Home": "Inicio",
      "Components": "Componentes",
      "Docs": "Documentación",
      "List": "Lista",
      "Simple": "Sencillo",
      "With Icon": "Con Icono",
      "Login": "Iniciar sesión",
      "Account": "Cuenta",
      "Settings": "Ajustes",
      "Admin Panel": "Panel de control",
      "Logout": "Cerrar sesión",
      
      "Build faster interfaces": "Construye interfaces más rápido",
      "with": "con",
      "Ready-Made Blocks": "Bloques Preconstruidos",
      "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.": "Crea productos hermosos a partir de bloques de interfaz de usuario accesibles y listos para producción.",
      "Get Started": "Comenzar",
      "How it works": "Cómo funciona",
      
      "A gallery for the work": "Una galería para el trabajo",
      "you are proud of.": "del que estás orgulloso.",
      "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.": "Colecciona, organiza y publica tu arte en un espacio que se siente como un estudio.",
      "Start your gallery": "Empieza tu galería",
      "See examples": "Ver ejemplos",
      
      "Product": "Producto",
      "Features": "Características",
      "Pricing": "Precios",
      "Testimonials": "Testimonios",
      "Company": "Compañía",
      "FAQs": "Preguntas Frecuentes",
      "About Us": "Sobre nosotros",
      "Privacy Policy": "Privacidad",
      "Terms of Services": "Términos",
      "Resources": "Recursos",
      "Blog": "Blog",
      "Changelog": "Cambios",
      "Brand": "Marca",
      "Help": "Ayuda"
    }
  },
  fr: {
    translation: {
      "Home": "Accueil",
      "Components": "Composants",
      "Docs": "Documents",
      "List": "Liste",
      "Simple": "Simple",
      "With Icon": "Avec icône",
      "Login": "Connexion",
      "Account": "Compte",
      "Settings": "Paramètres",
      "Admin Panel": "Panneau d'administration",
      "Logout": "Déconnexion",
      
      "Build faster interfaces": "Créez des interfaces plus rapidement",
      "with": "avec",
      "Ready-Made Blocks": "Blocs Prêts à l'emploi",
      "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.": "Créez de superbes produits à partir de blocs d'interface utilisateur prêts pour la production.",
      "Get Started": "Commencer",
      "How it works": "Comment ça marche",
      
      "A gallery for the work": "Une galerie pour le travail",
      "you are proud of.": "dont vous êtes fier.",
      "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.": "Collectionnez, organisez et publiez votre art dans un espace qui ressemble à un studio.",
      "Start your gallery": "Démarrez votre galerie",
      "See examples": "Voir des exemples",
      
      "Product": "Produit",
      "Features": "Fonctionnalités",
      "Pricing": "Tarification",
      "Testimonials": "Témoignages",
      "Company": "Entreprise",
      "FAQs": "FAQ",
      "About Us": "À propos",
      "Privacy Policy": "Confidentialité",
      "Terms of Services": "Conditions",
      "Resources": "Ressources",
      "Blog": "Blog",
      "Changelog": "Journal",
      "Brand": "Marque",
      "Help": "Aide"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
