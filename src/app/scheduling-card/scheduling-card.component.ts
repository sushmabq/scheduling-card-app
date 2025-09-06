import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scheduling-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scheduling-card.component.html',
  styleUrls: ['./scheduling-card.component.scss']
})
export class SchedulingCardComponent {
  @Input() schedule: any;
  selectedSlot: string | null = null;

  selectSlot(slot: string) {
    this.selectedSlot = slot;
  }
}
