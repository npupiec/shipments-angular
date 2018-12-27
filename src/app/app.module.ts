import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// RxJS
import './rxjs-operators';

// Components
import { AppComponent } from './app.component';
import { FormComponent } from '../app/packages/_form/form.component';
import { PackagesListComponent } from '../app/packages/packages-list/packages-list.component';
import { PackagesListEditComponent } from '../app/packages/_packages-list-edit/packages-list-edit.component'

// Modules
import { PackagesModule } from './packages/packages.module';

// Services
import { LocalStorageService } from './shared/_services/local-storage.service';
import { UuidService }  from './shared/_services/uuid.service';
import { UtilService } from './shared/_services/util.service';
import { AuthGuardService } from './shared/_services/auth-guard.service';
import { AuthService } from './shared/_services/auth.service';

// Iterceptors
import { FakeBackendInterceptor } from './shared/_interceptors/fake-backend.interceptor';

//Routers
import { AppRoutingModule } from './app-routing.module';
import { PackagesRoutingModule } from './packages/packages-routing.module';
import { LoginComponent } from './login/login.component'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        PackagesModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PackagesRoutingModule
    ],
    providers: [
        AuthGuardService,
        AuthService,
        LocalStorageService,
        UtilService,
        UuidService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackendInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
