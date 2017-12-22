import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { FeatureComponent } from 'app/feature/feature.component';
import { TopTeacherComponent } from 'app/top-teacher/top-teacher.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    TopTeacherComponent,
    FeatureComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
