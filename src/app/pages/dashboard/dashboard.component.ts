import {ComponentsModule} from './../../shared/index';
import {CommonModule} from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainComponent} from './main/main.component';
import {AdvancedComponent} from './advanced/advanced.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

export const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'advanced', component: AdvancedComponent},
];

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    AdvancedComponent
  ],
  exports: [
    DashboardComponent,
    MainComponent,
    AdvancedComponent
  ],
  imports: [RouterModule, CommonModule, ComponentsModule, ReactiveFormsModule, FormsModule, NgbModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponentModule {
}
