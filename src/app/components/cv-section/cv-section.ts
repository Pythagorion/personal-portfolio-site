import { Component } from '@angular/core';
import {CvTimelineComponent, TimelineSection} from '../cv-timeline/cv-timeline';
import {CommonModule} from '@angular/common';

// Define the structure for skill categories and their skills
interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-cv-section',
  standalone: true,
  imports: [CommonModule, CvTimelineComponent],
  templateUrl: './cv-section.html',
  styleUrls: ['./cv-section.scss']
})
export class CvSectionComponent {

  // Defines the timeline sections with their entries
  timelineSections: TimelineSection[] = [
    {
      title: 'Ausbildung',
      icon: '',
      color: '#2563eb',
      entries: [
        {
          id: 'edu1',
          company: 'Justus-Liebig-Universität Gießen',
          position: 'Lehramt (Staatsexamen)',
          startDate: '2019',
          endDate: '2020',
          description: [
            'Lehramt für Gymnasien mit den Fächern Biologie und Informatik'
          ],
          type: 'education',
          location: 'Gießen',
          shortTitle: 'Lehramt-Studium'
        },
        {
          id: 'edu2',
          company: 'TH Köln',
          position: 'Medieninformatik (Bachelor of Science)',
          startDate: '2020',
          endDate: '2023',
          description: [
            'Schwerpunkt: Web Development',
            'Bachelorarbeit im Bereich der Softwaremodellierung (UML; siehe JSipher-Projekt)',
            'Abschlussnote: 1,75'
          ],
          type: 'education',
          location: 'Gummersbach',
          shortTitle: 'Medieninformatik-Bachelor'
        },
        {
          id: 'edu3',
          company: 'TH Köln',
          position: 'Medieninformatik (Master of Science)',
          startDate: '2023',
          endDate: 'present',
          description: [
            'Schwerpunkt: Visual Computing',
            'Masterarbeit im Bereich der Hochschuldidaktik'
          ],
          type: 'education',
          location: 'Gummersbach',
          shortTitle: 'Medieninformatik-Master'
        }
      ]
    },
    {
      title: 'Berufslaufbahn',
      icon: '',
      color: '#059669',
      entries: [
        {
          id: 'work1',
          company: 'Erzbistum Köln | Kath. Kita St. Norbert',
          position: 'Bundesfreiwilligendienst (BFD)',
          startDate: '2018',
          endDate: '2019',
          description: [
            'Unterstützung der ausgebildeten Fachkräfte in sämtlichen Bereichen'
          ],
          type: 'work',
          location: 'Köln',
          shortTitle: 'Bundesfreiwilligendienst'
        },
        {
          id: 'work2',
          company: 'Seven Principles Mobility GmbH',
          position: 'Werkstudent: Mobile Testing und App-Entwicklung',
          startDate: '2022',
          endDate: '2023',
          description: [
            'Einsatz als Mobile Tester für Android-Apps',
            'Entwicklung von Mobile-Apps mit Kotlin',
            'Arbeit mit Scrum'
          ],
          technologies: ['Kotlin', 'Scrum'],
          type: 'work',
          location: 'hybrid',
          shortTitle: 'Werkstudent Mobile Testing'
        },
        {
          id: 'work3',
          company: 'TH Köln',
          position: 'Studentische Hilfskraft: Softwarmodellierung',
          startDate: '2023',
          endDate: '2023',
          description: [
            'Unterstützung bei der Durchführung von Praktika',
            'Weiterentwicklung und Wartung des JSipher-Projekts',
            'Betreuung von JSipher im Live-Einsatz'
          ],
          technologies: ['Vue.js', 'TypeScript', 'HTML', 'SCSS', 'UML'],
          type: 'work',
          location: 'Gummersbach',
          shortTitle: 'Studentische Hilfskraft'
        },
        {
          id: 'work4',
          company: 'TH Köln',
          position: 'Wissenschaftliche Hilfskraft: Softwarmodellierung',
          startDate: '2023',
          endDate: '2024',
          description: [
            'Unterstützung bei der Durchführung von Praktika',
            'Weiterentwicklung und Wartung des JSipher-Projekts',
            'Betreuung von JSipher im Live-Einsatz'
          ],
          technologies: ['Vue.js', 'TypeScript', 'HTML', 'SCSS', 'UML'],
          type: 'work',
          location: 'Gummersbach',
          shortTitle: 'Wissenschaftliche Hilfskraft'
        },
        {
          id: 'work5',
          company: 'REWE digital GmbH',
          position: 'Werkstudent: Software Architect',
          startDate: '2024',
          endDate: 'present',
          description: [
            'Webentwicklung interner Systeme (Fullstack)',
            'Dokumentation per JIRA und Confluence',
            'Arbeit mit Scrum'
          ],
          technologies: ['Angular', 'TypeScript', 'HTML', 'SCSS', 'Kotlin Spring Boot'],
          type: 'work',
          location: 'hybrid',
          shortTitle: 'Werkstudent Software Architect'
        },
        {
          id: 'future',
          company: '',
          position: 'Vielleicht bei Ihnen?',
          startDate: '?',
          endDate: 'Zukunft',
          description: [],
          type: 'future',
          shortTitle: ''
        }
      ]
    }
  ];

  // Defines the skill categories with their respective skills
  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend-Entwicklung',
      icon: '🎨',
      skills: ['Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML', '(S)CSS']
    },
    {
      title: 'Backend-Entwicklung',
      icon: '⚙️',
      skills: ['Spring Boot', 'Java', 'Kotlin']
    },
    {
      title: 'Projektmanagement',
      icon: '📊',
      skills: ['Scrum', 'Kanban', 'Jira', 'Confluence', 'MS Project']
    },
    {
      title: 'Weitere',
      icon: '🚀',
      skills: ['UML', 'Microsoft Office', 'Figma']
    }
  ];
}
