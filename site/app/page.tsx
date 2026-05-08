import Image from "next/image";

interface Project {
  title: string;
  description: string;
  url: string;
  tech: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    title: "WSB Screener",
    description: "A real-time dashboard tracking stock mention surges on r/WallStreetBets, with price charts and sentiment analysis.",
    url: "/wsb-screener",
    tech: ["Next.js", "Recharts", "Reddit API"],
    gradient: "from-orange-500 to-red-400",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              D
            </span>
            <span className="font-semibold text-gray-900">Darshan Mistry</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#about" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
              About
            </a>
            <a href="#projects" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
              Projects
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 transition-colors hover:text-gray-900"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/darshanmistry/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 transition-colors hover:text-gray-900"
            >
              <LinkedInIcon />
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-24 md:pt-32">
          <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
            <div className="flex-1">
              <p
                className="anim-in mb-3 font-mono text-sm uppercase tracking-widest text-blue-600"
                style={{ animationDelay: "0ms" }}
              >
                hey there,
              </p>
              <h1
                className="anim-in mb-6 text-6xl font-bold tracking-tight text-gray-900 md:text-8xl"
                style={{ animationDelay: "80ms" }}
              >
                Hi, I&apos;m Darshan 👋
              </h1>
              <p
                className="anim-in mb-8 max-w-xl text-xl leading-relaxed text-gray-500"
                style={{ animationDelay: "160ms" }}
              >
                A website to showcase my experiments with coding and AI.
              </p>
              <a
                href="https://www.linkedin.com/in/darshanmistry/"
                target="_blank"
                rel="noopener noreferrer"
                className="anim-in inline-flex items-center gap-2.5 rounded-full border border-[#0A66C2]/30 bg-[#0A66C2]/5 px-5 py-2.5 text-sm font-medium text-[#0A66C2] transition-all hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10"
                style={{ animationDelay: "240ms" }}
              >
                <LinkedInIcon />
                LinkedIn
                <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
            <div className="anim-in shrink-0" style={{ animationDelay: "80ms" }}>
              <Image
                src="/avatar.png"
                alt="Darshan Mistry"
                width={260}
                height={260}
                className="rounded-full object-cover shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* About */}
        <section id="about" className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-blue-600">about</p>
          <h2 className="mb-8 text-4xl font-bold tracking-tight text-gray-900">A bit about me</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-500">
            Mathematician turned financier. Originally from Leicester (UK), I spent nearly a decade
            working in London before moving to Abu Dhabi in 2025. I enjoy solving problems, exploring
            new technologies, and staying active through running, cycling, and tennis.
          </p>
        </section>

        <SectionDivider />

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-blue-600">portfolio</p>
          <h2 className="mb-12 text-4xl font-bold tracking-tight text-gray-900">Projects</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Visual preview */}
                <div className={`relative h-44 bg-gradient-to-br ${project.gradient}`}>
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-gray-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600">
                      ↗
                    </span>
                  </div>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <SectionDivider />
      </main>

      {/* Footer */}
      <footer className="bg-[#2B2B36] px-6 py-12 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Darshan Mistry</p>
            <p className="mt-1 text-sm text-white/50">Building things for the web.</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/50 transition-colors hover:text-white"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/darshanmistry/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/50 transition-colors hover:text-white"
            >
              <LinkedInIcon />
            </a>
          </div>
          <p className="text-sm text-white/40">© {new Date().getFullYear()} Darshan Mistry</p>
        </div>
      </footer>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-5xl items-center gap-4 px-6">
      <div className="h-px flex-1 bg-gray-100" />
      <span className="font-mono text-xs text-gray-300">_|_</span>
      <div className="h-px flex-1 bg-gray-100" />
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
