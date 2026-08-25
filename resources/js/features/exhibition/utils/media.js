const RASTER_IMAGE_EXTENSION = /\.(?:jpe?g|png|webp)$/i;

export function isRenderableImageMedia(media) {
  if (!media?.url) {
    return false;
  }

  return Boolean(
    media.thumbnail_url ||
      media.type === "image" ||
      RASTER_IMAGE_EXTENSION.test(media.filename || "")
  );
}
