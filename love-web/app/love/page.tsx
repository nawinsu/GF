import PageShell from "@/components/PageShell";
import LoveCards from "@/components/LoveCards";
import { thingsILove } from "@/lib/content";

export default function LovePage() {
  return (
    <PageShell current="/love" title="Things I Love About You" subtitle="You're my favorite person.">
      <LoveCards items={thingsILove} />
    </PageShell>
  );
}
