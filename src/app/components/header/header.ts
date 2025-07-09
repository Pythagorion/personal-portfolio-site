import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

interface NavigationItem {
  id: string;
  label: string;
  target: string;
  icon?: string;
}

interface HeaderSettings {
  isDarkMode: boolean;
  currentLanguage: 'de' | 'en';
  isSticky: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  @Output() themeToggle = new EventEmitter<'light' | 'dark'>();
  @Output() languageToggle = new EventEmitter<'de' | 'en'>();
  @Output() stickyToggle = new EventEmitter<boolean>();

  headerSettings: HeaderSettings = {
    isDarkMode: false,
    currentLanguage: 'de',
    isSticky: true
  };

  currentLanguage: 'de' | 'en' = 'de';
  navigationItems: NavigationItem[] = [];
  activeSection: string = 'intro';
  isScrolled: boolean = false;
  isMobileMenuOpen: boolean = false;

  ngOnInit(): void {
    this.updateNavigationItems();
    this.loadSettings();
    this.detectActiveSection();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
    this.detectActiveSection();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }
  private updateNavigationItems(): void {
    this.navigationItems = [
      {
        id: 'intro',
        label: this.currentLanguage === 'de' ? 'Intro' : 'Intro',
        target: '#intro-section'
      },
      {
        id: 'projects',
        label: this.currentLanguage === 'de' ? 'Projekte' : 'Projects',
        target: '#projects-section'
      },
      {
        id: 'cv',
        label: this.currentLanguage === 'de' ? 'Lebenslauf' : 'CV',
        target: '#cv-section'
      }
    ];
  }

  private loadSettings(): void {
    // Load from localStorage
    const savedSettings = localStorage.getItem('portfolio-settings');
    if (savedSettings) {
      this.headerSettings = { ...this.headerSettings, ...JSON.parse(savedSettings) };
    }

    this.currentLanguage = this.headerSettings.currentLanguage;
    this.updateNavigationItems();
  }

  private saveSettings(): void {
    localStorage.setItem('portfolio-settings', JSON.stringify(this.headerSettings));
  }

  toggleTheme(): void {
    this.headerSettings.isDarkMode = !this.headerSettings.isDarkMode;
    const newTheme = this.headerSettings.isDarkMode ? 'dark' : 'light';
    this.themeToggle.emit(newTheme);
    this.saveSettings();
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'de' ? 'en' : 'de';
    this.headerSettings.currentLanguage = this.currentLanguage;
    this.updateNavigationItems();
    this.languageToggle.emit(this.currentLanguage);
    this.saveSettings();
  }

  toggleSticky(): void {
    this.headerSettings.isSticky = !this.headerSettings.isSticky;
    this.stickyToggle.emit(this.headerSettings.isSticky);
    this.saveSettings();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  navigateToSection(target: string, event: Event): void {
    event.preventDefault();

    const element = document.querySelector(target);
    if (element) {
      const headerHeight = this.headerSettings.isSticky ? 80 : 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  private detectActiveSection(): void {
    const sections = ['intro', 'projects', 'cv'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.querySelector(`#${section}-section`);
      if (element) {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const elementBottom = elementTop + element.clientHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}
