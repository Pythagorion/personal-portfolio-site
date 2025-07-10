import { Component, Input } from '@angular/core';
import {Project, ProjectCardComponent} from '../project-card/project-card';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.html',
  imports: [
    ProjectCardComponent
  ],

  styleUrls: ['./project-grid.scss']
})
export class ProjectGridComponent {
  // Input property to receive an array of projects
  @Input() projects: Project[] = [];

  expandedCardId: string | null = null;

  /**
   * Handle the expansion of a project card.
   * This method toggles the expanded state of the card
   * based on the project ID.
   * @param projectId - The ID of the project to expand or collapse.
   */
  onCardExpand(projectId: string): void {
    this.expandedCardId = this.expandedCardId === projectId ? null : projectId;
  }
}
