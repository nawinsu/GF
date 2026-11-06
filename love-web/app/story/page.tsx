import PageShell from "@/components/PageShell";
import Timeline from "@/components/Timeline";
import { story } from "@/lib/content";

export default function StoryPage() {
  return (
    <PageShell current="/story" title="เราผ่านอะไรกันมาบ้าง??" subtitle="ใกล้สองปีเเล้ว เขาทำขึ้นมาส่วนเพื่อฝึกทำเว็ปส่วนนึงเพราะคิดถึงวันเก่าๆที่ราได้อยู่ด้วยกัน">
      <Timeline items={story} />
    </PageShell>
  );
}
