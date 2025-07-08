// project-card.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  isDeployed: boolean;
  projectType: 'web' | 'desktop' | 'mobile' | 'api' | 'library';
  collaborationType: 'solo' | 'team' | 'client' | 'opensource';
  deploymentNote?: string;
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.html',     // ← Ohne .component
  styleUrls: ['./project-card.scss']      // ← Ohne .component
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() isExpanded: boolean = false;

  @Output() expandToggle = new EventEmitter<string>();

  isHovering: boolean = false;

  toggleExpanded(): void {
    this.expandToggle.emit(this.project.id);
  }

  onHover(isHovering: boolean): void {
    this.isHovering = isHovering;
  }

  getStatusIcon(): string {
    switch (this.project.projectType) {
      case 'desktop':
        return '💻';
      case 'mobile':
        return '📱';
      case 'api':
        return '⚡';
      case 'library':
        return '📚';
      default:
        return this.project.collaborationType === 'team' ? '👥' : '🔧';
    }
  }

  getStatusText(): string {
    if (this.project.deploymentNote) {
      return this.project.deploymentNote;
    }

    switch (this.project.projectType) {
      case 'desktop':
        return 'Desktop Anwendung';
      case 'mobile':
        return 'Mobile App';
      case 'api':
        return 'Backend API';
      case 'library':
        return 'Code Library';
      default:
        return this.project.collaborationType === 'team'
          ? 'Team-Projekt'
          : 'In Entwicklung';
    }
  }

  getDeploymentTooltip(): string {
    const baseTooltip = this.getStatusText();

    switch (this.project.collaborationType) {
      case 'team':
        return `${baseTooltip} - Gemeinsam mit anderen entwickelt`;
      case 'client':
        return `${baseTooltip} - Kundenprojekt (nicht öffentlich deploybar)`;
      case 'opensource':
        return `${baseTooltip} - Open Source Projekt`;
      default:
        return baseTooltip;
    }
  }
}
