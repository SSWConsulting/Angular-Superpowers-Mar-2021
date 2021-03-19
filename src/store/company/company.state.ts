import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import { Company } from 'src/app/company/company';
import { environment } from 'src/environments/environment';
import { AddCompany, DeleteCompany, GetCompany, GetCompanySuccess, LoadCompanies, LoadCompaniesSuccess, SaveCompany } from './company.actions';

export interface CompanyStateModel {
  selectedCompany: Company;
  companies: Company[];
}

@State<CompanyStateModel>({
  name: 'company',
  defaults: {
    selectedCompany: null,
    companies: []
  }
})
@Injectable()
export class CompanyState {

  API_BASE = environment.API_BASE;

  @Selector()
  public static selectedCompany(state: CompanyStateModel) {
    return state.selectedCompany;
  }

  @Selector()
  public static companies(state: CompanyStateModel) {
    return state.companies;
  }

  @Selector()
  public static companyCount(state: CompanyStateModel): number {
    return state.companies.length;
  }

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  @Action(LoadCompanies)
  loadCompanies(ctx: StateContext<CompanyStateModel>) {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      switchMap(companies => ctx.dispatch(new LoadCompaniesSuccess(companies)))
    );
  }

  @Action(LoadCompaniesSuccess)
  public companyLoadSuccess(ctx: StateContext<CompanyStateModel>, { payload }: LoadCompaniesSuccess) {
    ctx.patchState({ companies: payload });
  }

  @Action(DeleteCompany)
  deleteCompanies(ctx: StateContext<CompanyStateModel>, { payload }: DeleteCompany) {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${payload.id}`)
    .pipe(
      switchMap(_ => ctx.dispatch(new LoadCompanies()))
    );
  }

  @Action(AddCompany)
  addCompany(ctx: StateContext<CompanyStateModel>, { payload }: AddCompany) {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, payload)
    .pipe(
      switchMap(_ => ctx.dispatch(new LoadCompanies()))
    );
  }

  @Action(SaveCompany)
  saveCompany(ctx: StateContext<CompanyStateModel>, { payload }: SaveCompany) {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${payload.id}`, payload)
    .pipe(
      switchMap(_ => ctx.dispatch(new LoadCompanies()))
    );
  }

  @Action(GetCompany)
  getCompany(ctx: StateContext<CompanyStateModel>, { id }: GetCompany) {
    ctx.patchState({ selectedCompany: null });
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      switchMap(company => ctx.dispatch(new GetCompanySuccess(company)))
    );
  }

  @Action(GetCompanySuccess)
  getCompanySuccess(ctx: StateContext<CompanyStateModel>, { payload }: GetCompanySuccess) {
    ctx.patchState({ selectedCompany: payload });
  }
}
