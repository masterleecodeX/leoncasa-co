import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu-1';
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const components = siteConfig.navigation;

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文 (Chinese)' },
  { code: 'th', label: 'ภาษาไทย (Thai)' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'ja', label: '日本語 (Japanese)' },
  { code: 'ko', label: '한국어 (Korean)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ar', label: 'العربية (Arabic)' },
  { code: 'ru', label: 'Русский (Russian)' },
  { code: 'pt', label: 'Português (Portuguese)' },
  { code: 'de', label: 'Deutsch (German)' },
  { code: 'it', label: 'Italiano (Italian)' },
  { code: 'vi', label: 'Tiếng Việt (Vietnamese)' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'tr', label: 'Türkçe (Turkish)' }
];


export default function NavigationMenuDemo({ showBackArrow = false }: { showBackArrow?: boolean }) {
  const [value, setValue] = React.useState<any>(null);
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="relative w-full max-w-[100vw] sm:max-w-none flex-1 min-w-0">
        
        <div className="w-[calc(100%+2rem)] sm:w-full overflow-x-auto [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          <NavigationMenu value={value} onValueChange={setValue} className="relative z-50 min-w-max mx-auto md:mx-0">
      <NavigationMenuList className="flex-nowrap justify-start">
        {showBackArrow && (
          <NavigationMenuItem>
            <Link to="/" className={cn(navigationMenuTriggerStyle(), "px-2 mr-1")}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("Home") || "Home"}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink
                  render={
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="#"
                    />
                  }
                >
                  <div className="mt-4 mb-2 text-lg font-medium">{t("ReUI") || "ReUI"}</div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    {t("Beautifully designed components built with Tailwind CSS.") || "Beautifully designed components built with Tailwind CSS."}
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title={t("Introduction")}>
                {t("Re-usable components built using Radix UI and Tailwind CSS.")}
              </ListItem>
              <ListItem href="#" title={t("Installation")}>
                {t("How to install dependencies and structure your app.")}
              </ListItem>
              <ListItem href="#" title={t("Typography")}>
                {t("Styles for headings, paragraphs, lists...etc")}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('Language') || 'Language'}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[220px] gap-1 p-3 max-h-[350px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-800 [&::-webkit-scrollbar-thumb]:rounded-full">
              {[
                ...LANGUAGES.filter(lang => lang.code === (i18n.language || 'en')),
                ...LANGUAGES.filter(lang => lang.code !== (i18n.language || 'en'))
              ].map((lang) => (
                <li key={lang.code}>
                  <NavigationMenuLink render={<button onClick={() => i18n.changeLanguage(lang.code)} className="w-full text-left" />}>
                    <div className="flex flex-row items-center justify-between w-full py-1">
                      <span className="font-medium text-sm text-muted-foreground">{lang.label}</span>
                      {i18n.language === lang.code && <CircleCheckIcon className="w-3 h-3 text-green-500" />}
                    </div>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("Components") || "Components"}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink render={<a href="#" className={navigationMenuTriggerStyle()} />}>
            {t("Docs") || "Docs"}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("List") || "List"}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">{t("Components")}</div>
                  <div className="text-muted-foreground">Browse all components in the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">{t("Docs")}</div>
                  <div className="text-muted-foreground">Learn how to use the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Blog</div>
                  <div className="text-muted-foreground">Read our latest blog posts.</div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("Simple") || "Simple"}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink render={<a href="#" />}>{t("Components")}</NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>{t("Docs")}</NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>Blocks</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("With Icon") || "With Icon"}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink render={<a href="#" className="flex flex-row items-center gap-2" />}>
                  <CircleHelpIcon />
                  {t("Backlog")}
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" className="flex flex-row items-center gap-2" />}>
                  <CircleIcon />
                  {t("To Do")}
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" className="flex flex-row items-center gap-2" />}>
                  <CircleCheckIcon />
                  {t("Done")}
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPositioner>
        <NavigationMenuPopup />
      </NavigationMenuPositioner>
    </NavigationMenu>
    </div>
    </div>
    </>
  );
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<a href={href} />}>
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}
