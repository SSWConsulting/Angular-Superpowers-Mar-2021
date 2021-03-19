import { Company } from "src/app/company/company";

export class GetCompany {
  public static readonly type = '[Company] Get Company';
  constructor(public id: number) { }
}

export class GetCompanySuccess {
  public static readonly type = '[Company] Get CompanySuccess';
  constructor(public payload: Company) { }
}

export class LoadCompanies {
  public static readonly type = '[Company] Load Companies';
  constructor() { }
}

export class LoadCompaniesSuccess {
  public static readonly type = '[Company] Load Companies Success';
  constructor(public payload: Company[]) { }
}

export class AddCompany {
  public static readonly type = '[Company] Add Company';
  constructor(public payload: Company) { }
}

export class SaveCompany {
  public static readonly type = '[Company] Save Company';
  constructor(public payload: Company) { }
}

export class DeleteCompany {
  public static readonly type = '[Company] Delete Company';
  constructor(public payload: Company) { }
}

export class CompanyDeleteSuccess {
  public static readonly type = '[Company] Companies Deleted Successfully';
  constructor() { }
}
