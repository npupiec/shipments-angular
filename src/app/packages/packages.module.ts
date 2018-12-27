import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';

import { PhoneFormatPipe } from '../packages/packages-list/phone.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Components
import { FormComponent } from './_form/form.component';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { PackagesListEditComponent } from './_packages-list-edit/packages-list-edit.component';
import { PaginationComponent } from './_pagination/pagination.component';
import { PackageItemComponent } from './_package-item/package-item.component';

// Services
import { PackagesService } from './_services/packages.service';
import { PaginationService } from './_services/pagination.service';
import { PackageResolverService } from './_services/package-resolver.service'

//Routers
import {  PackagesRoutingModule } from '../packages/packages-routing.module'

//Directives
import { CollapseDirective } from '../shared/_directives/collapse.directive';
import { PackagesComponent } from './_packages/packages.component';

@NgModule({
  declarations: [
    FormComponent,
    PackagesListComponent,
    PackagesListEditComponent,
    PhoneFormatPipe,
    PaginationComponent,
    PackageItemComponent,
    CollapseDirective,
    PackagesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    PackagesRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [
    FormComponent,
    PackagesListComponent
  ],
  providers: [PackagesService, PaginationService, PackageResolverService],
})
export class PackagesModule { }