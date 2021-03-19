import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = environment.API_BASE;

  companies$ : BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([])

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  public getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  loadCompanies(): void {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.errorHandler),
      // catchError((error) => this.errorHandler(error)) Same as above
    )
    .subscribe((companies: Company[]) => this.companies$.next(companies));
  }

  public deleteCompany(company: Company): void {
    console.log('Delete company in service');
    this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .pipe(
        catchError(this.errorHandler),
      ).subscribe(() => this.loadCompanies());
  }

  public addCompany(company: Company): void {
    console.log('Adding company', company);
    this.httpClient.post<Company>(`${this.API_BASE}/company`, company).pipe(
      catchError(this.errorHandler),
    ).subscribe(() => this.loadCompanies());
  }

  public saveCompany(company: Company): void {
    this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`, company).pipe(
      catchError(this.errorHandler),
    ).subscribe(() => this.loadCompanies());
  }

  public getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${id}`).pipe(
      catchError(this.errorHandler),
    );
  }

  public errorHandler(error): Observable<any> {
    console.error('ERROR IN THE PIPE', error);
    return new Observable<any>();
  }
}
