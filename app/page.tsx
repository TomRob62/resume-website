import { InteractiveSection } from "./components/InteractiveSection";
import Link from "next/link";
import ProfileImageClient from "./components/ProfileImageClient";

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
      "I’m Thomas Roberts, a software developer with a B.S. in Computer Science from Kennesaw State University. I build reliable web applications and AI-powered features that are clear to use, maintain, and extend.",
    details:
      "I combine engineering rigor with product-minded thinking to turn ambiguous ideas into production-ready software. My work spans full-stack web development, applied AI, and machine learning research, and I focus on building systems that are understandable, observable, and aligned with real user needs. I care about maintainability, clear communication, and measurable impact—so teams can move quickly without sacrificing reliability.",
    align: "left",
  },
  {
    id: "technical-skills",
    title: "Technical Skills & Focus.",
    summary:
      "Full-stack web development, applied AI, and modern cloud tooling—with a strong preference for component-based, user-facing applications.",
    details:
      "My core technologies and strengths include C#, TypeScript, Angular, React/Next.js, and Azure services (App Services, Functions, Web Apps). I’m experienced with the OpenAI API, prompt design, and ML/Deep Learning (including CNNs). I gravitate toward building web and app experiences because I like creating software that people can directly interact with and enjoy using. I prefer component-based architectures where logic and UI are neatly organized instead of living in large, monolithic files. VS Code is my IDE of choice, and OpenAI has become a staple in my development cycle—helping me explore alternatives and move faster—while I always ensure I fully understand, review, and document the code I ship and align it with existing patterns in the codebase.",
    align: "right",
  },
  {
    id: "problem-solving",
    title: "How I Solve Engineering Problems.",
    summary:
      "I bring structure to ambiguity through research, prototyping, and measurable performance—favoring simple, well-documented solutions.",
    details:
      "When I’m given a project with ambiguous requirements, I start by doing targeted research to understand industry standards and best practices. From there, I prototype quickly—often using OpenAI to build a tangible version of the idea—which helps surface unclear requirements, reveal edge cases, and highlight features we don’t want as much as the ones we do. I refine requirements around those learnings and then align with my team to confirm scope and trade-offs. For implementation, I prefer simple, well-structured solutions backed by clear documentation: descriptions, parameters, return values, and example usages. I’m careful about efficiency but don’t overcomplicate it—most of the time, the simplest approach is also the most robust and performant. I track measurable attributes like latency, compile time, memory usage, and CPU usage so I can compare alternatives and make decisions based on data, not just intuition.",
    align: "left",
  },
  {
    id: "collaboration",
    title: "How I Work With Teams & Stakeholders.",
    summary:
      "I ask about intent, communicate frequently, and iterate quickly—using feedback to move from functional to fantastic.",
    details:
      "I’ve collaborated with both clients and developers, and I’ve learned that asking for intention is critical: I want to understand their optimal use for the software, not just the feature request they first describe. I’ll ask clarifying questions, but the real progress happens through iterative, rapid prototyping and visible changes based on feedback. I keep communication lightweight but consistent—sharing short updates on where I’m at, asking for feedback when I’m at a decision point, and making sure stakeholders know how their input affects the outcome. I expect leadership to set direction and clearly describe the end goal; they don’t need every technical answer, but clear vision and priorities make it easier for me to execute well. I respond positively to feedback and constructive criticism and genuinely appreciate ideas like “this would be nice,” because those suggestions often transform software from merely functional to truly delightful.",
    align: "right",
  },
  {
    id: "ai-practice",
    title: "How I Work With AI.",
    summary:
      "I use AI as a practical tool for prototyping and coding, while carefully evaluating reliability, sources, and safety.",
    details:
      "I prefer to prototype with OpenAI because having a tangible product to experiment with surfaces missing requirements and inspires better features. It helps me design optimal happy paths and prepare guardrails for inappropriate or unintended use. When I evaluate AI reliability, I look at it from two perspectives. From a coding perspective, I prototype different options, measure their performance, and compare them using clear metrics until I find the best solution. From an informational perspective, I ask: how do I know this is true? That’s harder, so I start by examining the sources behind the output—looking at whether the author is reputable, what the goals of the website are, and how the information compares across multiple sources. I use common sense, cross-check research, and form my own conclusions instead of assuming outputs are correct by default. For prompt engineering, I focus on clearly defined objectives with explicit rules. I outline the goal and then list concise, bulleted instructions for behavior and constraints. I rarely mix multiple unrelated objectives into a single prompt and instead leverage built-in tools and system-level instructions (like an AGENTS.md file) to keep AI behavior consistent. From a coding point of view, I see AI as an accelerator that still relies on the developer’s understanding and creativity. In spaces like art and literature, the grey area is larger, but I believe original ideas and authentic voices will stand out over time.",
    align: "left",
  },
  {
    id: "career-history",
    title: "Career Snapshot.",
    summary:
      "Machine learning research, full-stack development, and applied AI prototyping—shaping a focus on reliable, user-centered software.",
    details:
      "In college, I worked on machine learning projects, including building a convolutional neural network from scratch to detect crop diseases—an effort to modernize crop inspection and improve food health. That experience taught me how to go from first principles to a working model and then translate that into something practical. As a developer intern at Surgical Information Systems (SIS), I worked across Product and Development teams. I built end-to-end features in C# and Angular for SIS Complete and rapidly prototyped AI-driven workflows with OpenAI. I also designed and deployed an Azure-hosted web app that helped my team explore optimal OpenAI configurations for operative note dictation research. These experiences reinforced my focus on applied AI, full-stack delivery, and building tools that fit into real workflows—rather than demos that only work in isolation.",
    align: "right",
  },
  {
    id: "growth",
    title: "What I’m Learning Next.",
    summary:
      "I’m deepening my web app development skills with a focus on scalability, robustness, and user experience.",
    details:
      "Right now I’m focused on strengthening my abilities in modern web application development end-to-end. That includes designing clean, well-defined API boundaries between front-end and back-end services, improving my testing strategy (unit, integration, and UI), and learning more about performance optimization and observability in production environments. I’m paying attention to design systems, reusable component patterns, and accessibility so that the interfaces I build aren’t just functional, but cohesive and inclusive. I’m also interested in how AI can be integrated responsibly into everyday tools—making them more capable without adding friction or confusion for users.",
    align: "left",
  },
  {
    id: "beyond-work",
    title: "Beyond Work.",
    summary:
      "I’m a jack-of-all-trades who enjoys variety, new skills, and experiences outside of code.",
    details:
      "Outside of software, I like exploring new things and picking up skills in very different domains. I’ve done crocheting, pole-vaulting, motorcycling, reading, and cooking, and I enjoy how each activity challenges me in a different way. That variety keeps me curious, grounded, and open to trying new approaches—both in my personal life and in my work as an engineer. I genuinely believe that variety is the spice of life, and I bring that curiosity and adaptability into the teams I join.",
    align: "right",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0B0E14] via-[#0B0E14] to-[#111827] text-slate-100">
      {/* AI glow accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-purple-600 opacity-20 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[36rem] w-[36rem] rounded-full bg-blue-500 opacity-25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 opacity-10 blur-3xl" />
      </div>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 md:px-8 lg:px-12">
        <header className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          {/* Left text block */}
          <div className="space-y-6 text-center md:max-w-3xl md:text-left">
            <h1 className="text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl">
              Hi, I&apos;m Thomas Roberts!
            </h1>
            <p className="text-lg text-slate-400">
              I build reliable web applications and applied AI solutions.
            </p>
            <p className="text-lg text-slate-400">
              This page is an interactive snapshot of how I work as an engineer—my skills, my approach to problem solving, and how I
              collaborate with teams.
            </p>
          </div>

          {/* Right profile picture */}
          <div className="shrink-0">
            <ProfileImageClient
              src="/images/headshot_purple_shirt-large.jpg"
              thumbSrc="/images/headshot_purple_shirt-small.jpg"
              largeSrc="/images/headshot_purple_shirt-large.jpg"
              alt="Thomas Roberts"
              width={192}
              height={250}
            />
          </div>
        </header>

        <div className="flex flex-col items-center gap-10">
          {sections.map((section) => (
            <InteractiveSection key={section.id} {...section} />
          ))}
          <p className="mt-6 text-sm text-slate-400">
            <Link
              href="/projects"
              className="text-blue-400 underline underline-offset-2 transition-colors hover:text-blue-300"
            >
              View specific projects I&apos;ve worked on →
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
