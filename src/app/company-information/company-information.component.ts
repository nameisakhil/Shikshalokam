import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import * as config from '../config';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss'],
})
export class CompanyInformationComponent implements OnInit {
  formCompanyData;
  config = config;
  isSubmitted: boolean;
  companyInfoForm: FormGroup = new FormGroup({
    fields: new FormArray([]),
  });
  schema: any;
  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // fetching the schema from the JSON file

    this.formService.getFormSchema().then((data) => {
      this.schema = data;
      // if the user already in the company page I am enabling the routetab and make it as activetab
      if (
        this.activatedRoute.snapshot['_routerState'].url.includes('company')
      ) {
        this.formService.activeTabChange(config.ActiveTab.company);
        this.formService.companyDataDisabledChange(false);
      }
      this.createForm(data);
      this.formCompanyData = JSON.parse(
        sessionStorage.getItem('companyInfoForm')
      );

      this.patchFormDetails();
    });
  }

  get getFormField() {
    return this.companyInfoForm.get('fields') as FormArray;
  }
  createForm(data) {
    // maping the formfields to create the individual form groups

    _.map(data.fields, (group, index) => {
      // creating the form group or each field

      let formGroup = new UntypedFormGroup({
        type: new FormControl(group?.type),
        label: new FormControl(group?.label),
        name: new FormControl(group?.name),
        placeholder: new FormControl(group?.placeholder),
        value: new FormControl(undefined),
      });
      // conditionally adding the control based on the schema requirement

      if (group.options) {
        formGroup.addControl('options', new FormControl(group.options));
      }
      // adding the validations for the form fields based on the given schema

      _.map(group.validations, (validationVal, valKey) => {
        if (config.Validations.isRequired === valKey && validationVal) {
          formGroup.get('value').addValidators(Validators.required);
          formGroup.get('value').updateValueAndValidity();
        }
      });
      this.getFormField.push(formGroup);
    });
  }
  patchFormDetails() {
    // getting the values from sessionStorage and patching the values
    if (this.formCompanyData) {
      _.map(this.getFormField.controls, (control, index) => {
        if (control.get('type').value === config.Types.date) {
          control
            .get('value')
            .patchValue(new Date(this.formCompanyData['fields'][index].value));
        } else {
          control
            .get('value')
            .patchValue(this.formCompanyData['fields'][index].value);
        }
      });
    }
  }

  submit() {
    this.isSubmitted = true;
    // validating the form and storing the sessionStorage for the persisting data across page reaload

    if (this.companyInfoForm.valid) {
      this.formService.companyDataDisabledChange(false);
      sessionStorage.setItem(
        'companyInfoForm',
        JSON.stringify(this.companyInfoForm.value)
      );
      this.formService.masterForm['label'] = this.schema['label'];
      this.formService.masterForm['fields'] = this.companyInfoForm.value.fields;
      console.log(this.formService.masterForm);
    }
  }
}
