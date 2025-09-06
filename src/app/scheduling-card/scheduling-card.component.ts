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
  today: Date = new Date();
  futureDates: Date[] = [
    new Date(),
    new Date(Date.now() + 24 * 60 * 60 * 1000),
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  ];
  selectedDate: Date = this.today;
  selectedSlot: string | null = null;
  slotAvailability: { [key: string]: number } = {
    '9:00 AM': 2,
    '10:00 AM': 2,
    '11:00 AM': 2,
    '12:00 PM': 2,
    '1:00 PM': 2,
    '2:00 PM': 2,
    '3:00 PM': 2,
    '4:00 PM': 2,
    '5:00 PM': 2
  };
  slots: string[] = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  showDatePicker = false;

  get formattedDate(): string {
    return this.selectedDate.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  isSlotDisabled(slot: string): boolean {
    // Only disable for today
    if (this.selectedDate.toDateString() !== this.today.toDateString()) return false;
    const now = new Date();
    const slotHour = this.getHourFromSlot(slot);
    return now.getHours() >= slotHour;
  }

  getHourFromSlot(slot: string): number {
    // Converts '9:00 AM' to 9, '1:00 PM' to 13, etc.
    const [time, period] = slot.split(' ');
    let [hour, minute] = time.split(':').map(Number);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    return hour;
  }

  selectSlot(slot: string) {
    if (!this.isSlotDisabled(slot)) {
      this.selectedSlot = slot;
    }
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.selectedSlot = null;
  }

  openDatePicker() {
    this.showDatePicker = true;
  }

  onDatePicked(event: any) {
    this.selectDate(new Date(event.target.value));
    this.showDatePicker = false;
  }
}
