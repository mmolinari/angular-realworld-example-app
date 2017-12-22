import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { CalendarModule } from './calendar/calendar.module';
import { TeacherModule } from 'app/teacher-info/teacher-info.module';
import { ReduxModule } from './redux/redux.module';
import {
    MaterialModule, MdToolbarModule, MdCoreModule, MdButtonModule, MdSidenavModule, MdSelectModule, MdOption, MdSelect,
    MdListModule, MdCardModule, MdDatepickerModule, MdNativeDateModule
} from '@angular/material';

import {
    ApiService,
    ArticlesService,
    AuthGuard,
    CommentsService,
    FooterComponent,
    HeaderComponent,
    JwtService,
    ProfilesService,
    SharedModule,
    TagsService,
    UserService
} from './shared';

import {CalendarService} from './services/calendar.service';
import {TrelloAuthService} from './services/trello-auth.service';
import {TrelloHttpService} from './services/trello-http.service';
import {MemberGuard} from './services/guards/memberGuard';
import {VisitorGuard} from './services/guards/visitorGuard';
import {TrelloPullService} from './services/trello-pull.service';
import {DateTimeFormatService} from './services/date-time-format.service';
import {DndModule} from 'ng2-dnd';

import {MemberActions} from './redux/actions/member-actions';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FrontPageComponent } from 'app/front-page/front-page.component';
import { CalendarComponent } from 'app/calendar/calendar.component';
import { IntroModule } from 'app/intro/intro.module';
import { SupportComponent } from './support/support.component';
import { FeatureComponent } from './feature/feature.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([{
    path: 'hello',
    component: FrontPageComponent
  }], { useHash: true });

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        FrontPageComponent,
        SupportComponent,
    ],
    imports: [
        BrowserModule,
        ArticleModule,
        TeacherModule,
        AuthModule,
        EditorModule,
        HomeModule,
        IntroModule,
        ProfileModule,
        rootRouting,
        SharedModule,
        SettingsModule,
        CalendarModule,
        ReduxModule,
        MaterialModule,
        MdCoreModule,
        MdToolbarModule,
        MdButtonModule,
        MdSidenavModule,
        MdSelectModule,
        MdListModule,
        MdCardModule,
        MdDatepickerModule,
        MdNativeDateModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        DndModule.forRoot(),
    ],
    providers: [
        ApiService,
        ArticlesService,
        AuthGuard,
        CommentsService,
        JwtService,
        ProfilesService,
        TagsService,
        UserService,

        CalendarService,
        TrelloAuthService,
        TrelloHttpService,
        MemberGuard,
        VisitorGuard,
        TrelloPullService,
        DateTimeFormatService,
        MemberActions,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
