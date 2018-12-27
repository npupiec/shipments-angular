import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { FormComponent } from '../app/packages/_form/form.component';
import { PackagesListComponent } from '../app/packages/packages-list/packages-list.component';
import { PackagesListEditComponent } from '../app/packages/_packages-list-edit/packages-list-edit.component'
import { LoginComponent } from './login/login.component'

//Routers
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: 'packages/list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'packages/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
