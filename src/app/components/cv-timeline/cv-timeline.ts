import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

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

  toggleEntry(entryId: string): void {
    this.expandedEntryId = this.expandedEntryId === entryId ? null : entryId;
  }

  onHover(entryId: string, isHovering: boolean): void {
    this.hoveredEntryId = isHovering ? entryId : null;
  }

  formatDateRange(startDate: string, endDate: string | 'present'): string {
    const start = startDate;
    const end = endDate === 'present' ? 'heute' : endDate;

    // Wenn Start und End gleich sind (z.B. nur ein Jahr)
    if (start === end || end === 'heute') {
      return `${start} - ${end}`;
    }

    return `${start} - ${end}`;
  }
}
