import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

// Define interfaces for navigation items and header settings
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
// HeaderComponent handles the header functionality including theme, language, and sticky settings
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

  // Initialize the component on component creation
  ngOnInit(): void {
    this.updateNavigationItems();
    this.loadSettings();
    this.detectActiveSection();

    const theme = this.headerSettings.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Listen to scroll and resize events to update the header state
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
    this.detectActiveSection();
  }

  // Close the mobile menu when the window is resized to a larger size
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }
  // Update navigation items based on the current language. This feature is not used in the current implementation but can be extended for multi-language support.
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

  // Load settings from localStorage and initialize the header state
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

  // Toggle the theme between light and dark mode
  toggleTheme(): void {
    this.headerSettings.isDarkMode = !this.headerSettings.isDarkMode;
    const newTheme = this.headerSettings.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    this.themeToggle.emit(newTheme);
    this.saveSettings();
  }

  // Toggle the language between German and English (once again: this feature is not fully implemented in the current code and may be implemented later)1
  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'de' ? 'en' : 'de';
    this.headerSettings.currentLanguage = this.currentLanguage;
    this.updateNavigationItems();
    this.languageToggle.emit(this.currentLanguage);
    this.saveSettings();
  }

  /**
    * Toggle the sticky header setting.
    * This method toggles the isSticky property of the headerSettings object and emits the new value.
    */
  toggleSticky(): void {
    this.headerSettings.isSticky = !this.headerSettings.isSticky;
    this.stickyToggle.emit(this.headerSettings.isSticky);
    this.saveSettings();
  }

  /**
    * Toggle the mobile menu visibility.
    * This method toggles the isMobileMenuOpen property, which controls the visibility of the mobile menu.
    */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
    * Close the mobile menu.
    * This method sets the isMobileMenuOpen property to false, effectively closing the menu.
    */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  /**
    * Navigate to a specific section of the page.
    * This method scrolls smoothly to the target section, adjusting for the header height if it is sticky.
    * @param target - The CSS selector of the target section to navigate to.
    *  @param event - The click event that triggered the navigation.
    */
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

  /**
   * Detects the currently active section based on the scroll position.
   * It updates the activeSection property to reflect which section is currently in view.
   */
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
