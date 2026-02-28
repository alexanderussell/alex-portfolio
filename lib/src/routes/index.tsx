import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="display-title mb-4 text-foreground">Alex Russell</h1>

      <p className="mb-12 text-[length:var(--font-size-body)] text-muted-foreground">
        Product Designer turned AI technologist. Building tools that bridge
        design and engineering.
      </p>

      <h2 className="display-title mb-6 text-foreground">Projects</h2>

      <ul className="list-none space-y-3 p-0">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.href}
              className="text-[length:var(--font-size-body)] text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline"
            >
              {project.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
