import * as React from 'react';
import { motion } from 'motion/react';

export function ArtCollage({
  primaryImage,
  secondaryImage,
  primaryAlt,
  secondaryAlt,
}: {
  primaryImage: string;
  secondaryImage: string;
  primaryAlt?: string;
  secondaryAlt?: string;
}) {
  return (
    <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto">
      <div className="absolute left-0 top-0 h-[85%] w-[85%] overflow-hidden rounded-3xl shadow-lg">
        <img
          src={primaryImage}
          alt={primaryAlt || 'Primary'}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 h-[40%] w-[55%] overflow-hidden rounded-2xl border-4 border-background shadow-2xl z-10">
        <img
          src={secondaryImage}
          alt={secondaryAlt || 'Secondary'}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
