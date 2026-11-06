import PageShell from "@/components/PageShell";
import MusicPlayer from "@/components/MusicPlayer";
import { song } from "@/lib/content";

export default function SongPage() {
  return (
    <PageShell current="/song" title="Our Song" subtitle="This song reminds me of you.">
      <MusicPlayer title={song.title} artist={song.artist} src={song.src} cover={song.cover} />
      <p className="mt-8 text-center text-sm text-white/70">{song.note}</p>
    </PageShell>
  );
}
