import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { Package } from '../../packages/_models/package.model';
import { Item } from '../../packages/_models/item.model';
import { UuidService } from './uuid.service';
import { ADDRESSES, LOREM_IPSUM, ITEM_NAMES, ITEM_UNITS } from '../_data/fake-data';

@Injectable()
export class UtilService {

    constructor(
        private localStorageService: LocalStorageService,
        private uuid: UuidService
    ) { }

    buildFilters(obj: Object): { filter: string, value: string }[] {
        const filters = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== '') {
                filters.push({ filter: key, value: obj[key] });
            }
        }
        return filters;
    }

    clearPackages(): void {
        this.localStorageService.remove('packages');
        this.localStorageService.remove('packagesIdCounter');
        this.localStorageService.remove('packagesItemIdCounter');
    }

    generatePackages(count: number): void {
        const packages: Package[] = this.localStorageService.getObject('packages') || [];
        let packagesIdCounter: number = parseInt(this.localStorageService.get('packagesIdCounter')) || 0;
        let packagesItemIdCounter: number = parseInt(this.localStorageService.get('packagesItemIdCounter')) || 0;
        let p: Package;
        for (let i = 0; i < count; i++) {
            p = this.generateRandomPackage();
            packagesIdCounter++;
            p.id = packagesIdCounter;
            p.items.map(item => {
                item.id = ++packagesItemIdCounter;
            })
            packages.push(p);
        }
        this.localStorageService.setObject('packages', packages);
        this.localStorageService.set('packagesIdCounter', packagesIdCounter.toString());
        this.localStorageService.set('packagesItemIdCounter', packagesItemIdCounter.toString());
    }

    private generateRandomPackage(): Package {
        const p: Package = <Package>Object.assign({}, this.getRandomItem(ADDRESSES));
        p.phoneNumber = this.generateRandomPhoneNumber();
        p.initialTransportDate = this.getRandomDate();
        p.trackingNumber = this.uuid.generate();
        p.description = LOREM_IPSUM;
        p.items = [];

        const x = Math.floor(Math.random() * 10) + 1,
            itemNames = [];
        let item: Item;
        for (let i = 0; i <= x; i++) {
            item = this.getRandomPackageItem();
            if (itemNames.indexOf(item.name) === -1) {
                itemNames.push(item.name);
                p.items.push(item);
            }
        }
        return p;
    }

    private getRandomPackageItem(): Item {
        return <Item>{
            name: this.getRandomItem(ITEM_NAMES),
            unit: this.getRandomItem(ITEM_UNITS),
            quantity: +(Math.random() * 999 + 1).toFixed(2)
        }
    }

    private generateRandomPhoneNumber(): string {
        return Math.floor(100000000 + Math.random() * 900000000).toString();
    }

    private getRandomItem(items: any[]): any {
        return items[Math.floor(Math.random() * items.length)];
    }

    private getRandomDate(): Date {
        const now = new Date();
        const from = now.getTime();
        const to = new Date().setFullYear(now.getFullYear() + 1);
        return new Date(from + Math.random() * (to - from));
    }

}
