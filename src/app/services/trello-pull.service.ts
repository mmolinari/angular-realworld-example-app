import {Injectable} from '@angular/core';
import {CardActions} from '../redux/actions/card-actions';
import {BoardActions} from '../redux/actions/board-actions';
import {UserActions} from '../redux/actions/user-actions';
import {TrelloHttpService} from './trello-http.service';
import {Board} from '../models/board';
import * as moment from 'moment';
import {ListActions} from '../redux/actions/list-actions';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {MemberActions} from '../redux/actions/member-actions';
import * as _ from 'lodash';
import {select} from '@angular-redux/store';
import {selectBoards} from '../redux/store/selects';
import 'rxjs/add/operator/take';

@Injectable()
export class TrelloPullService {

  public loadingState$: Subject<boolean> = new ReplaySubject();

  @select(selectBoards) private allBoards$: Observable<Board[]>;

  constructor(private tHttp: TrelloHttpService,
              public userActons: UserActions,
              public boardActions: BoardActions,
              public cardActions: CardActions,
              public listActions: ListActions,
              private memberActions: MemberActions) {
  }

  public pull = () => {
    this.loadingState$.next(true);
    this._fetchBoards();
    this._fetchUser();
  }


  private _fetchBoards = () => {
    this.tHttp.get('member/me/boards', null).subscribe(
      data => {
        let boards: Board[] = data.json();

        // first, remove boards, because otherwise the change in the closed property is not recognized
        this._removeBoards(boards);
        this.boardActions.updateBoards(boards);

        let openBoards = _.filter(boards, {'closed': false});
        const toLoadBoards = this._checkBoards(openBoards);

        if (toLoadBoards && toLoadBoards.length) {
          this._loadCardsOfBoard(openBoards);
        } else {
          this.loadingState$.next(false);
        }

      },
      err => {
        // no token, do nothing;
      });

  }

  private _fetchUser = () => {
    this.tHttp.get('/members/me').subscribe(
      data => this.userActons.addUser(data.json()),
      error => console.log(error)
    );
  }


  // determines if each Board in an array is fresh (pulled)
  private _checkBoards = (boards: Board[]): Board[] => {
    return boards.filter(
      board => {
        if (board.lastPulledAt) {
          // board cards are already pulled
          return moment(board.lastPulledAt).isBefore(moment(board.dateLastActivity));
        } else {
          // board cards are yet not pulled, add it to toLoadBoardArray
          return true;
        }
      });
  }

  private _loadCardsOfBoard(boards: Board[]) {
    let delay = 50;

    function getDelay() {
      delay = delay * 1.15;
      if (delay > 1200) {
        return 1200;
      }
      return delay;
    }

    let i = 0;

    let delayedBoards$ = Observable
      .from(boards)
      .concatMap(event => Observable.timer(getDelay()).map(() => event));

    delayedBoards$.subscribe((board) => {
      i++;
      // Fetch Cards of Board
      let boardRequest = this.tHttp.get('boards/' + board.id + '/cards');
      boardRequest
        .subscribe(
          response => {
            this.cardActions.rebuildStorePartially(response.json(), board, new Date());
          }
        );

      // Fetch Lists of Board
      let listRequest = this.tHttp.get('boards/' + board.id + '/lists');
      listRequest
        .subscribe(
          response => {
            this.listActions.rebuildStorePartially(response.json(), board, new Date());
          }
        );


      // Fetch Members of Board
      let memberRequest = this.tHttp.get('boards/' + board.id + '/members', null, 'fields=all');
      memberRequest
        .subscribe(
          response => {
            // console.log(response.json());
            this.memberActions.rebuildStorePartially(response.json(), board, new Date());
          }
        );


      if (i === boards.length) {
        Observable
          .combineLatest(boardRequest, memberRequest)
          .subscribe(() => {
            // => this is last request
            this.loadingState$.next(false);
          });
      }
    });
  }

  /**
   * not the nicest way, of how to remove Boards.
   * The problem is, boards can either be closed, or completely removed
   * Closed Boards, are still sent from trello, with the property closed = true
   * But deleted boards are not sent at all ...
   */
  private _removeBoards(allBoardsFromTrello: Board[]) {

    this.allBoards$.take(1).subscribe(boardsFromStore => {
      // console.log('boardsFromStore');
      // console.log(boardsFromStore);

      // Board has to be closed if
      // open -> closed
      // not sent from trello

      let toCloseBoards = boardsFromStore.filter(board => {

        // board was already closed ... do nothing
        if (board.closed === true) {
          return false;
        }

        // board was active, find the matching board sent from trello
        let boardFromTrello = allBoardsFromTrello.find(boardFromStore => boardFromStore.id === board.id);

        if (boardFromTrello) {
          // board was closed in trello
          if (boardFromTrello.closed === true) {
            return true;
          } else {
            return false;
          }
          // board was not sent from trello anymore ... must have been deleted
        } else {
          return true;
        }
      });

      // console.log('toCloseBoards');
      // console.log(toCloseBoards);

      if (toCloseBoards.length > 0) {
        // console.log('Removing ' + toCloseBoards.length + ' boards.');
        toCloseBoards.forEach(board => {
          this.cardActions.removeCardsByBoardId(board.id);
        });
        this.boardActions.removeBoards(toCloseBoards);
      }

    });
  }
}
