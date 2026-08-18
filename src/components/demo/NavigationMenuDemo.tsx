import whatsappQr from '/whatsapp-qr.jpg';
import wechatQr from '/wechat-qr.jpg';
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
    
    // Preload QR codes for instant rendering
    const qr1 = new Image();
    qr1.src = "https://cdn.phototourl.com/free/2026-08-18-0523a344-3715-4ce0-a37d-091333612cc1.jpg";
    const qr2 = new Image();
    qr2.src = "https://cdn.phototourl.com/free/2026-08-18-fb0a63a4-274c-4df6-a82e-e16d729f07cc.jpg";
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
        
        <div className="w-[calc(100%+2rem)] sm:w-full overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
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
            <button onClick={(e) => { e.preventDefault(); navigate('/'); }} className={cn(navigationMenuTriggerStyle(), "px-3 py-2 mr-1 cursor-pointer bg-slate-50/50 hover:bg-slate-100 rounded-md transition-colors relative z-50 focus:outline-none ")}>
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
                      Quality. Craftsmanship. Confidence.
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
          <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
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
          <NavigationMenuLink render={<a href="#story-section" onClick={(e) => { e.preventDefault(); document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' }); }} className={navigationMenuTriggerStyle()} />}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[calc(100vw-3rem)] sm:w-[300px] gap-4 relative">
              <li>
                <NavigationMenuLink render={<a href={`mailto:hello@leoncasa.com?subject=Website%20Inquiry&body=${"Dear%20LeonCasa%20Team%2C%0A%0A%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%0A%0ACUSTOMER%20INFORMATION%0A%0AFull%20Name%3A%0APreferred%20Name%3A%0AContact%20Method%3A%0AEmail%3A%0A%0A%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%0A%0APRODUCT%2001%0A%0AProduct%20Code%20%2F%20Name%3A%0AQuantity%3A%0AColor%20%2F%20Finish%3A%0A%0APRODUCT%2002%0A%0AProduct%20Code%20%2F%20Name%3A%0AQuantity%3A%0AColor%20%2F%20Finish%3A%0A%0APRODUCT%2003%0A%0AProduct%20Code%20%2F%20Name%3A%0AQuantity%3A%0AColor%20%2F%20Finish%3A%0A%0A%2B%20Add%20Additional%20Products%20Below%0A%0A%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%0A%0AINQUIRY%20DETAILS%0A%0AMessage%20%2F%20Additional%20Requirements%3A%0A%0A%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%E2%94%80%0A%0A(Thank%20you%20for%20your%20inquiry.%20Our%20team%20will%20review%20the%20details%20and%20contact%20you%20shortly.)%0A%0AKind%20regards%2C%0ALeonCasa%20%26%20Co.%0AQuality.%20Craftsmanship.%20Confidence."}`} target="_blank" rel="noopener noreferrer" />}>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">hello@leoncasa.com</div>
                </NavigationMenuLink>
                <div className="group block w-full">
                  <NavigationMenuLink render={<a href="https://wa.me/66952595058" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-muted-foreground">Message us on WhatsApp.</div>
                  </NavigationMenuLink>
                  <div className="hidden sm:flex absolute top-1/2 left-[100%] -translate-y-1/2 ml-4 w-[180px] h-[180px] bg-white rounded-lg shadow-xl border border-gray-100 items-center justify-center p-1 pointer-events-none z-[100] opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-3 group-hover:translate-x-0">
                    {/* Replace the src below with your actual QR code image path (e.g. "/qr-code.png") */}
                    <img 
                      src="https://cdn.phototourl.com/free/2026-08-18-0523a344-3715-4ce0-a37d-091333612cc1.jpg" 
                      alt="https://cdn.phototourl.com/free/2026-08-18-01b9243f-95c9-4e43-ad9f-bebe69cad8c5.jpg" 
                      className="w-full h-full object-contain rounded-sm"
                    />
                  </div>
                </div>
                <div className="group block w-full">
                  <NavigationMenuLink render={<a href="weixin://dl/chat?66952595058" target="_blank" rel="noopener noreferrer" />}>
                    <div className="font-medium">WeChat</div>
                    <div className="text-muted-foreground">Connect with us on WeChat.</div>
                  </NavigationMenuLink>
                  <div className="hidden sm:flex absolute top-1/2 left-[100%] -translate-y-1/2 ml-4 w-[180px] h-[180px] bg-white rounded-lg shadow-xl border border-gray-100 items-center justify-center p-1 pointer-events-none z-[100] opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-3 group-hover:translate-x-0">
                    <img 
                      src="https://cdn.phototourl.com/free/2026-08-18-fb0a63a4-274c-4df6-a82e-e16d729f07cc.jpg" 
                      alt="https://cdn.phototourl.com/free/2026-08-18-0523a344-3715-4ce0-a37d-091333612cc1.jpg" 
                      className="w-full h-full object-contain rounded-sm"
                    />
                  </div>
                </div>
                <NavigationMenuLink render={<a href="tel:0952595058" />}>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">095 259 5058</div>
                </NavigationMenuLink>
                <div className="flex sm:hidden items-center justify-center gap-6 pt-3 pb-1 mt-1 border-t border-gray-100/60">
                   <div className="flex flex-col items-center gap-1.5">
                      <div className="w-[100px] h-[100px] bg-white rounded-md shadow-sm border border-gray-100 p-1">
                        <img src="https://cdn.phototourl.com/free/2026-08-18-0523a344-3715-4ce0-a37d-091333612cc1.jpg" alt="WhatsApp QR" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">WhatsApp</span>
                   </div>
                   <div className="flex flex-col items-center gap-1.5">
                      <div className="w-[100px] h-[100px] bg-white rounded-md shadow-sm border border-gray-100 p-1">
                        <img src="https://cdn.phototourl.com/free/2026-08-18-fb0a63a4-274c-4df6-a82e-e16d729f07cc.jpg" alt="WeChat QR" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">WeChat</span>
                   </div>
                </div>
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
