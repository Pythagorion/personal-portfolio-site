// project-grid.ts
import { Component, Input } from '@angular/core';
import {Project, ProjectCardComponent} from '../project-card/project-card'; // ← Angepasster Import-Pfad

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.html',
  imports: [
    ProjectCardComponent
  ],
  // ← Ohne .component
  styleUrls: ['./project-grid.scss']       // ← Ohne .component
})
export class ProjectGridComponent {
  @Input() projects: Project[] = [];

  expandedCardId: string | null = null;

  onCardExpand(projectId: string): void {
    // Toggle: Wenn die gleiche Karte geklickt wird, schließe sie
    this.expandedCardId = this.expandedCardId === projectId ? null : projectId;
  }
}
