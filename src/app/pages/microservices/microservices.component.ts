import {IMicroservice} from './../../models/microservice';
import {Subject, Subscription} from 'rxjs';
import {MicroserviceSelector} from './../../selectors/microservice';
import {MicroserviceAction} from './../../actions/microservice';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-microservices',
  templateUrl: './microservices.component.html',
  styleUrls: ['./microservices.component.scss'],
})

export class MicroservicesComponent implements OnInit, OnDestroy {
  microservices: IMicroservice[]
  microservicesFilter: IMicroservice[]
  microserviceSub: Subscription
  filterText = ''

  private searchMicroserviceStream = new Subject<string>()

  constructor(private microserviceAction: MicroserviceAction, private microserviceSelector: MicroserviceSelector) {
  }

  ngOnInit() {
    this.microserviceAction.searchMicroservices();
    this.microserviceSub = this.microserviceSelector.getMicroservices().subscribe((data) => {
      data = data.map((el) => Object.assign({}, el));
      this.microservices = data;
      this.filter(this.filterText);
    });

    this.searchMicroserviceStream
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.filterText = term
        this.filter(term)
      });
  }

  private filter(term) {
    this.microservicesFilter = this.microservices.filter(d => {
      return d.name.indexOf(term) >= 0;
    });
  }

  refresh() {
    this.microserviceAction.searchMicroservices();
  }

  updateFilter(term) {
    this.searchMicroserviceStream.next(term);
  }

  ngOnDestroy() {
    this.microserviceSub.unsubscribe();
  }
}
