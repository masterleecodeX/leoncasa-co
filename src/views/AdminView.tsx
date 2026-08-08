import React, { useState, useRef } from "react";
import { Header, type HeaderProps } from "@/components/layout/Header";
import { motion } from "motion/react";
import { type ArticleCardProps } from "@/components/ui/blog-post-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface AdminViewProps extends HeaderProps {}

// Helper from blog-post-card to match exact look
function formatReadTime(seconds: number): string {
  if (!seconds || seconds < 60) return "Less than 1 min read";
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min read`;
}

export function AdminView(props: AdminViewProps) {
  const [headline, setHeadline] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [writer, setWriter] = useState("");
  const [layout, setLayout] = useState<"vertical" | "horizontal">("horizontal");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const base64Images = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      }),
    );
    setImages(base64Images);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!headline || !excerpt || images.length === 0) {
      alert(
        "Please fill out the headline, excerpt, and upload at least one image.",
      );
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        headline,
        excerpt,
        images,
        tag,
        readingTime: readingTime ? parseInt(readingTime) * 60 : 0,
        writer,
        layout,
        publishedAt: serverTimestamp(),
      });

      // Reset form
      setHeadline("");
      setExcerpt("");
      setImages([]);
      setTag("");
      setReadingTime("");
      setWriter("");

      alert("Post added successfully! You can see it in the Donate view.");
    } catch (e) {
      console.error("Error adding post:", e);
      alert("Failed to add post. Make sure you are logged in as an admin.");
    }
  };

  const displayImage = images?.[0];
  const hasMeta = true; // Always show in edit mode so they can type
  const hasFooter = true;

  return (
    <motion.div
      key="admin"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <main className="min-h-screen w-full bg-[#f4f4f5] flex flex-col items-center justify-start relative pb-32 overflow-x-hidden">
        <Header {...props} />
        <div className="flex flex-col items-center justify-start relative pt-12 pb-32 px-4 md:px-8 lg:px-12 xl:px-16 w-full flex-1 max-w-[1600px] mx-auto gap-8">
          <div className="flex flex-col gap-2 w-full max-w-4xl flex-row justify-between items-end mb-4">
            <div>
              <h1 className="text-3xl font-bold">New Article</h1>
              <p className="text-muted-foreground">
                Edit directly on the card to publish. Click the image area to
                upload.
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <select
                value={layout}
                onChange={(e) =>
                  setLayout(e.target.value as "vertical" | "horizontal")
                }
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="horizontal">Horizontal Layout</option>
                <option value="vertical">Vertical Layout</option>
              </select>
              <Button onClick={handleSubmit} size="lg">
                Publish Article
              </Button>
            </div>
          </div>

          <div className="w-full flex justify-center max-w-4xl">
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {layout === "horizontal" ? (
              <Card className="flex w-full flex-col sm:flex-row gap-3 overflow-hidden rounded-3xl border p-3 shadow-lg h-full bg-white transition-all">
                <CardHeader
                  className="p-0 sm:w-1/2 sm:shrink-0 h-56 sm:h-auto cursor-pointer group relative bg-gray-100 rounded-2xl overflow-hidden min-h-[200px]"
                  onClick={handleImageClick}
                >
                  {displayImage ? (
                    <>
                      <img
                        src={displayImage}
                        alt="Upload preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                        Change Photos
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground hover:text-black hover:bg-gray-200 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-2"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      Click to add photos
                    </div>
                  )}
                </CardHeader>

                <div className="flex flex-col flex-grow">
                  <CardContent className="flex-grow p-3 sm:p-5 flex flex-col gap-2">
                    <div className="mb-2 flex items-center text-sm text-muted-foreground gap-2">
                      <div className="flex items-center">
                        <input
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          placeholder="Tag (e.g. Innovation)"
                          className="w-28 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground focus:text-black focus:outline-none focus:ring-1 focus:ring-ring border-transparent focus:border-transparent hover:bg-gray-200 transition-colors"
                        />
                      </div>
                      <span className="">•</span>
                      <div className="flex items-center gap-1">
                        <input
                          value={readingTime}
                          onChange={(e) => setReadingTime(e.target.value)}
                          type="number"
                          placeholder="5"
                          className="w-12 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-ring rounded-sm px-1 border-b border-transparent focus:border-input hover:border-gray-300 transition-colors"
                        />
                        <span>min read</span>
                      </div>
                    </div>

                    <input
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="Headline..."
                      className="mb-1 text-2xl sm:text-3xl font-bold leading-tight text-card-foreground w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded-md px-2 py-1 -ml-2"
                    />

                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Article excerpt..."
                      className="text-muted-foreground w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded-md px-2 py-1 -ml-2 min-h-[100px] resize-none"
                    />
                  </CardContent>

                  {hasFooter && (
                    <CardFooter className="flex items-center justify-between p-3 sm:p-5 pt-0 sm:pt-0">
                      <div>
                        <p className="text-sm text-muted-foreground">By</p>
                        <input
                          value={writer}
                          onChange={(e) => setWriter(e.target.value)}
                          placeholder="Writer Name"
                          className="font-semibold text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded-md px-2 py-1 -ml-2 w-32"
                        />
                      </div>
                      <div className="text-right">
                        <Button
                          variant="outline"
                          className="rounded-full px-6 pointer-events-none"
                        >
                          View
                        </Button>
                      </div>
                    </CardFooter>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="flex w-full max-w-sm flex-col gap-3 overflow-hidden rounded-3xl border p-3 shadow-lg h-full bg-white transition-all">
                <CardHeader
                  className="p-0 cursor-pointer group relative bg-gray-100 rounded-2xl overflow-hidden h-56"
                  onClick={handleImageClick}
                >
                  {displayImage ? (
                    <>
                      <img
                        src={displayImage}
                        alt="Upload preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                        Change Photos
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground hover:text-black hover:bg-gray-200 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-2"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      Click to add photos
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex-grow p-3 flex flex-col gap-2">
                  <div className="mb-2 flex items-center text-sm text-muted-foreground gap-2">
                    <div className="flex items-center">
                      <input
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Tag"
                        className="w-20 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground focus:text-black focus:outline-none focus:ring-1 focus:ring-ring border-transparent focus:border-transparent hover:bg-gray-200 transition-colors"
                      />
                    </div>
                    <span className="">•</span>
                    <div className="flex items-center gap-1">
                      <input
                        value={readingTime}
                        onChange={(e) => setReadingTime(e.target.value)}
                        type="number"
                        placeholder="5"
                        className="w-10 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-ring rounded-sm px-1 border-b border-transparent focus:border-input hover:border-gray-300 transition-colors"
                      />
                      <span className="text-xs whitespace-nowrap">
                        min read
                      </span>
                    </div>
                  </div>

                  <input
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Headline..."
                    className="mb-1 text-2xl font-bold leading-tight text-card-foreground w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded-md px-2 py-1 -ml-2"
                  />

                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Article excerpt..."
                    className="text-muted-foreground w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded-md px-2 py-1 -ml-2 min-h-[80px] resize-none"
                  />
                </CardContent>

                {hasFooter && (
                  <CardFooter className="flex items-center justify-between p-3">
                    <div>
                      <p className="text-sm text-muted-foreground">By</p>
                      <input
                        value={writer}
                        onChange={(e) => setWriter(e.target.value)}
                        placeholder="Writer Name"
                        className="font-semibold text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded-md px-2 py-1 -ml-2 w-32"
                      />
                    </div>
                    <div className="text-right">
                      <Button
                        variant="outline"
                        className="rounded-full px-6 pointer-events-none"
                      >
                        View
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
}
