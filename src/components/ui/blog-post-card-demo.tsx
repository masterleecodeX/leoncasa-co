import * as React from "react";
import {
  ArticleCard,
  type ArticleCardProps,
} from "@/components/ui/blog-post-card";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export function DemoOne({ onViewPost }: { onViewPost?: (post?: any) => void }) {
  const [customPosts, setCustomPosts] = React.useState<ArticleCardProps[]>([]);

  React.useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("publishedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          publishedAt: data.publishedAt?.toDate
            ? data.publishedAt.toDate()
            : new Date(),
        } as ArticleCardProps;
      });
      setCustomPosts(posts);
    });
    return () => unsubscribe();
  }, []);

  const defaultPosts: ArticleCardProps[] = [
    {
      headline: "Shaping Tomorrow: AI & The Web",
      excerpt:
        "From automated coding assistants to intelligent design workflows, AI is redefining how developers build and ship modern applications.",
      cover:
        "https://framerusercontent.com/images/HeBZhwOVxQyFU36pkfQyEMExIOg.png?width=8192&height=4608",
      tag: "Innovation",
      readingTime: 420,
      writer: "John Doe",
      publishedAt: new Date("2025-09-01"),
      layout: "vertical",
    },
    {
      layout: "horizontal",
      headline: "The Future of UI Components",
      excerpt:
        "Discover how AI and modern tooling are transforming the way we build, share, and maintain UI components across the web. The future of front-end is changing rapidly.",
      cover:
        "https://framerusercontent.com/images/HeBZhwOVxQyFU36pkfQyEMExIOg.png?width=8192&height=4608",
      tag: "Design",
      readingTime: 300,
      writer: "Jane Smith",
      publishedAt: new Date("2025-09-15"),
    },
  ];

  const allPosts = [...customPosts, ...defaultPosts];

  return (
    <div className="flex flex-col w-full justify-start px-4 md:px-8 lg:px-12 xl:px-16 bg-transparent mt-12 max-w-[1600px] mx-auto gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {allPosts.map((post, idx) => {
          const isHorizontal = post.layout === "horizontal";
          return (
            <div
              key={idx}
              className={
                isHorizontal
                  ? "lg:col-span-2 md:col-span-2 col-span-1"
                  : "col-span-1"
              }
            >
              <ArticleCard {...post} onView={() => onViewPost?.(post)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
