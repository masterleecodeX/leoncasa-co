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

const components = [
  {
    title: 'Alert Dialog',
    href: '#',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '#',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '#',
    description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '#',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '#',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '#',
    description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

export function NavigationMenuDemo({ onHome }: { onHome?: () => void }) {
  const [value, setValue] = React.useState('');

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 ease-in-out pointer-events-none",
          value ? "opacity-100 bg-white/20 backdrop-blur-[2px]" : "opacity-0 bg-transparent backdrop-blur-none"
        )}
      />
      <div className="flex items-center gap-0 sm:gap-6 relative z-50 overflow-x-auto no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] w-full">
        
      {onHome && ( <button onClick={onHome} className="flex-shrink-0 flex items-center justify-center p-1 sm:p-2 rounded-md hover:bg-gray-100 transition-colors" > <ChevronLeft className="w-5 h-5 text-gray-600" /> </button> )} <NavigationMenu value={value} onValueChange={setValue}>
        <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[85vw] sm:w-auto gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white text-left">
              <li className="row-span-3">
                <NavigationMenuLink
                  render={
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                      href="#"
                    />
                  }
                >
                  <div className="mt-4 mb-2 text-lg font-medium">ReUI</div>
                  <p className="text-muted-foreground text-sm leading-tight text-gray-500">
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
            <ul className="grid w-[85vw] sm:w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white text-left">
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
            <ul className="grid w-[85vw] sm:w-[300px] gap-4 bg-white text-left">
              <li>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Components</div>
                  <div className="text-muted-foreground text-gray-500 text-sm">Browse all components in the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Documentation</div>
                  <div className="text-muted-foreground text-gray-500 text-sm">Learn how to use the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink render={<a href="#" />}>
                  <div className="font-medium">Blog</div>
                  <div className="text-muted-foreground text-gray-500 text-sm">Read our latest blog posts.</div>
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
    </>
  );
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<a href={href} />}>
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="text-muted-foreground text-gray-500 line-clamp-2 text-sm leading-snug mt-1">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}
