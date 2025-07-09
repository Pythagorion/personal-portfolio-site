export interface NavigationItem {
  id: string;
  label: string;
  target: string; // CSS-Selector oder ID
  icon?: string;
}

export interface HeaderSettings {
  isDarkMode: boolean;
  currentLanguage: 'de' | 'en';
  isSticky: boolean;
}
