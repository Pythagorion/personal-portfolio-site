import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.html',
  styleUrl: './intro.scss'
})
export class Intro implements OnInit {
  greeting: string = '';

  ngOnInit(): void {
    this.updateGreeting();

    // Optional: Greeting alle 30 Minuten aktualisieren
    setInterval(() => {
      this.updateGreeting();
    }, 30 * 60 * 1000); // 30 Minuten
  }

  private updateGreeting(): void {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      this.greeting = 'Guten Morgen';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greeting = 'Guten Tag';
    } else if (currentHour >= 18 && currentHour < 22) {
      this.greeting = 'Guten Abend';
    } else {
      this.greeting = 'Gute Nacht';
    }
  }
}
