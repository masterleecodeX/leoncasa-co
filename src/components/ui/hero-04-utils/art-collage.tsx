import { cn } from "@/lib/utils";

export function ArtCollage({
  primaryImage,
  secondaryImage,
  primaryAlt,
  secondaryAlt,
  className
}: {
  primaryImage: string;
  secondaryImage: string;
  primaryAlt?: string;
  secondaryAlt?: string;
  className?: string;
}) {
  return (
    <div 
      className={cn("relative aspect-[4/5] w-full max-w-[500px] mx-auto group", className)}
    >
      <div className="absolute top-0 left-0 z-10 w-[85%] h-[90%] transition-transform duration-500 group-hover:scale-[1.02]">
        <img 
          src={primaryImage} 
          alt={primaryAlt || ""} 
          className="h-full w-full object-cover rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
        />
      </div>
      <div className="absolute bottom-0 right-0 z-20 w-[45%] aspect-square transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
        <img 
          src={secondaryImage} 
          alt={secondaryAlt || ""} 
          className="h-full w-full object-cover rounded-2xl shadow-[0_20px_40px_rgb(0,0,0,0.2)]" 
        />
      </div>
    </div>
  )
}


