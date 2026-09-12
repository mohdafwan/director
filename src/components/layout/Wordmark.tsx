import Image from "next/image";
import { asset, site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The FerruleTech logo — the supplied artwork, used as-is.
 *
 * `public/brand/ferruletech-logo.png`, 704 × 155. The light artwork is converted
 * to black for the wheat theme while preserving the transparent background.
 *
 * Sized by height, width auto, so the 4.54:1 aspect is never distorted. The
 * artwork carries ~25px of its own padding top and bottom (the type occupies
 * 66% of the image height), which is why the rendered heights below are larger
 * than the optical size you want.
 */
export function Wordmark({
  className,
  /** Rendered image height in px. Type reads at ~66% of this. */
  size = 44,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset("/brand/ferruletech-logo.png")}
      width={704}
      height={155}
      alt={site.name}
      priority={priority}
      // maxWidth:none overrides Tailwind preflight's img{max-width:100%}.
      // Without it a narrow container caps the width while the inline height
      // stays fixed, which silently distorts the wordmark instead of
      // overflowing visibly. Better to be measurably too wide than wrong.
      style={{ height: size, width: "auto", maxWidth: "none" }}
      className={cn("shrink-0 brightness-0", className)}
    />
  );
}
