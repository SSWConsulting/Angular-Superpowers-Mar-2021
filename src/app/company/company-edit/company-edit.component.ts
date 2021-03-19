import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddCompany, GetCompany, SaveCompany } from 'src/store/company/company.actions';
import { CompanyState } from 'src/store/company/company.state';
import { Company } from '../company';

@UntilDestroy()
@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  @Select(CompanyState.selectedCompany)
  selectedCompany$: Observable<Company>;

  companyId: any;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;
    this.buildForm();

    if (!this.isNewCompany) {
      this.getCompany();
    }
  }

  getCompany(): void {
    this.selectedCompany$.pipe(
      untilDestroyed(this),
    ).subscribe(c => this.companyForm.patchValue(c));

    this.store.dispatch(new GetCompany(this.companyId));
  }

  get f() {
    return this.companyForm.controls;
  }

  saveCompany(): void {
    const {value} = this.companyForm;

    let action = null;
    if (this.isNewCompany) {
      action = new AddCompany(value);
    } else {
      const company = { ...value, id: this.companyId };
      action = new SaveCompany(company);
    }

    this.store.dispatch(action).subscribe(() => this.router.navigate(['/company/list']));
  }

  private buildForm(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      phone: [''],
    });
  }

}
