export interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'OpenCast',
    description:
      'A self-hosted podcast RSS aggregator and player built for speed. Parses hundreds of feeds in parallel using worker threads and stores episodes in SQLite for instant search.',
    tech: ['TypeScript', 'Node.js', 'SQLite', 'React'],
    url: 'https://github.com',
    featured: true,
  },
  {
    name: 'Verdict',
    description:
      'CLI tool for running structured LLM evaluations against a test suite. Define expected behaviors in YAML, pipe in prompts, get a pass/fail report with reasoning diffs.',
    tech: ['Python', 'Click', 'OpenAI API', 'YAML'],
    url: 'https://github.com',
    featured: true,
  },
  {
    name: 'Tilesmith',
    description:
      'Go microservice that renders map tiles on demand from GeoJSON sources. Ships as a single binary with an embedded tile cache. Powers a few hobby mapping projects.',
    tech: ['Go', 'GeoJSON', 'Docker', 'Redis'],
    url: 'https://github.com',
    featured: true,
  },
  {
    name: 'Heliograph',
    description:
      'Minimal structured logger for Rust that outputs clean, human-readable logs in dev and newline-delimited JSON in production. Zero dependencies, configurable via env.',
    tech: ['Rust', 'Cargo', 'JSON'],
    url: 'https://github.com',
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
