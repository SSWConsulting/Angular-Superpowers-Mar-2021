import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyId: any;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private companyService: CompanyService,
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
    this.companyService.getCompany(this.companyId)
      .subscribe(company => this.companyForm.patchValue(company));
  }

  get f() {
    return this.companyForm.controls;
  }

  saveCompany(): void {
    const {value} = this.companyForm;

    if (this.isNewCompany) {
      this.companyService.addCompany(value)
        .subscribe(() => this.router.navigate(['/company/list']));
    } else {
      const company = { ...value, id: this.companyId };
      this.companyService.saveCompany(company)
        .subscribe(() => this.router.navigate(['/company/list']));
    }
  }

  private buildForm(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      phone: [''],
    });
  }

}
