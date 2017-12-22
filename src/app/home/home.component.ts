import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, TagsService, UserService } from '../shared';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isAuthenticated: boolean;
    listConfig: ArticleListConfig = new ArticleListConfig();
    tags: Array<string> = [];
    tagsLoaded = false;
    slideData = [{
        image: 'https://e-space.vn/images/e-space-xmas-banner-min.png',
        title: 'Christmas event',
        description: 'Christmas event at viet nam',
        href: 'https://e-space.vn/christmas-tree'
    }, {
        image: 'https://e-space.vn/images/traotanghocbongtienganh.png',
        title: '',
        href: 'https://e-space.vn/hoc-bong'
    }, {
        image: 'https://e-space.vn/images/UUDAITHANHVIEN1a.jpg',
        title: '',
        href: 'https://e-space.vn/tich-diem/'
    }];
    constructor(
        private router: Router,
        private tagsService: TagsService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            (authenticated) => {
                this.isAuthenticated = authenticated;

                // set the article list accordingly
                if (authenticated) {
                    this.setListTo('feed');
                } else {
                    this.setListTo('all');
                }
            }
        );

        this.tagsService.getAll()
            .subscribe(tags => {
                this.tags = tags;
                this.tagsLoaded = true;
            });
    }

    setListTo(type: string = '', filters: Object = {}) {
        // If feed is requested but user is not authenticated, redirect to login
        if (type === 'feed' && !this.isAuthenticated) {
            this.router.navigateByUrl('/login');
            return;
        }

        // Otherwise, set the list object
        this.listConfig = { type: type, filters: filters };
    }
}
