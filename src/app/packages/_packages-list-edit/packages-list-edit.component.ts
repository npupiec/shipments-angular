import { Component, OnInit, Input } from '@angular/core';

import { Package } from '../_models/package.model';

//Router
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//Service
import { PackagesService } from '../_services/packages.service';

@Component({
  selector: 'app-packages-list-edit',
  templateUrl: './packages-list-edit.component.html',
  styleUrls: ['./packages-list-edit.component.scss']
})
export class PackagesListEditComponent implements OnInit {

  packageItem;
  selectedId: number;

  constructor(private packagesService: PackagesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.packagesService.getPackage(+params.get('id')))
      .subscribe(
        data => {
          console.log(data);
          this.packageItem = data;
        },
        error => {
          console.error(error);
        });
  }

  changeDate(e: string) {
    this.packageItem.initialTransportDate = new Date(e);
  }

  upatePackage(p: Package): void {
    this.packagesService.updatePackage(p)
      .subscribe(
        data => {
          this.packageItem = data;
          this.backToPackagesList(p)
        },
        error => {
          console.error(error);
        });
  }

  backToPackagesList(packageItem: Package) {
    let packageId = this.packageItem ? this.packageItem.id : null
    this.router.navigate(['../../list', { id: packageId }], {relativeTo: this.route});
  }
}
