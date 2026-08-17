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
                      Discover premium, handcrafted furniture designed to elevate your living spaces.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Our Story" onClick={handleIntroductionClick}>
                Learn about our heritage and passion for crafting timeless furniture.
              </ListItem>
              <ListItem href="#" title="Collections" onClick={handleInstallationClick}>
                Explore our curated selection of modern and classic pieces.
              </ListItem>
              <ListItem href="#" title="Materials" onClick={handleTypographyClick}>
                Discover the premium woods, fabrics, and metals we use.
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
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[calc(100vw-3rem)] sm:w-[300px] gap-4 relative">
              <li>
                <NavigationMenuLink render={<a href="mailto:hello@leoncasa.com?subject=Website%20Inquiry&body=Hello%20LeonCasa%20Team,%0A%0A" target="_blank" rel="noopener noreferrer" />}>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">hello@leoncasa.com</div>
                </NavigationMenuLink>
                <div className="group block w-full">
                  <NavigationMenuLink render={<a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-muted-foreground">Message us on WhatsApp.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-4 w-[180px] h-[180px] bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center p-1 pointer-events-none z-[100]">
                    {/* Replace the src below with your actual QR code image path (e.g. "/qr-code.png") */}
                    <img 
                      src="https://img.sanishtech.com/u/a66b30e39d5501350f456997f10f48c1.jpg" 
                      alt="WhatsApp QR Code" 
                      className="w-full h-full object-contain rounded-sm"
                    />
                  </div>
                </div>
                <div className="group block w-full">
                  <NavigationMenuLink render={<a href="#" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WeChat</div>
                    <div className="text-muted-foreground">Connect with us on WeChat.</div>
                  </NavigationMenuLink>
                  <div className="absolute top-1/2 -translate-y-1/2 left-[100%] ml-4 w-[180px] h-[180px] bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 hidden sm:flex items-center justify-center p-1 pointer-events-none z-[100]">
                    <img 
                      src="https://img.sanishtech.com/u/c42bec16ad57b30695d1222702760bed.jpg" 
                      alt="WeChat QR Code" 
                      className="w-full h-full object-contain rounded-sm"
                    />
                  </div>
                </div>
                <NavigationMenuLink render={<a href="tel:0952595058" />}>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">095 259 5058</div>
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
