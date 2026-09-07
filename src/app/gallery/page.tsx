import { listGallery, type GalleryItem } from "@/lib/gallery-db";
import GalleryContent from "@/components/GalleryContent";

export const metadata = {
  title: "Gallery | Namaste Yoga Studio",
  description: "Photos and videos from our studio, classes, and community.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  let items: GalleryItem[] = [];
  try {
    items = await listGallery();
  } catch {
    // DB not configured yet — render empty gallery
  }
  return <GalleryContent items={items} />;
}
