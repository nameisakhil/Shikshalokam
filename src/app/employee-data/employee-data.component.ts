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
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss'],
})
export class EmployeeDataComponent implements OnInit {
  formEmployeeData;
  config = config;
  isSubmitted: boolean;
  employeeForm: FormGroup = new FormGroup({
    formFields: new FormArray([]),
  });
  schema: any;
  employeesArray: any;

  constructor(private formService: FormService, private router: Router) {}
  ngOnInit(): void {
    // fetching the schema from the JSON file
    this.formService.getFormSchema().then((data) => {
      this.schema = data;
      // creating the form based on the schema structure
      this.createForm(data);
      this.formEmployeeData = JSON.parse(
        sessionStorage.getItem('employeeForm')
      );
      if (this.formEmployeeData) {
        _.map(this.formEmployeeData?.formFields, (formGroup, index) => {
          _.map(this.getSubFormFields(index).controls, (control, index2) => {
            if (control.get('type').value === config.Types.date) {
              control
                .get(control.get('name').value)
                .patchValue(
                  new Date(
                    formGroup?.fields[index2]?.[control.get('name').value]
                  )
                );
            } else {
              control
                .get(control.get('name').value)
                .patchValue(
                  formGroup?.fields[index2]?.[control.get('name').value]
                );
            }
          });
        });
      }
    });
  }

  get getFormField() {
    return this.employeeForm.get('formFields') as FormArray;
  }

  getSubFormFields(i: number) {
    return this.getFormField.at(i)?.get('fields') as FormArray;
  }

  createForm(data) {
    // maping the formfields to create the individual form groups
    _.map(data.formFields, (group, index) => {
      this.getFormField.push(
        new FormGroup({
          label: new FormControl(group.label),
          fields: new FormArray([]),
        })
      );
      // creating the form group or each field
      _.map(group.fields, (field: any) => {
        let formGroup = new UntypedFormGroup({
          type: new FormControl(field?.type),
          label: new FormControl(field?.label),
          name: new FormControl(field?.name),
          placeholder: new FormControl(field?.placeholder),
          [field.name]: new FormControl(undefined),
        });
        // conditionally adding the control based on the schema requirement
        if (field.options) {
          formGroup.addControl('options', new FormControl(field?.options));
        }

        // adding the validations for the form fields based on the given schema
        _.map(field.validations, (validationVal, valKey) => {
          if (config.Validations.isRequired === valKey && validationVal) {
            formGroup.get(field?.name).addValidators(Validators.required);
          } else if (config.Validations.pattern === valKey) {
            formGroup.addControl(
              'pattern',
              new FormControl(field.validations?.pattern)
            );

            formGroup
              .get(field?.name)
              .addValidators(Validators.pattern(validationVal));
          }
        });

        formGroup.updateValueAndValidity();
        this.getSubFormFields(index).push(formGroup);
      });
    });
  }

  submit() {
    this.isSubmitted = true;
    // validating the form and storing the sessionStorage for the persisting data across page reaload
    if (this.employeeForm.valid) {
      this.formService.masterForm['title'] = this.schema['title'];
      this.formService.masterForm['formFields'] =
        this.employeeForm.value.formFields;
      this.formService.companyDataDisabledChange(false);
      this.formService.activeTabChange('company');
      sessionStorage.setItem(
        'employeeForm',
        JSON.stringify(this.employeeForm.value)
      );
      // this.router.navigate(['/company']);
      let masterDetails = {};
      let employeeDetailsList = [];

      _.map(this.employeeForm.value.formFields, (field) => {
        let employeeDetails = {};
        employeeDetails['label'] = field.label;
        employeeDetails['details'] = [];

        _.map(field.fields, (detail) => {
          let employee = {};
          employee[detail.name] = detail[detail.name];
          employeeDetails['details'].push(employee);
        });

        employeeDetailsList.push(employeeDetails);
      });
      masterDetails['Master Details'] = employeeDetailsList;
      this.formService.employeeData.push(masterDetails);
      console.log(this.formService.employeeData);
    }
  }
}
