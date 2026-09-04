/**
 * Thin wrapper over the Unsplash image CDN.
 *
 * Every product photo is addressed by its Unsplash photo id and rendered through
 * the CDN's transform API, so a single source image serves the grid thumbnail,
 * the detail hero and the cart line item at exactly the size each one needs.
 */

const CDN = "https://images.unsplash.com";

export type Crop = "top" | "center" | "bottom" | "faces";

type PhotoOptions = {
  width: number;
  height?: number;
  /** 1-100. Defaults to 78, which is visually lossless at these sizes. */
  quality?: number;
  crop?: Crop;
};

export function photo(id: string, options: PhotoOptions): string {
  const { width, height, quality = 78, crop = "faces" } = options;

  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: String(quality),
    crop,
  });

  if (height) params.set("h", String(height));

  return `${CDN}/${id}?${params.toString()}`;
}

/** Low-quality placeholder used for the blurred loading state. */
export function blurPhoto(id: string): string {
  return photo(id, { width: 24, quality: 20 });
}

/** Attribution back to the photographer's page, per the Unsplash guidelines. */
export function photoCredit(id: string): string {
  return `https://unsplash.com/photos/${id.replace(/^photo-/, "")}`;
}
