import React from "react";
import { motion } from "motion/react";
import { Header, type HeaderProps } from "@/components/layout/Header";
import { Hero04 } from "@/components/ui/hero-04";
import { ArticleCardProps } from "@/components/ui/blog-post-card";

export interface PostViewProps extends HeaderProps {
  post?: ArticleCardProps;
}

export function PostView(props: PostViewProps) {
  const { post } = props;

  // Provide fallbacks if no post is selected
  const title = post?.headline || "A gallery for the work";
  const description =
    post?.excerpt ||
    "Collect, arrange, and publish your art in a space that feels like a studio, not a spreadsheet.";

  const defaultImage1 =
    "https://images.unsplash.com/photo-1746467364902-ab40952e33fe?q=80&w=1131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const defaultImage2 =
    "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const primaryImage = post?.images?.[0] || post?.cover || defaultImage1;
  const secondaryImage =
    post?.images?.[1] ||
    (post?.images?.length === 1 ? post.images[0] : defaultImage2);
  const washImage =
    post?.images?.[2] ||
    "https://images.unsplash.com/photo-1685013640715-8701bbaa2207?q=80&w=2198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <motion.div
      key="post"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <main className="min-h-screen w-full bg-[#f4f4f5] flex flex-col items-center justify-start relative pb-32 overflow-x-hidden">
        <Header {...props} />
        <div className="w-full bg-white mt-12 pb-24 shadow-sm rounded-3xl border mx-4 md:mx-8 lg:mx-12 xl:mx-16 max-w-[1600px] flex-1 overflow-hidden">
          <Hero04
            title={title}
            description={description}
            primaryImage={primaryImage}
            secondaryImage={secondaryImage}
            washImage={washImage}
            animation="subtle"
            primaryCTA={{
              ctaEnabled: true,
              text: "Start your gallery",
              link: "#",
              variant: "default",
              size: "default",
            }}
            secondaryCTA={{
              ctaEnabled: true,
              text: "See examples",
              link: "#",
              variant: "link",
            }}
          />
        </div>
      </main>
    </motion.div>
  );
}
