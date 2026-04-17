export interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'Wanderlife',
    description:
      'Simple landingpage for e-book integrated with midtrans payment gateway',
    tech: ['TypeScript', 'Node.js', 'Midtrans', 'React', 'Next'],
    url: 'https://www.wanderlife.my.id/',
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
