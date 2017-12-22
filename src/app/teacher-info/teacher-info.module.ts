import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeacherInfoComponent } from './teacher-info.component';
import { AuthGuard, SharedModule } from '../shared';

const settingsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'teacher',
    component: TeacherInfoComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    settingsRouting
  ],
  declarations: [
    TeacherInfoComponent
  ]
})
export class TeacherModule {}
