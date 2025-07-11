import {Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';

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
  templateUrl: './project-card.html',
  styleUrls: ['./project-card.scss']
})
export class ProjectCardComponent implements  OnDestroy {
  // Inputs and Outputs for the component
  @Input() project!: Project;
  @Input() isExpanded: boolean = false;

  @Output() expandToggle = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  private hoverTimer: any = null;

  private lastClosedTime: number = 0;
  private debounceTimeMs: number = 5000

  // Internal state for hover effect
  isHovering: boolean = false;
  showProgressBar: boolean = false;

  isFullyExpanded: boolean = false;

  /**
   * Determine if the project card should show expanded details.
   * This method checks if the card is expanded, if the progress bar
   * is shown, or if the card is hovered and not in debounce time.
   * @return {boolean} - True if details should be shown, false otherwise.
   */
  shouldShowExpandedDetails(): boolean {
    return this.isExpanded ||
      this.showProgressBar ||
      (this.isHovering && !this.isInDebounceTime());
  }

  /**
   * Check if the project card is currently in the debounce time.
   * This method checks if the time since the last closed state
   * is less than the debounce time.
   * @return {boolean} - True if within debounce time, false otherwise.
   */
  isInDebounceTime(): boolean {
    const timeSinceLastClosed = Date.now() - this.lastClosedTime;
    return timeSinceLastClosed < this.debounceTimeMs;
  }

  /**
   * Clean up resources when the component is destroyed.
   * This will clear any hover timers and complete the destroy subject.
   */
  ngOnDestroy(): void {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle mouse enter events on the project card.
   * This will set the hover state and start a timer to expand the card
   * after a delay if the mouse remains over the card.
   */
  onMouseEnter(): void {
    this.isHovering = true;

    const timeSinceLastClosed = Date.now() - this.lastClosedTime;
    if (timeSinceLastClosed < this.debounceTimeMs) {
      this.showProgressBar = false;
      return;
    }

    if (this.isExpanded) {
      this.showProgressBar = false;
      return;
    }

    this.showProgressBar = true;

    this.hoverTimer = setTimeout(() => {
      this.isFullyExpanded = true;
      this.showProgressBar = false;
      this.expandToggle.emit(this.project.id);
    }, 1000);
  }

  /**
   * Handle mouse leave events on the project card.
   * This will reset the hover state and clear any hover timers.
   */
  onMouseLeave(): void {
    this.isHovering = false;

    this.showProgressBar = false;

    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  }

  /**
   * Determine if the project card should show details.
   * This is true if the card is fully expanded or just expanded.
   */
  get shouldShowDetails(): boolean {
    return this.isFullyExpanded || this.isExpanded;
  }

  /**
   * Toggle the expanded state of the project card.
   * This will emit the project ID to the parent component
   * to handle the expansion logic.
   */
  toggleExpanded(): void {
    this.expandToggle.emit(this.project.id);

    this.showProgressBar = false;

    if (this.isExpanded) {
      this.lastClosedTime = Date.now();
    }
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
