import PageShell from "@/components/PageShell";
import Letter from "@/components/Letter";

export default function LetterPage() {
  return (
    <PageShell current="/letter" title="For You" subtitle="เขียนอะไรถึงเราก็ได้นะ">
      <Letter />
    </PageShell>
  );
}
