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

  /**
   * Toggles the expansion of a timeline entry.
   * If the entry is already expanded, it collapses it; otherwise, it expands the entry.
   * @param entryId - The ID of the entry to toggle.
   */
  toggleEntry(entryId: string): void {
    this.expandedEntryId = this.expandedEntryId === entryId ? null : entryId;
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
