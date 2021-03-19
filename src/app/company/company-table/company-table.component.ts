import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {

  // @Input()
  // configuration: MyCustomConfigInterface;

  @Input()
  companies: Company[];

  @Output()
  deleteButtonClicked: EventEmitter<Company> = new EventEmitter<Company>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCompany(company: Company): void {

    this.deleteButtonClicked.emit(company);
    // this.parent.deleteCompany()
  }

}
