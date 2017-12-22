import { Component, OnInit, Input } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { setTimeout } from 'timers';
declare var $: any;
@Component({
    selector: 'eo-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterContentInit {
    @Input() data;
    constructor() { }

    ngOnInit() {

    }

    ngAfterContentInit() {
        setTimeout(() => {
            $('#carousel-example-generic .carousel-indicators .dot:nth-child(1)').addClass('active');
            $('#carousel-example-generic .carousel-inner .item:nth-child(1)').addClass('active');
        }, 200);
    }
}
