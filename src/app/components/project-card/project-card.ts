import { Component, Input, Output, EventEmitter } from '@angular/core';

// Project interface definition
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
  // Inputs and Outputs for the component
  @Input() project!: Project;
  @Input() isExpanded: boolean = false;

  @Output() expandToggle = new EventEmitter<string>();

  // Internal state for hover effect
  isHovering: boolean = false;

  /**
   * Toggle the expanded state of the project card.
   * This will emit the project ID to the parent component
   * to handle the expansion logic.
   */
  toggleExpanded(): void {
    this.expandToggle.emit(this.project.id);
  }

  /**
   * Handle mouse hover events to change the hover state.
   * This can be used to apply styles or effects when the card is hovered.
   * @param isHovering - True if the card is hovered, false otherwise.
   */
  onHover(isHovering: boolean): void {
    this.isHovering = isHovering;
  }

  /**
   * Get the status icon based on the project type.
   * This method returns a string representing an emoji icon
   * that corresponds to the type of project.
   */
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

  /**
   * Get the status text for the project.
   * This method returns a string that describes the project
   * based on its type and collaboration mode.
   */
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

  /**
   * Get the deployment tooltip text based on the project collaboration type.
   * This method returns a string that provides additional context
   * about the project's deployment status.
   */
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
