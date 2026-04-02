import { featuredProject, projects as staticProjects } from '../data/projects'

export default function useProjects() {
  return {
    featured: featuredProject,
    projects: staticProjects,
    loading: false,
    error: null,
  }
}
