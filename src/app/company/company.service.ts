import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  public getCompanies(): Company[] {
    return [
      { name: 'company name', email: 'email 1', phone: 111 },
      { name: 'company 2', email: 'email 2', phone: 222 },
    ];
  }
}
