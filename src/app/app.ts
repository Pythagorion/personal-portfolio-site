import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Intro} from './components/intro/intro';
import {ProjectGridComponent} from './components/project-grid/project-grid';
import {CvSectionComponent} from './components/cv-section/cv-section';
import {HeaderComponent} from './components/header/header';

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
  selector: 'app-root',
  imports: [RouterOutlet, Intro, ProjectGridComponent, CvSectionComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'portfolio-ph-site';

  currentTheme: 'light' | 'dark' = 'light';

  projects: Project[] = [
    {
      id: '1',
      title: 'JSipher - XMI-to-JSON Konverter',
      description: 'Ein XMI-zu-JSON Konverter, welcher im Rahmen meiner Bachelorarbeit entwickelt wurde. Er ermöglicht XMI-Dateien aus dem UML-Modellierungstool Papyrus in ein JSON-Format zu konvertieren, das für die weitere Verarbeitung in der Webanwendung KEAMod gedacht ist. Ebenfalls an Bord ist ein JACK3-Konverter, welcher XMI-Dateien aus Papyrus für das Assessment-Tool JACK3 der Universität Duisburg-Essen kompatibel macht.',
      shortDescription: 'Mehrere XMI-Konverter, um automatisiertes formatives Feedback in der Lehre zu ermöglichen.',
      imageUrl: 'assets/images/jsipher-site-app.png',
      technologies: ['Vue.js', 'TypeScript', 'HTML', 'SCSS', 'Figma'],
      githubUrl: 'https://github.com/Uni-Projects-PH/JSipher-Website',
      liveUrl: 'https://fsygs15.gm.fh-koeln.de/#/',
      isDeployed: true,
      projectType : 'web',
      collaborationType: 'solo'
    },
    {
      id: '2',
      title: 'JSipher - Desktop App',
      description: 'Ein XMI-zu-JSON Konverter, welcher im Rahmen meiner Bachelorarbeit entwickelt wurde. Er ermöglicht XMI-Dateien aus dem UML-Modellierungstool Papyrus in ein JSON-Format zu konvertieren, das für die weitere Verarbeitung in der Webanwendung KEAMod gedacht ist. Ebenfalls an Bord ist ein JACK3-Konverter, welcher XMI-Dateien aus Papyrus für das Assessment-Tool JACK3 der Universität Duisburg-Essen kompatibel macht.',
      shortDescription: 'Dies ist die Desktop-App-Version des JSipher-Projekts.',
      imageUrl: 'assets/images/projects/ecommerce-splash.jpg',
      technologies: ['Electron', 'Vue.js', 'TypeScript', 'HTML', 'SCSS', 'Figma'],
      githubUrl: 'https://github.com/Uni-Projects-PH/JSipher-Desktop-App',
      isDeployed: false,
      projectType : 'desktop',
      collaborationType: 'solo',
      deploymentNote: 'Diese App ist nicht online verfügbar, da sie lokal als Electron-App läuft.'
    },
    {
      id: '3',
      title: 'Game-Releases über Ort & Zeit',
      description: 'Im Rahmen eines Visualisierungsprojekts sollten wir eine auf D3 basierte Webanwendung realisieren. In meinem Projekt habe ich tausende Videospiel-Releases über einen Zeitraum von etwa 40 Jahren visualisiert. Die Anwendung ermöglicht es die numerische Verteilung auf einem Zeitstrahl zu betrachten, sowie die Herkunft der Entwickler auf einer Weltekarte zu sehen. Die Daten werden aus einer lokalen CSV-Datei geladen, welche wiederum aus der VGChartz.com Database gescraped wurde.',
      shortDescription: 'Visualisierungsprojekt zu Videospielen.',
      imageUrl: 'assets/images/projects/ecommerce-splash.jpg',
      technologies: ['D3', 'TypeScript', 'JavaScript','HTML', 'SCSS', 'Figma'],
      githubUrl: 'https://github.com/Uni-Projects-PH/visualization-project-game-releases',
      liveUrl: 'https://ecommerce-demo.netlify.app',
      isDeployed: true,
      projectType : 'web',
      collaborationType: 'solo'
    },
    {
      id: '4',
      title: 'Ymir - Sprache zur Generierung von Boilerplate-Code',
      description: 'Bei Ymir bzw. YmirScript handelt es sich um das Praxisprojekt im Bachelorstudium. Dieses Projekt habe ich zusammen mit meinem Bruder umgesetzt und war das letzte Projekt vor meiner Bachelorarbeit. Ymir ist eine Definitionssprache, die es ermöglicht, Boilerplate-Code für verschiedene Sprachen zu generieren. Die Sprache ist so konzipiert worden, dass sie leicht um weitere Sprachen erweitert werden kann. Zum aktuellen Zeitpunkt unterstützt Ymir Java, JavaScript und Swagger.',
      shortDescription: 'Eine Definitionssprache um Boilerplate-Code zu generieren.',
      imageUrl: 'assets/images/projects/ecommerce-splash.jpg',
      technologies: ['TypeScript'],
      githubUrl: 'https://github.com/ymirscript',
      isDeployed: false,
      projectType : 'web',
      collaborationType: 'team',
      deploymentNote: 'Dieses Projekt ist nicht online verfügbar, da Entwickler die Sprache zum Beispiel in Terminals verwenden können.'
    },
    {
      id: '5',
      title: 'Ich habs richtig, aber ich habs falsch - Quiz',
      description: 'Bei diesem Quiz-Format handelt es sich um ein Quiz, das von der Content-Creator-Truppe PietSmiet stammt. Die Spielidee ist daher nicht meine eigene, aber die Umsetzung als Webseite ist von mir. Das Quiz besteht aus verschiedenen Kategorien, die einem thematischen Schwerpunkt zugeordnet werden. Jeder Kategorie werden Wertigkeiten (in Form von Punkten) zugeordnet. Ein Spieler sucht sich eine Kategorie und Wertigkeit aus und hat dann ein bestimmetes Zeitlimit möglichst viele Fragen FALSCH zu beantworten. Und das ist der Twist: Die Fragen sind recht einfach, müssen aber falsch beantwortet werden, um Punkte zu erhalten. Werden die Fragen richtig beantwortet, gibt es Minuspunkte. Dieses Projekt ist eines meiner ersten und das erste mit Vue. Die Fragen werden nicht in die Webseite eingepflegt und die Webseite selbst ist nur lokal und für die Punkteverrechnung zuständig.',
      shortDescription: 'Ein einfaches Quizformat, bei dem Spieler Fragen falsch beantworten müssen.',
      imageUrl: 'assets/images/projects/ecommerce-splash.jpg',
      technologies: ['TypeScript', 'Vue.js', 'HTML', 'SCSS', 'Figma'],
      githubUrl: 'https://github.com/Uni-Projects-PH/right-n-wrong',
      liveUrl: 'https://ecommerce-demo.netlify.app',
      isDeployed: true,
      projectType : 'web',
      collaborationType: 'solo'
    },
    {
      id: '6',
      title: 'Mein Projekt-Porfolio',
      description: 'Diese Webseite hier ist eigens entwickelt und ist demnach ebenfalls ein von mir realisiertes Projekt. Da die meisten meiner privaten Projekte Vue.js verwenden, verwendet diese Seite Angular, um meine Kenntnisse darin ebenfalls unter Beweis zu stellen.',
      shortDescription: 'Webseite, um mein bisheriges Portfolio zu präsentieren.',
      imageUrl: 'assets/images/projects/ecommerce-splash.jpg',
      technologies: ['TypeScript', 'Angular', 'HTML', 'SCSS', 'Figma'],
      githubUrl: 'https://github.com/Pythagorion/personal-portfolio-site',
      isDeployed: false,
      projectType : 'web',
      collaborationType: 'solo',
      deploymentNote: 'Da es sich bei diesem Projekt, um diese Seite hier handelt, gibt es keinen externen Link.'
    }
  ];

  constructor() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  onThemeToggle(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  onLanguageToggle(language: 'de' | 'en'): void {
    // Hier später I18n-Integration
    console.log('Language switched to:', language);
  }

  onStickyToggle(isSticky: boolean): void {
    // Header-Sticky-State wird automatisch gehandhabt
    console.log('Sticky mode:', isSticky);
  }
}
