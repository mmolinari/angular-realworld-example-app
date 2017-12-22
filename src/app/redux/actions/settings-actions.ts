// Hint: Action is triggered by user interaction, network request, ...

import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {RootState} from '../store';

export enum CalendarType {
  Week, Month
}

export enum WeekStart {
  Sunday, Monday
}

@Injectable()
export class SettingsActions {

  static SET_LANG: string = 'SET_LANG';
  static RESET_SETTINGS_STORE: string = 'RESET_SETTINGS_STORE';
  static SET_BOARD_COLOR: string = 'SET_BOARD_COLOR';
  static SET_BOARD_VISIBILITY: string = 'SET_BOARD_VISIBILITY';
  static REMOVE_BOARD_PREFERENCES: string = 'REMOVE_BOARD_PREFERENCES';
  static CHANGE_TYPE: string = 'CHANGE_TYPE';
  static TOGGLE_INCLUDE_DONE: string = 'TOGGLE_INCLUDE_DONE';
  static TOGGLE_SHOW_MEMBERS: string = 'TOGGLE_SHOW_MEMBERS';
  static SET_FILTER_FOR_USER: string = 'SET_FILTER_FOR_USER';

  constructor(private ngRedux: NgRedux<RootState>) {
  }

  public setLanguage(locale: string) {
    this.ngRedux.dispatch({type: SettingsActions.SET_LANG, payload: locale});
  };

  public toggleIncludeDoneCards(preference: boolean) {
    this.ngRedux.dispatch({type: SettingsActions.TOGGLE_INCLUDE_DONE, payload: preference});
  };

  public toggleShowMembers(preference: boolean) {
    this.ngRedux.dispatch({type: SettingsActions.TOGGLE_SHOW_MEMBERS, payload: preference});
  };


  public changeCalendarType() {
    this.ngRedux.dispatch({type: SettingsActions.CHANGE_TYPE});
  }

  public resetStore() {
    this.ngRedux.dispatch({type: SettingsActions.RESET_SETTINGS_STORE});
  }

  public resetBoardPrefs() {
    // keeps language
    this.ngRedux.dispatch({type: SettingsActions.REMOVE_BOARD_PREFERENCES});
  }

  public setBoardColor(boardId: string, color: string) {
    this.ngRedux.dispatch({type: SettingsActions.SET_BOARD_COLOR, payload: {boardId, color}});
  }

  public setBoardVisibility(boardId: string, visibility: boolean) {
    this.ngRedux.dispatch({type: SettingsActions.SET_BOARD_VISIBILITY, payload: {boardId, visibility}});
  }

  public setFilterForUser(userId: string) {
    this.ngRedux.dispatch({type: SettingsActions.SET_FILTER_FOR_USER, payload: userId});
  }
}
