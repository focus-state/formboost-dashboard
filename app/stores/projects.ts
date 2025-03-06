import { defineStore } from 'pinia';

import type { Project } from '~/client';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);

  const setProjects = (value: Project[]) => {
    projects.value = value;
  };

  return {
    projects,
    setProjects,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot));
}
