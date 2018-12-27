import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PackagesListService {

  private packageSelectSource = new Subject<boolean>();
  private onSelectedPackagesSource = new Subject<{id: number, selected:boolean}>();

  private infoToggleSource = new Subject<boolean>();
  private radioBtnSource = new Subject<boolean>();
  private loginSource = new Subject<boolean>();


  
  selectPackagesChanged$ = this.packageSelectSource.asObservable();
  onSelectPackages$ = this.onSelectedPackagesSource.asObservable();

  selectInfoChanged$ = this.infoToggleSource.asObservable();

  selectRadioBtnChanged$ = this.radioBtnSource.asObservable();

  constructor() { }

  selectPackagesChanged(val: boolean) {
    this.packageSelectSource.next(val)
  }

  onSelectPackages(val: {id: number, selected:boolean}) {
    this.onSelectedPackagesSource.next(val)
  }

  selectInfoToggled(val: boolean) {
    this.infoToggleSource.next(val)
  }

  selectRadioChanged(val: boolean) {
    this.radioBtnSource.next(val)
  }

  selectLogin(val:boolean) {
    this.loginSource.next(val)
  }
}
