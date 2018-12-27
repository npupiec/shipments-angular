import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { PackagesListService } from '../_services/packageslist.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageItemComponent implements OnInit {
  @Input() package: any;
  checkboxValue: boolean;
  @Input() showcheckbox: boolean;
  @Input() checkboxInfo: boolean;
  @Input() itemTemplate: TemplateRef<any>;

  packageContext: any= {
    showcheckbox: false,
    checkboxValue: false,
    checkboxInfo: false
  }

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private packagesListService: PackagesListService) { 
    this.packagesListService.selectPackagesChanged$
    .takeUntil(this.unsubscribe)
    .subscribe(
      (data:boolean) => {
        this.packageContext.showcheckbox = data;
      }
    )

    this.packagesListService.selectInfoChanged$
    .takeUntil(this.unsubscribe)
    .subscribe(
      (data:boolean) => {
        this.packageContext.checkboxInfo = data;
      }
    )
  }

  ngOnInit() {
    this.packageContext.showcheckbox = this.showcheckbox;
    this.packageContext.$implicit = this.package;
    this.packageContext.changeVal = this.changeVal.bind(this);
    this.packageContext.checkboxInfo = this.checkboxInfo;
  }

  changeVal(e:boolean) {
    this.packageContext.checkboxValue = e;
    this.packagesListService.onSelectPackages({id: this.package.id, selected: e})
  }

  
}
