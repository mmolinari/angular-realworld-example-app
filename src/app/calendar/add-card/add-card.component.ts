import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { Board } from '../../models/board';
import { TrelloHttpService } from '../../services/trello-http.service';
import { Member } from '../../models/member';
import { List } from '../../models/list';
import * as moment from 'moment';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectOpenBoards } from '../../redux/store/selects';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit, OnDestroy {

    public card: Card = new Card();
    public boards: Board[] = [];
    public members: Member[] = [];
    public lists: List[] = [];
    public cardForm: FormGroup;
    private subscriptions: Subscription[] = [];
    @select(selectOpenBoards) public boards$: Observable<Board[]>;

    constructor(public dialogRef: MdDialogRef<AddCardComponent>, private tHttp: TrelloHttpService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        // this.subscriptions.push(this.boards$.subscribe(boards => this.boards = boards));
        this.boards = [new Board('1', 'Hello', 'Helloe there', false),
        new Board('2', 'Hello2', 'Helloe there2', false)];
        this.cardForm = this.formBuilder.group({
            name: [this.card ? this.card.name : '', Validators.required],
            due: [this.card && this.card.due ? this.card.due : new Date(), []],
            dueDate: [this.card && this.card.due ? this.card.due : new Date(), []],
            dueTime: [this.card && this.card.due ? this.card.due : moment().format('HH:mm'), []],
            desc: [this.card && this.card.desc ? this.card.desc : ''],
            idBoard: [this.card && this.card.idBoard ? this.card.idBoard : null, [Validators.required]],
            idList: [this.card && this.card.idList ? this.card.idList : null, [Validators.required]],
            idMembers: [this.card && this.card.idMembers ? this.card.idList : []],
        });


        this.subscriptions.push(this.cardForm.get('idBoard').valueChanges.subscribe(boardId => {

            // reset values
            this.members = [];
            this.lists = [];
            this.cardForm.get('idList').setValue(null);
            this.cardForm.get('idMembers').setValue(null);

            this.tHttp.get('boards/' + boardId + '/members')
                .subscribe(
                success => this.members = success.json(),
                error => this.members = []
                );
            this.tHttp.get('boards/' + boardId + '/lists')
                .subscribe(
                success => this.lists = success.json(),
                error => this.lists = []
                );
        }));

    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }


    onSubmit(cardForm: FormGroup) {
        if (cardForm && cardForm.valid) {
            cardForm.value.due = moment(moment(cardForm.value.dueDate).format('YYYY-MM-DD') + 'T' + cardForm.value.dueTime, moment.ISO_8601);

            this.tHttp.post('cards/', cardForm.value)
                .subscribe(
                success => this.dialogRef.close(true),
                error => {
                    throw new Error(error);
                }
                );
        }
    }

}
