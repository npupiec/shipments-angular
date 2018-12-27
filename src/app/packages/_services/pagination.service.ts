import { Package } from '../_models/package.model';
import { PackagesListComponent } from '../packages-list/packages-list.component';
import { PaginationComponent } from '../_pagination/pagination.component';

export class PaginationService {
    getPage(allPackages: number, itemsSize:number, currentPage: number = 1 ) {

        const allPages = Math.ceil(allPackages / itemsSize);
        let startPage: number;
        let endPage: number;
        const pages = [];
        
        if (allPages <= 2) {
            startPage = 1;
            endPage = allPages;
        } 
        else {
            if (currentPage <= 1) {
                startPage= 1;
                endPage = 3;
            }
            else if ( currentPage + 1 >= allPages) {
                startPage = allPages - 2;
                endPage = allPages;
            }
            else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }

        for ( let i = startPage; i <= endPage ; i++) {
            pages.push(i);
        }

        const startIndex = (currentPage - 1) * itemsSize;
        const endIndex = Math.min(startIndex + itemsSize - 1, allPackages - 1);

        return {
            pages: pages,
            currentPage: currentPage,
            allPages: allPages,
            startIndex: startIndex,
            endIndex: endIndex,
        }
    }
}