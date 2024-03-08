import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  employeeData: Subject<any> = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}

  companyDataDisabled: BehaviorSubject<boolean> = new BehaviorSubject(true);
  activeTab: BehaviorSubject<string> = new BehaviorSubject('employee');
  masterForm: object = {};

  getFormSchema() {
    return this.http
      .get<any>('assets/schema.json')
      .toPromise()
      .then((res) => res);
  }

  companyDataDisabledChange(bool: boolean) {
    this.companyDataDisabled.next(bool);
  }

  activeTabChange(string: string) {
    this.activeTab.next(string);
  }

  employeeDataChange(array) {
    this.employeeData.next(array);
  }
}
