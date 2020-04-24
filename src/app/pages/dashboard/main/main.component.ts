import {Subscription} from 'rxjs';
import {DashboardSelector} from './../../../selectors/dashboard';
import {DashboardAction} from './../../../actions/dashboard';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  mainInfo: any
  mainInfoSub: Subscription

  constructor(private dashboardAction: DashboardAction, private dashboardSelector: DashboardSelector) {
  }

  ngOnInit() {
    this.dashboardAction.getMainInformation();
    this.mainInfoSub = this.dashboardSelector.getMainInformation().subscribe(data => {
      this.mainInfo = data
    });
  }

  ngOnDestroy() {
    this.mainInfoSub.unsubscribe();
  }

}
