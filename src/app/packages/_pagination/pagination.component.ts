import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { PaginationService } from '../_services/pagination.service'
import { Package } from '../_models/package.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  pager: any;
  itemsPageLength = [10, 20, 50];
  pageSize: number;
  
  @Input() packgesList: Package[];
  @Input() defaultPageSize: number;
  @Output() onPageChanged = new EventEmitter<any>(true)

  constructor(private paginationService: PaginationService) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if (propName == 'packgesList') {
        let changedProp = changes[propName];
        this.pager = this.paginationService.getPage(changedProp.currentValue.length, this.pageSize);
        this.onPageChanged.emit({startIndex: this.pager.startIndex, endIndex: this.pager.endIndex + 1});
      }
      if (propName == 'defaultPageSize') {
        this.pageSize = changes[propName].currentValue;
        this.pager = this.paginationService.getPage(this.packgesList.length, this.pageSize); 
        this.onPageChanged.emit({startIndex: this.pager.startIndex, endIndex: this.pager.endIndex + 1});
      }
    }
  }

  setPage(pageNumber: number) {
    this.pager = this.paginationService.getPage(this.packgesList.length, this.pageSize, pageNumber)
    this.onPageChanged.emit({startIndex: this.pager.startIndex, endIndex: this.pager.endIndex + 1});
  }

  pageVal(item) {
    this.pageSize = item;
    this.pager = this.paginationService.getPage(this.packgesList.length, this.pageSize)
    this.onPageChanged.emit({startIndex: this.pager.startIndex, endIndex: this.pager.endIndex + 1});
  }
}
