import { Component } from '@angular/core';

import { UtilService } from './shared/_services/util.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Welcome in Shipment Managment App';

    constructor(
        private utilService: UtilService
    ) {}

    generateData(): void {
        this.utilService.generatePackages(100);
        window.location.reload();
    }

    clearData(): void {
        this.utilService.clearPackages();
        window.location.reload();
    }
}
