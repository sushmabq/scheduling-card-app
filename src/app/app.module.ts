
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { SchedulingCardComponent } from './scheduling-card/scheduling-card.component';

@NgModule({
  imports: [BrowserModule, App, SchedulingCardComponent],
  bootstrap: [App]
})
export class AppModule {}
