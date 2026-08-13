export const siteConfig = {
  hero: {
    title: 'Build faster interfaces',
    titleLine2Prefix: 'with',
    titleHighlight: 'Ready-Made Blocks',
    description:
      'Compose beautiful products from accessible, production-ready UI blocks that drop straight into your codebase.',
    socialProof: '',
    images: [
      'https://images.unsplash.com/photo-1685013640715-8701bbaa2207?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1746467364902-ab40952e33fe?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    imageAlts: ['Design detail', 'Product interface', 'Layout composition'],
    primaryCTA: {
      text: 'Get Started',
      link: '#',
    },
    secondaryCTA: {
      text: 'How it works',
      link: '#',
    },
  },
  scrollText: [
    "The text gradient scroll component is designed to enhance user interaction by providing a visually dynamic effect as the user scrolls through the text. Unlike static text, this effect offers a more engaging visual experience with smooth color transitions that change as the text is scrolled. The animated gradient shifts add a modern and interactive touch to the user experience. This example was created using Tailwind CSS and Framer Motion.",
    "By combining scroll-linked animations with elegant typography, we can create immersive storytelling experiences. Every word reveals itself naturally as you progress down the page, drawing the reader's attention to key focal points. This technique is especially effective for landing pages, product showcases, and interactive portfolios where capturing user engagement is paramount.",
    "Design is not just what it looks like and feels like. Design is how it works. Our approach to modern web development focuses on crafting experiences that are not only aesthetically pleasing but also performant and accessible to everyone. We believe that every interaction should feel natural, responsive, and delightful.",
    "With tools like React, Tailwind CSS, and Framer Motion, developers have unprecedented power to bring creative visions to life. The boundary between design and engineering continues to blur, allowing for more seamless collaboration and innovative solutions that push the web forward. The future of user interfaces is motion-driven, context-aware, and beautifully fluid.",
  ],
  navigation: [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description: "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description: "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ],
  footer: {
    copyright: `Empowering teams to build better software, faster. © ${new Date().getFullYear()} Your Company Name. All rights reserved.`,
    links: [
      {
        label: 'Product',
        links: [
          { title: 'Features', href: '#features' },
          { title: 'Pricing', href: '#pricing' },
          { title: 'Testimonials', href: '#testimonials' },
          { title: 'Integration', href: '/' },
        ],
      },
      {
        label: 'Company',
        links: [
          { title: 'FAQs', href: '/faqs' },
          { title: 'About Us', href: '/about' },
          { title: 'Privacy Policy', href: '/privacy' },
          { title: 'Terms of Services', href: '/terms' },
        ],
      },
      {
        label: 'Resources',
        links: [
          { title: 'Blog', href: '/blog' },
          { title: 'Changelog', href: '/changelog' },
          { title: 'Brand', href: '/brand' },
          { title: 'Help', href: '/help' },
        ],
      },
      {
        label: 'Social Links',
        links: [
          { title: 'Facebook', href: 'https://www.facebook.com/share/1cQCuQgr3P/?mibextid=wwXIfr', icon: 'FacebookIcon' },
          { title: 'Instagram', href: 'https://www.instagram.com/leoncasa_co?igsh=MXFibHl0NzIxOGFpMQ%3D%3D&utm_source=qr', icon: 'InstagramIcon' },
          { title: 'Tiktok', href: 'https://www.tiktok.com/@leoncasa.co?_r=1&_t=ZS-98lFksXCTRc', icon: 'TiktokIcon' },
          { title: 'LinkedIn', href: 'YOUR_LINKEDIN_LINK_HERE', icon: 'LinkedinIcon' },
        ],
      },
    ]
  }
};
