"use client";

import React from "react";
import Image from "next/image";

export function LogoImage({
  src,
  alt,
  className = "w-5 h-5",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image src={src} alt={alt} fill className="object-contain" sizes="40px" />
    </div>
  );
}

function MicrosoftLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="10" height="10" fill="#f25022" />
      <rect x="11" y="0" width="10" height="10" fill="#7fba00" />
      <rect x="0" y="11" width="10" height="10" fill="#00a4ef" />
      <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
    </svg>
  );
}

export const LOGOS: Record<string, React.ReactNode> = {
  microsoft: <MicrosoftLogo />,
  wizeline: <LogoImage src="/logos/wizeline.png" alt="Wizeline" />,
  drift: <LogoImage src="/logos/drift.png" alt="Drift" />,
  cinfinity: (
    <LogoImage src="/logos/cinfinitysolutions.png" alt="C Infinity Solutions" />
  ),
  cbqa: <LogoImage src="/logos/cbqa.png" alt="CBQA Solutions" />,
  gpac: <LogoImage src="/logos/gpac.png" alt="GPAC" />,
  itesm: <LogoImage src="/logos/itesm.png" alt="ITESM" />,
  lasalle: <LogoImage src="/logos/lasalle.png" alt="La Salle Bajío" />,
  uofregina: <LogoImage src="/logos/uofregina.png" alt="University of Regina" />,
  dongseo: <LogoImage src="/logos/dongseo.png" alt="Dongseo University" />,
};
