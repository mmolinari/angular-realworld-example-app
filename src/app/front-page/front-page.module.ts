import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FrontPageComponent} from './front-page.component';
import {CalendarModule} from '../calendar/calendar.module';
import {MdToolbarModule, MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    MdToolbarModule,
    FlexLayoutModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    FrontPageComponent,
  ],
  bootstrap: [
  ]
})
export class FrontPageModule {
}
