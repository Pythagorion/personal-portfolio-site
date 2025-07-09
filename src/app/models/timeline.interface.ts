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
