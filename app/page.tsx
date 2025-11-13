import { InteractiveSection } from "./components/InteractiveSection";

type SectionConfig = {
  id: string;
  title: string;
  summary: string;
  details: string;
  align: "left" | "right";
};

const sections: SectionConfig[] = [
  {
    id: "who-i-am",
    title: "Who I Am.",
    summary:
      "A snapshot of the person behind the resume, highlighting the curiosity, values, and perspective that guide every decision.",
    details:
      "Use this space to introduce yourself with personality—talk about what motivates you, what you value in collaboration, and what kind of challenges light you up. Give readers a reason to remember you beyond job titles.",
    align: "left",
  },
  {
    id: "passion",
    title: "What I'm passionate about.",
    summary:
      "Describe the problems you love solving and the impact you want your work to have—this is where energy and ambition belong.",
    details:
      "Share a few sentences about the causes, industries, or technologies that keep you up at night. Mention the type of teams or missions you gravitate toward and how passion shows up in your day-to-day work.",
    align: "right",
  },
  {
    id: "history",
    title: "My History",
    summary:
      "Outline the key roles, milestones, or adventures that shaped your path to today without diving into full resume detail just yet.",
    details:
      "List the turning points—career pivots, standout projects, or formative experiences. Provide enough context to make each step meaningful and leave room for more specifics elsewhere on the site.",
    align: "left",
  },
  {
    id: "skills",
    title: "My Skills and Experiences.",
    summary:
      "Offer a headline view of your technical strengths, soft skills, and the environments where you’ve proven them.",
    details:
      "Consider grouping abilities (e.g., product strategy, system design, leadership) and adding a note on how they come together in real projects. This is a placeholder for concise talking points that can expand into full case studies.",
    align: "right",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-20 md:px-12 lg:px-16">
        <header className="space-y-6 text-center md:text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Welcome</p>
          <h1 className="text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
            Build a home page that feels like a modern resume—polished, interactive, and memorable.
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-700 md:mx-0">
            These sections are placeholders you can tailor with your story. On larger screens, hover over each card to preview more
            detail; on touch devices, tap the arrow to expand or hide the extended description.
          </p>
        </header>

        <div className="flex flex-col items-center gap-10">
          {sections.map((section) => (
            <InteractiveSection key={section.id} {...section} />
          ))}
        </div>
      </main>
    </div>
  );
}
