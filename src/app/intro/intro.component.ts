import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'eo-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
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
    constructor() { }

    ngOnInit() {
    }

}
