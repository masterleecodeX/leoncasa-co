import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

function Blog() {
  return (
    <div className="w-full">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Latest articles
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hero article - full width */}
          <Link to="/gallery" className="flex flex-col gap-4 cursor-pointer md:col-span-2 lg:col-span-4">
            <div className="bg-muted rounded-md aspect-[21/9]"></div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>News</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>John Johnsen</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="max-w-3xl text-4xl tracking-tight">
                Pay supplier invoices
              </h3>
              <p className="max-w-3xl text-muted-foreground text-base">
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster than
                ever.
              </p>
            </div>
          </Link>

          {/* Half width article */}
          <Link to="/gallery" className="flex flex-col gap-4 cursor-pointer md:col-span-2 lg:col-span-2">
            <div className="bg-muted rounded-md aspect-video"></div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>Product</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Jane Doe</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="max-w-3xl text-3xl tracking-tight">
                New Features in Q3
              </h3>
              <p className="max-w-3xl text-muted-foreground text-base">
                Discover the latest tools and integrations we've added this quarter to help you scale your business faster and more securely.
              </p>
            </div>
          </Link>

          {/* Quarter width article */}
          <Link to="/gallery" className="flex flex-col gap-4 cursor-pointer">
            <div className="bg-muted rounded-md aspect-video lg:aspect-square"></div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>Tips</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Alex Smith</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="max-w-3xl text-xl tracking-tight">
                10 Ways to save money
              </h3>
              <p className="max-w-3xl text-muted-foreground text-sm">
                Learn practical tips on how to cut costs.
              </p>
            </div>
          </Link>

          {/* Quarter width article */}
          <Link to="/gallery" className="flex flex-col gap-4 cursor-pointer">
            <div className="bg-muted rounded-md aspect-video lg:aspect-square"></div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>Culture</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Sarah Lee</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="max-w-3xl text-xl tracking-tight">
                Remote Work Best Practices
              </h3>
              <p className="max-w-3xl text-muted-foreground text-sm">
                How we keep our team engaged.
              </p>
            </div>
          </Link>
          
          {/* Three quarters width */}
          <Link to="/gallery" className="flex flex-col gap-4 cursor-pointer md:col-span-2 lg:col-span-3">
            <div className="bg-muted rounded-md aspect-[21/9]"></div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>Engineering</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Mike Ross</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="max-w-3xl text-3xl tracking-tight">
                Scaling our Databases for Next Gen
              </h3>
              <p className="max-w-3xl text-muted-foreground text-base">
                Our journey to supporting millions of concurrent users with new infrastructure.
              </p>
            </div>
          </Link>

          {/* Quarter width */}
          <Link to="/gallery" className="flex flex-col gap-4 cursor-pointer">
            <div className="bg-muted rounded-md aspect-[4/5]"></div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>Design</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Tom Jerry</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="max-w-3xl text-xl tracking-tight">
                Minimalist UI Trends
              </h3>
              <p className="max-w-3xl text-muted-foreground text-sm">
                Why less is more in modern design.
              </p>
            </div>
          </Link>
          
          {/* Half width */}
          <Link to="/gallery" className="flex flex-col gap-4 cursor-pointer lg:col-span-2">
            <div className="bg-muted rounded-md aspect-video"></div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>Update</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Jane Doe</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="max-w-3xl text-2xl tracking-tight">
                System architecture review
              </h3>
              <p className="max-w-3xl text-muted-foreground text-base">
                Looking back at our Q2 changes.
              </p>
            </div>
          </Link>
          
          {/* Half width */}
          <Link to="/gallery" className="flex flex-col gap-4 cursor-pointer lg:col-span-2">
            <div className="bg-muted rounded-md aspect-video"></div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>Event</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>John Johnsen</span>
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="max-w-3xl text-2xl tracking-tight">
                Annual conference recap
              </h3>
              <p className="max-w-3xl text-muted-foreground text-base">
                Highlights from our user conference.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { Blog };
