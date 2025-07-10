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

    /**
     * Set an interval to update the greeting every 30 minutes.
     * This ensures that the greeting is always current
     * and reflects the time of day.
     */
    setInterval(() => {
      this.updateGreeting();
    }, 30 * 60 * 1000);
  }

  /**
   * Updates the greeting based on the current time of day.
   * The greeting changes according to the following schedule:
   * - Morning: 5:00 AM to 11:59 AM
   * - Afternoon: 12:00 PM to 5:59 PM
   * - Evening: 6:00 PM to 9:59 PM
   * - Night: 10:00 PM to 4:59 AM
   */
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
