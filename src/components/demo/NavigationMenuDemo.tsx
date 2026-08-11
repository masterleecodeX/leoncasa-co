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

const components = siteConfig.navigation;

export default function NavigationMenuDemo({ showBackArrow = false }: { showBackArrow?: boolean }) {
  const [value, setValue] = React.useState<any>(null);

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/30 backdrop-blur-[2px] transition-all duration-500 ease-out",
          value != null ? "opacity-100" : "opacity-0 pointer-events-none"
        )} 
      />
      <NavigationMenu value={value} onValueChange={setValue} className="relative z-50">
      <NavigationMenuList>
        {showBackArrow && (
          <NavigationMenuItem>
            <Link to="/" className={cn(navigationMenuTriggerStyle(), "px-2 mr-1")}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
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
                  <div className="mt-4 mb-2 text-lg font-medium">ReUI</div>
                  <p className="text-muted-foreground text-sm leading-tight">
                    Beautifully designed components built with Tailwind CSS.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="#" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="#" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
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
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
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
        <NavigationMenuItem>
          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink render={<a href="#" />}>Components</NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>Documentation</NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>Blocks</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink render={<a href="#" className="flex flex-row items-center gap-2" />}>
                  <CircleHelpIcon />
                  Backlog
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" className="flex flex-row items-center gap-2" />}>
                  <CircleIcon />
                  To Do
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" className="flex flex-row items-center gap-2" />}>
                  <CircleCheckIcon />
                  Done
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
