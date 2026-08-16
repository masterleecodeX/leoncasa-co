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
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { useNavigate, useLocation } from 'react-router-dom';

const components = siteConfig.navigation;
const MENU_IMAGE_URL = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=640&h=640&fit=crop&q=70&auto=format";

export default function NavigationMenuDemo({ showBackArrow = false }: { showBackArrow?: boolean }) {
  const [value, setValue] = React.useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Preload the image so it appears instantly when the dropdown opens
    const img = new Image();
    img.src = MENU_IMAGE_URL;
  }, []);

  const handleIntroductionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setValue(null); // Close the menu
  };

  const handleInstallationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/get-started') {
      navigate('/get-started');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setValue(null); // Close the menu
  };

  const handleTypographyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/get-started') {
      navigate('/get-started', { state: { scrollTo: 'installation-section' } });
    } else {
      const el = document.getElementById('installation-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setValue(null); // Close the menu
  };

  return (
    <>
      <div className="relative w-full max-w-[100vw] sm:max-w-none flex-1 min-w-0">
        
        <div className="w-[calc(100%+2rem)] sm:w-full overflow-x-auto [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          <div 
            className={cn(
              "fixed inset-0 z-40 bg-background/30 backdrop-blur-[2px] transition-all duration-500 ease-out",
              value != null ? "opacity-100" : "opacity-0 pointer-events-none"
            )} 
          />
          <NavigationMenu value={value} onValueChange={setValue} className="relative z-50 min-w-max mx-auto md:mx-0">
      <NavigationMenuList className="flex-nowrap justify-start">
        {showBackArrow && (
          <NavigationMenuItem>
            <button onClick={() => navigate(-1)} className={cn(navigationMenuTriggerStyle(), "px-2 mr-1 cursor-pointer bg-transparent border-0")}>
              <ChevronLeft className="h-4 w-4" />
            </button>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 w-[calc(100vw-3rem)] sm:w-[400px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink
                  render={
                    <a
                      className="relative flex h-full w-full flex-col justify-end rounded-md p-6 no-underline outline-hidden select-none focus:shadow-md overflow-hidden"
                      href="#"
                    />
                  }
                >
                  <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url("${MENU_IMAGE_URL}")` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-0"></div>
                  <div className="relative z-10">
                    <div className="mt-4 mb-2 text-lg font-medium text-white">LeonCasa & Co.</div>
                    <p className="text-white/80 text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Introduction" onClick={handleIntroductionClick}>
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="#" title="Installation" onClick={handleInstallationClick}>
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="#" title="Typography" onClick={handleTypographyClick}>
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[calc(100vw-3rem)] sm:w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[calc(100vw-3rem)] sm:w-[300px] gap-4">
              <li>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Components</div>
                  <div className="text-muted-foreground">Browse all components in the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Documentation</div>
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
