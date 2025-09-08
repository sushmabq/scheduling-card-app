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
  futureDates: Date[] = [];
  selectedDate: Date;
  selectedSlot: string | null = null;
  slotAvailability: { [key: string]: number } = {};
  slots: string[] = [];
  showDatePicker = false;

  constructor() {
    // Generate next 3 days dynamically
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(this.today.getDate() + i);
      this.futureDates.push(date);
    }
    this.selectedDate = this.futureDates[0];

    // Generate time slots dynamically (9 AM to 5 PM)
    this.slots = [];
    this.slotAvailability = {};
    for (let hour = 9; hour <= 17; hour++) {
      let displayHour = hour;
      let period = 'AM';
      if (hour > 12) {
        displayHour = hour - 12;
        period = 'PM';
      } else if (hour === 12) {
        period = 'PM';
      }
      const slot = `${displayHour}:00 ${period}`;
      this.slots.push(slot);
      this.slotAvailability[slot] = 2; // Example: 2 available for each slot
    }
  }

  // Example: Booked slots for demonstration
  bookedSlots: string[] = ['10:00 AM', '2:00 PM'];
  // Returns true if the slot is booked
  isSlotBooked(slot: string): boolean {
    return this.bookedSlots.includes(slot);
  }

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
