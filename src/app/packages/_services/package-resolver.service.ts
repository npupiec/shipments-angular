import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { PackagesService } from './packages.service';

import { Package } from '../_models/package.model'

@Injectable()
export class PackageResolverService implements Resolve<Package> {
  constructor(private ps: PackagesService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Package> {
    let id =+ route.paramMap.get('id')
    return this.ps.getPackage(id)
    .catch(err => {
      this.router.navigate(['/packages/list']);
      return Observable.of(null)
    })
  }
}
