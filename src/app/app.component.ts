import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { RootState, enhancers } from './redux/store/index';
import { NgReduxRouter } from '@angular-redux/router';
import reducer from '../app/redux/reducers/index';
import { NgRedux, select } from '@angular-redux/store';
import { UserService } from './shared';
import { Observable, Subscription } from 'rxjs';
import { Settings } from './models/settings';
import { SettingsActions } from './redux/actions/settings-actions';
import { ListActions } from './redux/actions/list-actions';
import { CardActions } from './redux/actions/card-actions';
import { UserActions } from './redux/actions/user-actions';
import { BoardActions } from './redux/actions/board-actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    @select('settings') public settings$: Observable<Settings>;

    public settings: Settings = new Settings();
    private subscriptions: Subscription[] = [];
    private initStore: RootState = {
        cards: [],
        boards: [],
        user: null,
        calendar: {
            days: [],
            date: null
        },
        settings: new Settings(),
        lists: {},
        members: {}
    };

    public isSidenavOpen = false;
    constructor(private ngRedux: NgRedux<RootState>,
        private ngReduxRouter: NgReduxRouter,
        private userService: UserService
    ) {
        this.ngRedux.configureStore(
            reducer,
            this.initStore,
            [],
            enhancers
        );
        ngReduxRouter.initialize();
    }

    ngOnInit() {
        this.userService.populate();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
      }

}
