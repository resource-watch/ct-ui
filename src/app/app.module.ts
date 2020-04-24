import {UsersComponent} from './pages/users/users.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {MicroservicesComponent} from './pages/microservices/microservices.component';
import {EndpointsComponent} from './pages/endpoints/endpoints.component';
import {PluginsComponent} from './pages/plugins/plugins.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/Rx';

import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './routes';
import {DashboardComponentModule} from './pages/dashboard/dashboard.component';
import {ComponentsModule} from './shared';
/*
 * Services
 */
import {SERVICES} from './services';
import {ACTIONS} from './actions';
import {SELECTORS} from './selectors';
import {LoggedInGuard} from './guards/logged-in.guard';
import {reducers} from './reducers/index';
import {TokenInterceptor} from './services/token.interceptor';

registerLocaleData(localeEn, 'en-US');

@NgModule({
  declarations: [
    AppComponent,
    PluginsComponent,
    EndpointsComponent,
    MicroservicesComponent,
    ProfileComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DashboardComponentModule,
    ComponentsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgbModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    SERVICES,
    ACTIONS,
    SELECTORS,
    LoggedInGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
