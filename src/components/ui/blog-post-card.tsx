import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ArticleCardProps {
  headline: string;
  excerpt: string;
  cover?: string;
  images?: string[];
  tag?: string;
  readingTime?: number; // in seconds
  writer?: string;
  publishedAt?: Date;
  clampLines?: number;
  layout?: "vertical" | "horizontal";
  onView?: () => void;
}

// Human-friendly read time: seconds -> "X min read"
export function formatReadTime(seconds: number): string {
  if (!seconds || seconds < 60) return "Less than 1 min read";
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min read`;
}

// Date -> "Aug 15, 2025" (localized but concise)
export function formatPostDate(date: Date): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  cover,
  images,
  tag,
  readingTime,
  headline,
  excerpt,
  writer,
  publishedAt,
  clampLines,
  layout = "vertical",
  onView,
}) => {
  const displayImage = images?.[0] || cover;
  const hasMeta = tag || readingTime;
  const hasFooter = true;

  if (layout === "horizontal") {
    return (
      <Card className="flex w-full flex-col sm:flex-row gap-3 overflow-hidden rounded-3xl border p-3 shadow-lg h-full">
        {displayImage && (
          <CardHeader className="p-0 sm:w-1/2 sm:shrink-0 h-56 sm:h-auto">
            <div className="relative w-full h-full min-h-[200px]">
              <img
                src={displayImage}
                alt={headline}
                className="absolute inset-0 w-full h-full rounded-2xl object-cover"
              />
            </div>
          </CardHeader>
        )}

        <div className="flex flex-col flex-grow">
          <CardContent className="flex-grow p-3 sm:p-5">
            {hasMeta && (
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                {tag && (
                  <Badge className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:text-black">
                    {tag}
                  </Badge>
                )}
                {tag && readingTime && <span className="mx-2">•</span>}
                {readingTime && <span>{formatReadTime(readingTime)}</span>}
              </div>
            )}

            <h2 className="mb-2 text-2xl sm:text-3xl font-bold leading-tight text-card-foreground">
              {headline}
            </h2>

            <p
              className={cn("text-muted-foreground", {
                "overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]":
                  clampLines && clampLines > 0,
              })}
              style={{
                WebkitLineClamp: clampLines,
              }}
            >
              {excerpt}
            </p>
          </CardContent>

          {hasFooter && (
            <CardFooter className="flex items-center justify-between p-3 sm:p-5 pt-0 sm:pt-0">
              {writer && (
                <div>
                  <p className="text-sm text-muted-foreground">By</p>
                  <p className="font-semibold text-muted-foreground">
                    {writer}
                  </p>
                </div>
              )}
              <div className={writer ? "text-right" : ""}>
                <Button
                  variant="outline"
                  className="rounded-full px-6"
                  onClick={onView}
                >
                  View
                </Button>
              </div>
            </CardFooter>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex w-full flex-col gap-3 overflow-hidden rounded-3xl border p-3 shadow-lg h-full">
      {displayImage && (
        <CardHeader className="p-0">
          <div className="relative h-56 w-full">
            <img
              src={displayImage}
              alt={headline}
              className="absolute inset-0 w-full h-full rounded-2xl object-cover"
            />
          </div>
        </CardHeader>
      )}

      <CardContent className="flex-grow p-3">
        {hasMeta && (
          <div className="mb-4 flex items-center text-sm text-muted-foreground">
            {tag && (
              <Badge className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:text-black">
                {tag}
              </Badge>
            )}
            {tag && readingTime && <span className="mx-2">•</span>}
            {readingTime && <span>{formatReadTime(readingTime)}</span>}
          </div>
        )}

        <h2 className="mb-2 text-2xl font-bold leading-tight text-card-foreground">
          {headline}
        </h2>

        <p
          className={cn("text-muted-foreground", {
            "overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]":
              clampLines && clampLines > 0,
          })}
          style={{
            WebkitLineClamp: clampLines,
          }}
        >
          {excerpt}
        </p>
      </CardContent>

      {hasFooter && (
        <CardFooter className="flex items-center justify-between p-3">
          {writer && (
            <div>
              <p className="text-sm text-muted-foreground">By</p>
              <p className="font-semibold text-muted-foreground">{writer}</p>
            </div>
          )}
          <div className={writer ? "text-right" : ""}>
            <Button
              variant="outline"
              className="rounded-full px-6"
              onClick={onView}
            >
              View
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
