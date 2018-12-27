import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesListComponent } from '../packages/packages-list/packages-list.component';
import { PackagesListEditComponent } from '../packages/_packages-list-edit/packages-list-edit.component';
import { FormComponent } from '../packages/_form/form.component';
import { PackagesComponent } from '../packages/_packages/packages.component'

//Routers
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../shared/_services/auth-guard.service';
import { PackageResolverService } from './_services/package-resolver.service'

const packageRoutes: Routes = [
  {
    path: 'packages',
    component: PackagesComponent,
    children: [
      { path: 'package',
        children: [
          { path: ':id', 
            component: PackagesListEditComponent,
            canActivate: [AuthGuardService],
            resolve: PackageResolverService
          },
          { path: '', component: FormComponent }
        ]
      },
      { path: 'list', component: PackagesListComponent },

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      packageRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class PackagesRoutingModule { }
