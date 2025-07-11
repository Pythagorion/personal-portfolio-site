import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

/**
 * Represents a single entry in the timeline.
 * Each entry can be an education, work experience, or future opportunity.
 */
export interface TimelineEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | 'present';
  description: string[];
  technologies?: string[];
  type: 'education' | 'work' | 'future';
  location?: string;
  shortTitle?: string;
}

/**
 * Represents a section in the timeline.
 * Each section contains multiple entries and has a title, color, and icon.
 */
export interface TimelineSection {
  title: string;
  entries: TimelineEntry[];
  color: string;
  icon: string;
}

@Component({
  selector: 'app-cv-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-timeline.html',
  styleUrls: ['./cv-timeline.scss']
})
export class CvTimelineComponent {
  @Input() timelineSections: TimelineSection[] = [];

  expandedEntryId: string | null = null;
  hoveredEntryId: string | null = null;

  private hoverTimers: Map<string, any> = new Map();
  private lastClosedTimes: Map<string, number> = new Map();
  private showProgressBars: Map<string, boolean> = new Map();
  private debounceTimeMs: number = 5000;

  onEntryMouseEnter(entryId: string): void {
    this.hoveredEntryId = entryId;

    // Debounce Check
    const lastClosed = this.lastClosedTimes.get(entryId) || 0;
    const timeSinceLastClosed = Date.now() - lastClosed;
    if (timeSinceLastClosed < this.debounceTimeMs) {
      console.log('*** Timeline debounce active for:', entryId);
      this.showProgressBars.set(entryId, false);
      return;
    }

    // If the entry is already expanded, do not show the progress bar
    if (this.expandedEntryId === entryId) {
      console.log('*** Timeline entry already expanded:', entryId);
      this.showProgressBars.set(entryId, false);
      return;
    }

    // Start the timer to show the progress bar
    this.showProgressBars.set(entryId, true);
    console.log('*** Timeline timer started for:', entryId);

    const timer = setTimeout(() => {
      console.log('*** Timeline timer fired for:', entryId);
      this.showProgressBars.set(entryId, false);
      this.toggleEntry(entryId);
    }, 1000);

    this.hoverTimers.set(entryId, timer);
  }

  /**
   * Handles mouse leave event for a timeline entry.
   * This method hides the progress bar and clears any active hover timers.
   * @param entryId
   */
  onEntryMouseLeave(entryId: string): void {
    this.hoveredEntryId = null;
    this.showProgressBars.set(entryId, false);

    const timer = this.hoverTimers.get(entryId);
    if (timer) {
      clearTimeout(timer);
      this.hoverTimers.delete(entryId);
      console.log('*** Timeline timer cleared for:', entryId);
    }
  }

  /**
   * Toggles the expansion state of a timeline entry.
   * If the entry is already expanded, it will be collapsed.
   * If it is collapsed, it will be expanded.
   * @param entryId - The ID of the entry to toggle.
   */
  toggleEntry(entryId: string): void {
    this.showProgressBars.set(entryId, false);

    if (this.expandedEntryId === entryId) {
      this.lastClosedTimes.set(entryId, Date.now());
      console.log('*** Timeline entry closed, debounce time set for:', entryId);
    }

    this.expandedEntryId = this.expandedEntryId === entryId ? null : entryId;
  }

  /**
   * Checks if a timeline entry is currently expanded.
   * @param entryId - The ID of the entry to check.
   * @returns True if the entry is expanded, false otherwise.
   */
  shouldShowProgressBar(entryId: string): boolean {
    return this.showProgressBars.get(entryId) || false;
  }

  /**
   * Checks if a timeline entry is in the debounce time.
   * If the entry was closed within the last debounceTimeMs milliseconds, it returns true.
   * @param entryId - The ID of the entry to check.
   * @returns True if the entry is in debounce time, false otherwise.
   */
  isInDebounceTime(entryId: string): boolean {
    const lastClosed = this.lastClosedTimes.get(entryId) || 0;
    const timeSinceLastClosed = Date.now() - lastClosed;
    return timeSinceLastClosed < this.debounceTimeMs;
  }

  /**
   * Checks if a timeline entry is currently expanded.
   * @param entryId - The ID of the entry to check.
   * @returns True if the entry is expanded, false otherwise.
   */
  onHover(entryId: string, isHovering: boolean): void {
    this.hoveredEntryId = isHovering ? entryId : null;
  }

  /**
   * Formats the date range for display.
   * If the end date is 'present', it will display 'heute'.
   * If the start and end dates are the same, it will display only one date.
   * @param startDate - The start date of the entry.
   * @param endDate - The end date of the entry or 'present'.
   * @returns A formatted string representing the date range.
   */
  formatDateRange(startDate: string, endDate: string | 'present'): string {
    const start = startDate;
    const end = endDate === 'present' ? 'heute' : endDate;

    if (start === end || end === 'heute') {
      return `${start} - ${end}`;
    }

    return `${start} - ${end}`;
  }
}
