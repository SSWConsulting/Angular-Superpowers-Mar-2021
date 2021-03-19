import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyService } from './company/company.service';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Firebootcamp CRM';
  someDate = new Date();
  companyCount$: Observable<number>;

  constructor(
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.companyCount$ = this.companyService.getCompanies().pipe(
      map(companies => companies.length)
    );
  }

}
