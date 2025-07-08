export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string; // Für die kompakte Ansicht
  imageUrl: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string; // Optional falls noch nicht deployed
  isDeployed: boolean;
  projectType: 'web' | 'desktop';
  collaborationType?: 'solo' | 'team';
  deploymentNote?: string;
}
