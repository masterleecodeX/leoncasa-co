import * as React from "react";
import {
  ArticleCard,
  type ArticleCardProps,
} from "@/components/ui/blog-post-card";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export function DemoOne({ onViewPost }: { onViewPost?: (post?: any) => void }) {
  const [customPosts, setCustomPosts] = React.useState<ArticleCardProps[]>(() => {
    try {
      const cached = localStorage.getItem("cachedPosts");
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed.map((p: any) => ({
          ...p,
          publishedAt: p.publishedAt ? new Date(p.publishedAt) : new Date(),
        }));
      }
    } catch (e) {}
    return [];
  });

  React.useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("publishedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          headline: data.headline || "Untitled",
          excerpt: data.excerpt || "",
          images: data.images || [],
          tag: data.tag || "",
          readingTime: data.readingTime || 0,
          writer: data.writer || "Unknown",
          layout: data.layout || "horizontal",
          publishedAt: data.publishedAt?.toDate
            ? data.publishedAt.toDate()
            : new Date(),
        } as ArticleCardProps;
      });
      setCustomPosts(posts);
      try {
        localStorage.setItem("cachedPosts", JSON.stringify(posts));
      } catch (e) {}
    });
    return () => unsubscribe();
  }, []);

  const allPosts = customPosts;

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
