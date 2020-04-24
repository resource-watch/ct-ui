import {EndpointSelector} from './../../selectors/endpoint';
import {EndpointAction} from './../../actions/endpoint';
import {Subject, Subscription} from 'rxjs';
import {IEndpoint} from './../../models/endpoint';
import {Component, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss']
})
export class EndpointsComponent implements OnInit {
  endpoints: IEndpoint[]
  endpointsFilter: IEndpoint[]
  endpointSub: Subscription
  filterText = ''

  private searchEndpointStream = new Subject<string>()

  constructor(private endpointAction: EndpointAction, private endpointSelector: EndpointSelector) {
  }

  ngOnInit() {
    this.endpointAction.searchEndpoints();
    this.endpointSub = this.endpointSelector.getEndpoints().subscribe((data) => {
      data = data.map((el) => Object.assign({}, el));
      this.endpoints = data;
      this.filter(this.filterText);
    });

    this.searchEndpointStream
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.filterText = term
        this.filter(term.toLowerCase())
      });
  }

  private filter(term) {
    this.endpointsFilter = this.endpoints.filter(d => {
      return d.path.toLowerCase().indexOf(term) >= 0;
    });
  }

  refresh() {
    this.endpointAction.searchEndpoints();
  }

  updateFilter(term) {
    this.searchEndpointStream.next(term);
  }
}
