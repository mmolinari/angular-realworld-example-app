import { Component } from '@angular/core';

@Component({
    selector: 'layout-footer',
    styleUrls: ['./footer.component.scss'],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    today: number = Date.now();
}
