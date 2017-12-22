import {Card} from '../../models/card';
import {User} from '../../models/user';
import {Board} from '../../models/board';
import {CalendarState} from '../reducers/calendar.reducer';
import {Settings} from '../../models/settings';
import {Member} from '../../models/member';

const persistState = require('redux-localstorage');

export const enhancers = [
  persistState('cards', {key: 'w11k.trello-cal/cards'}),
  persistState('boards', {key: 'w11k.trello-cal/boards'}),
  persistState('user', {key: 'w11k.trello-cal/user'}),
  persistState('settings', {key: 'w11k.trello-cal/settings'}),
  persistState('lists', {key: 'w11k.trello-cal/lists'}),
  persistState('members', {key: 'w11k.trello-cal/members'}),
];

if (window.devToolsExtension) {
  enhancers.push(window.devToolsExtension());
}

export interface RootState {
  cards: Card[];
  boards: Board[];
  user: User;
  calendar: CalendarState;
  settings: Settings;
  lists: Object;
  members: Object;
}
