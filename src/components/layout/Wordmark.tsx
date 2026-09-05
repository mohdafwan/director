import Image from "next/image";
import { asset, site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The FerruleTech logo — the supplied artwork, used as-is.
 *
 * `public/brand/ferruletech-logo.png`, 704 × 155. Its ground is rgb(10,10,10),
 * within a couple of levels of the site background (#07090C), so it sits flat
 * on the page without needing the background knocked out.
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
      style={{ height: size, width: "auto" }}
      className={cn("shrink-0", className)}
    />
  );
}
