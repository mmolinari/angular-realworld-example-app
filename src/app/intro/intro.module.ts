import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { IntroCellComponent } from 'app/intro-cell/intro-cell.component';
import { IntroComponent } from 'app/intro/intro.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'intro',
    component: IntroComponent
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    IntroCellComponent,
    IntroComponent
  ],
  providers: [
  ]
})
export class IntroModule {}
