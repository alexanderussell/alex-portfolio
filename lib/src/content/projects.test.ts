import { describe, it, expect } from 'vitest'
import { projects, type Project } from './projects'

describe('projects data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThanOrEqual(1)
  })

  it('each project has required fields', () => {
    for (const project of projects) {
      expect(typeof project.id).toBe('string')
      expect(project.id.length).toBeGreaterThan(0)
      expect(typeof project.title).toBe('string')
      expect(project.title.length).toBeGreaterThan(0)
      expect(typeof project.href).toBe('string')
      expect(project.href.length).toBeGreaterThan(0)
    }
  })

  it('each project has unique id', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('description is optional but string when present', () => {
    for (const project of projects) {
      if (project.description !== undefined) {
        expect(typeof project.description).toBe('string')
      }
    }
  })

  it('conforms to Project interface', () => {
    const testProject: Project = {
      id: 'test',
      title: 'Test',
      href: '/test',
    }
    expect(testProject).toBeDefined()

    const withDesc: Project = {
      id: 'test2',
      title: 'Test 2',
      href: '/test2',
      description: 'A description',
    }
    expect(withDesc.description).toBe('A description')
  })
})
