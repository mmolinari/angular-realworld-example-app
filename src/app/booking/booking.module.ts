import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { RouterModule } from '@angular/router';

const settingsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'booking',
    component: BookingComponent
  }
]);

@NgModule({
  imports: [
    CommonModule,
    settingsRouting
  ],
  declarations: [BookingComponent]
})
export class BookingModule { }
