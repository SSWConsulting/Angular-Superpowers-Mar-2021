import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompanyState } from 'src/store/company/company.state';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Firebootcamp CRM';
  someDate = new Date();

  @Select(CompanyState.companyCount)
  companyCount$: Observable<number>;

  constructor(
  ) {}

  ngOnInit(): void {
  }

}
