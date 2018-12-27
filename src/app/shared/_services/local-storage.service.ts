import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    private localStorage: Storage;
    private prefix = '__shp__';

    constructor() {
        try {
            this.localStorage = window['localStorage'];
            const x = '__storage_test__';
            this.localStorage.setItem(x, x);
            this.localStorage.removeItem(x);
        } catch (e) {
            throw new Error('Current browser does not support Local Storage');
        }
    }

    public setPrefix(prefix: string): void {
        this.prefix = prefix;
    }

    public set(key: string, value: string): void {
        this.localStorage[this.prefix + key] = value;
    }

    public get(key: string): string {
        return this.localStorage[this.prefix + key];
    }

    public setObject(key: string, value: any): void {
        this.localStorage[this.prefix + key] = JSON.stringify(value);
    }

    public getObject(key: string): any {
        const obj = this.localStorage[this.prefix + key];
        return obj ? JSON.parse(obj) : null;
    }

    public remove(key: string): void {
        this.localStorage.removeItem(this.prefix + key);
    }

}
