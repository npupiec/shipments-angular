import { Package } from '../_models/package.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { PackagesService } from '../_services/packages.service';
import { PaginationService } from '../_services/pagination.service'
import { UtilService } from '../../shared/_services/util.service';
import { EmitterVisitorContext } from '@angular/compiler';
import { PackagesListService } from '../_services/packageslist.service';
import { Subject } from 'rxjs/Subject';


import { trigger, state, style, animate, transition } from '@angular/animations'

import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.scss'],
  providers: [PackagesListService],
  animations: [
    trigger('packageState', [
      state('Accept', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(500)
      ])
    ])
  ]
})

export class PackagesListComponent implements OnInit {
  packageList: Package[];
  pagedItems: Package[];
  items: number;
  enableSelect: boolean;
  selectSearch: boolean;
  selectedPackages: number[];
  toggleInfo: boolean;
  selectList;
  statusList = "";
  selectedId: number;
  filteredData: Package[];
  filters: any = {dateFilter: null, addressFilter: ''};

  private packageSource = new Subject<Package>()
  packageObservable = this.packageSource.asObservable();

  constructor(
    private packagesService: PackagesService,
    private paginationService: PaginationService,
    private utilService: UtilService,
    private packagesListService: PackagesListService,
    private route: ActivatedRoute,
  ){ 
    this.selectList = true;
    this.enableSelect = false;
    this.selectSearch = false;
    this.selectedPackages = [];
    this.filteredData = [];
    this.packagesListService.onSelectPackages$
      .subscribe(
        (data:{id:number, selected: boolean}) => {
          if(data.selected && !this.selectedPackages.includes(data.id)) {
            this.selectedPackages.push(data.id)
          } else {
            this.selectedPackages = this.selectedPackages.filter(x => x !== data.id)
          }
        }
      )
   }

  ngOnInit() {
    this.showPackagesList();
    this.route.paramMap
    .switchMap((params: ParamMap) => {
      return Observable.of(+params.get('id'))
    }).subscribe((id)=> {
      this.selectedId = id;
    })
  }

  showPackagesList() {
    this.packagesService.getPackages()
    .subscribe(
        data => {
            this.packageList = data.items;
            this.filterPackages()
        },
        error => {
            console.error(error);
        });
  }

  onEnableSelectionChange(e: boolean) {
    this.enableSelect = e;
    this.packagesListService.selectPackagesChanged(e);
  }

  pageChanged(e) {
    this.pagedItems = this.filteredData.slice(e.startIndex, e.endIndex)
    this.packageSource.next(this.pagedItems[0])
  }

  removePackages() {
    this.packagesService.deletePackages(this.selectedPackages)
      .subscribe(
        data => {
          this.showPackagesList();
          this.selectedPackages = [];
        }
      )
  }

  onToggleInfo(e: boolean) {
    this.toggleInfo = e;
    this.packagesListService.selectInfoToggled(e);
  }

  onSelectList(e) {
    this.selectList = e;
    this.packagesListService.selectRadioChanged(e)
  }

  setPackageState(e) {
    for(let i = 0; i < this.pagedItems.length; i++) {
      let p = this.pagedItems[i]
      if(this.selectedPackages.indexOf(p.id) !== -1) {
        p.status = e;
        this.pagedItems[i] = Object.assign({}, p)
      }
    }
  }

  onSearch(term: string) {
    this.filters.addressFilter = term;
    this.filterPackages()
  }

  onSearchDate(date: string) {
    if (date === '') {
      this.filters.dateFilter = null
    } else {
      this.filters.dateFilter = new Date(date)
      this.filters.dateFilter.setHours(0,0,0,0)
    }
    this.filterPackages()
  }

  filterPackages() {
    this.filteredData = this.packageList.filter(item => {
      if (item.streetAddress.search(this.filters.addressFilter) !== -1 ) {
        return true
      } else {
        return false
      }
    }).filter(item=>{
        const x = new Date(item.initialTransportDate)
        x.setHours(0,0,0,0)

        if(this.filters.dateFilter == null) {
          return true
        } else {
          if (this.filters.dateFilter.getTime() === x.getTime()) {
            return true
          } else {
            return false
          }
        }

      })
  }

  onSelectSearch(e: boolean) {
    this.selectSearch = e;
    if( this.selectSearch === false) {
      this.filters.dateFilter = null;
      this.filters.addressFilter = '';
      this.showPackagesList()
    }
  }
}
