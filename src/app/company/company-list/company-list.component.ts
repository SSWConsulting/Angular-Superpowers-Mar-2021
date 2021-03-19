import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService.getCompanies()
    .subscribe((companies : Company[]) => {
      console.log('New value from observable', companies)
      this.companies = companies;
    },
    (error) => {
      console.error(error);
    },
    () => {
      console.log('The observable has completed');
    }
    );

    // let component : CompanyListComponent = this;
    // this.companyService.getCompanies()
    // .subscribe(
    //   function(companies: Company[]) {
    //     component.companies = companies;
    //   }
    // );
  }
}
