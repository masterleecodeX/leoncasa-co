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
  },
  zh: {
    translation: {
      "Home": "首页",
      "Components": "组件",
      "Docs": "文档",
      "List": "列表",
      "Simple": "简单",
      "With Icon": "带图标",
      "Login": "登录",
      "Account": "帐户",
      "Settings": "设置",
      "Admin Panel": "管理面板",
      "Logout": "退出",
      "Build faster interfaces": "更快构建界面",
      "with": "使用",
      "Ready-Made Blocks": "现成模块",
      "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.": "使用可访问的、可用于生产的 UI 模块组合精美产品，直接放入代码库。",
      "Get Started": "开始使用",
      "How it works": "工作原理",
      "A gallery for the work": "为您的作品提供画廊",
      "you are proud of.": "让您引以为豪。",
      "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.": "在一个像工作室而不是电子表格的空间中收集、整理和发布您的艺术作品。",
      "Start your gallery": "开始您的画廊",
      "See examples": "查看示例",
      "Product": "产品",
      "Features": "功能",
      "Pricing": "定价",
      "Testimonials": "推荐",
      "Company": "公司",
      "FAQs": "常见问题",
      "About Us": "关于我们",
      "Privacy Policy": "隐私政策",
      "Terms of Services": "服务条款",
      "Resources": "资源",
      "Blog": "博客",
      "Changelog": "更新日志",
      "Brand": "品牌",
      "Help": "帮助"
    }
  },
  th: {
    translation: {
      "Home": "หน้าแรก",
      "Components": "ส่วนประกอบ",
      "Docs": "เอกสารประกอบ",
      "List": "รายการ",
      "Simple": "เรียบง่าย",
      "With Icon": "พร้อมไอคอน",
      "Login": "เข้าสู่ระบบ",
      "Account": "บัญชี",
      "Settings": "การตั้งค่า",
      "Admin Panel": "แผงควบคุม",
      "Logout": "ออกจากระบบ",
      "Build faster interfaces": "สร้างอินเทอร์เฟซเร็วขึ้น",
      "with": "ด้วย",
      "Ready-Made Blocks": "บล็อกสำเร็จรูป",
      "Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.": "ประกอบผลิตภัณฑ์ที่สวยงามจากบล็อก UI ที่พร้อมใช้งานจริง ซึ่งใส่ลงในโค้ดของคุณได้โดยตรง",
      "Get Started": "เริ่มต้นใช้งาน",
      "How it works": "วิธีการทำงาน",
      "A gallery for the work": "แกลเลอรีสำหรับผลงาน",
      "you are proud of.": "ที่คุณภาคภูมิใจ",
      "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.": "รวบรวม จัดเรียง และเผยแพร่งานศิลปะของคุณในพื้นที่ที่ให้ความรู้สึกเหมือนสตูดิโอ",
      "Start your gallery": "เริ่มแกลเลอรีของคุณ",
      "See examples": "ดูตัวอย่าง",
      "Product": "สินค้า",
      "Features": "คุณสมบัติ",
      "Pricing": "ราคา",
      "Testimonials": "คำรับรอง",
      "Company": "บริษัท",
      "FAQs": "คำถามที่พบบ่อย",
      "About Us": "เกี่ยวกับเรา",
      "Privacy Policy": "นโยบายความเป็นส่วนตัว",
      "Terms of Services": "ข้อกำหนดการใช้บริการ",
      "Resources": "แหล่งข้อมูล",
      "Blog": "บล็อก",
      "Changelog": "บันทึกการเปลี่ยนแปลง",
      "Brand": "แบรนด์",
      "Help": "ความช่วยเหลือ"
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
