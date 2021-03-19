import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../company';
import { Select, Store } from '@ngxs/store';
import { CompanyState } from 'src/store/company/company.state';
import { DeleteCompany, LoadCompanies } from 'src/store/company/company.actions';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  @Select(CompanyState.companies)
  companies$: Observable<Company[]>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadCompanies());
  }

  deleteCompany(company: Company): void {
    this.store.dispatch(new DeleteCompany(company));
  }
}
