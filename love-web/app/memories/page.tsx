import PageShell from "@/components/PageShell";
import PhotoGallery from "@/components/PhotoGallery";
import { memories, memoryCategories } from "@/lib/content";

export default function MemoriesPage() {
  return (
    <PageShell current="/memories" title="Memories" subtitle="Small moments, big happiness.">
      <PhotoGallery items={memories} categories={memoryCategories} />
    </PageShell>
  );
}
