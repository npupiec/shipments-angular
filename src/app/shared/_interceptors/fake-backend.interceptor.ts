import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor,
    HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from '../_services/local-storage.service';
import { UuidService } from '../_services/uuid.service';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(
        private storage: LocalStorageService,
        private uuid: UuidService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let packages: any[] = this.storage.getObject('packages') || [];

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // create package
            if (request.url.endsWith('/api/package') && request.method === 'POST') {
                // get new package object from post body
                let newPackage = request.body;

                let packagesIdCounter: number = parseInt(this.storage.get('packagesIdCounter')) || 0;
                packagesIdCounter++;
                newPackage.id = packagesIdCounter;
                let packagesItemIdCounter: number = parseInt(this.storage.get('packagesItemIdCounter')) || 0;
                newPackage.items.map(item => {
                    item.id = packagesItemIdCounter++;
                })
                newPackage.trackingNumber = this.uuid.generate();
                this.storage.set('packagesIdCounter', packagesIdCounter.toString());
                this.storage.set('packagesItemIdCounter', packagesItemIdCounter.toString());
                packages.push(newPackage);
                this.storage.setObject('packages', packages);

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 201, body: newPackage }));
            }

            if (request.url.match(/\/api\/package\/\d+$/)) {

                const urlParts = request.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 1]);

                const pac = packages.find(p => { return p.id === id; });

                if (pac === undefined) {
                    return Observable.throw(new HttpErrorResponse({ status: 404, statusText: 'Not found', error: 'Not found' }))
                }

                if (request.method === 'GET') {
                    return Observable.of(new HttpResponse({ status: 200, body: pac }));
                } else if (request.method === 'PUT') {
                    let updatedPackage = request.body;
                    const propsToSkip = ['id', 'trackingNumber', 'items'];
                    for (const key in updatedPackage) {
                        if (pac.hasOwnProperty(key) && propsToSkip.indexOf(key) === -1) {
                            pac[key] = updatedPackage[key]
                        }
                    }

                    let packagesItemIdCounter: number = parseInt(this.storage.get('packagesItemIdCounter')) || 0;
                    pac.items = updatedPackage.items.map(item => {
                        if (!item.id) {
                            item.id = packagesItemIdCounter++;
                        }
                        return item;
                    });
                    this.storage.set('packagesItemIdCounter', packagesItemIdCounter.toString());
                    this.storage.setObject('packages', packages);
                    return Observable.of(new HttpResponse({ status: 200, body: pac }));
                } else if (request.method === 'DELETE') {
                    packages = packages.filter(p => p.id !== id);
                    this.storage.setObject('packages', packages);
                    return Observable.of(new HttpResponse({ status: 204 }));
                }
            }

            if (request.url.endsWith('/api/packages') && request.method === 'GET') {

                const limit: string = request.params.get('limit');
                const offset: number = request.params.has('offset') ? +request.params.get('offset') : 0;

                const filteredPackages = packages.slice(offset, limit !== null ? (+limit + offset) : undefined);

                return Observable.of(new HttpResponse({
                    status: 200, body: {
                        items: filteredPackages,
                        total: packages.length,
                        filtered: filteredPackages.length
                    }
                }));
            }

            if (request.url.endsWith('/api/packages/delete') && request.method === 'POST') {

                const ids: number[] = request.body;

                packages = packages.filter(p => ids.indexOf(p.id) === -1)
                this.storage.setObject('packages', packages);
                return Observable.of(new HttpResponse({ status: 204 }));
            }

            // pass through any requests not handled above
            return next.handle(request);

        })
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .materialize()
            .delay(500)
            .dematerialize();
    }
}