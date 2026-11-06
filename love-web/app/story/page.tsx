import PageShell from "@/components/PageShell";
import Timeline from "@/components/Timeline";
import { story } from "@/lib/content";

export default function StoryPage() {
  return (
    <PageShell current="/story" title="Our Story" subtitle="Every moment with you is special.">
      <Timeline items={story} />
    </PageShell>
  );
}
