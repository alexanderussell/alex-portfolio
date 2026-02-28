export interface Project {
  id: string
  title: string
  href: string
  description?: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI Design System',
    href: '#',
    description: 'A design system built for AI-powered interfaces',
  },
  {
    id: '2',
    title: 'Sunlit',
    href: '#',
    description: 'Ambient lighting for your workspace',
  },
  {
    id: '3',
    title: 'Portfolio',
    href: '#',
    description: 'This site — minimal, themed, grayscale',
  },
]
