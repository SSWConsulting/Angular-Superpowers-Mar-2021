import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        catchError(this.errorHandler),
        // catchError((error) => this.errorHandler(error)) Same as above
      );
  }

  public errorHandler(error): Observable<any> {
    console.error('ERROR IN THE PIPE', error);
    return new Observable<any>();
  }
}
