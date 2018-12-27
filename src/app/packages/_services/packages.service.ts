import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJS
import { Observable } from 'rxjs/Observable';
import { Package } from '../_models/package.model';

@Injectable()
export class PackagesService {

    constructor(private http: HttpClient) { }

    create(obj: Package): Observable<Package> {
        return this.http.post<Package>('/api/package', obj);
    }

    getPackages(filters: { filter: string, value: string }[] = []): Observable<{ items: Package[], total: number, filtered: number }> {

        let params = new HttpParams();

        for (const filterObj of filters) {
            params = params.append(filterObj.filter, filterObj.value);
        }

        return this.http.get<{ items: Package[], total: number, filtered: number }>('/api/packages', {
            params: params
        });
    }

    getPackage(id: number): Observable<Package> {
        return this.http.get<Package>(`/api/package/${encodeURIComponent(id.toString())}`);
    }

    updatePackage(obj: Package): Observable<Package> {
        return this.http.put<Package>(`/api/package/${encodeURIComponent(obj.id.toString())}`, obj);
    }

    deletePackage(id: number): Observable<Object> {
        return this.http.delete(`/api/package/${encodeURIComponent(id.toString())}`);
    }

    deletePackages(ids: number[]): Observable<Object> {
        return this.http.post('/api/packages/delete', ids);
    }

    getLoginStatus(statusLogin): Observable<any> {
        return this.http.get('/api/login', statusLogin)
    }
}