import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingCardComponent } from './scheduling-card/scheduling-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SchedulingCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('scheduling-card-app');
}
