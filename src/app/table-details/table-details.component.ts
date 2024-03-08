import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { ActivatedRoute } from '@angular/router';
import * as config from '../config';
import * as _ from 'lodash';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss'],
})
export class TableDetailsComponent implements OnInit {
  listOfAllEmployeeDetails;
  keyListMain: string[];
  secondKeyList: string[];
  tableList: any = [];
  colspanList: number[] = [];
  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // setting the activeTab based on the activated routerlink
    if (
      this.activatedRoute.snapshot['_routerState'].url.includes('details-table')
    ) {
      this.formService.activeTabChange(config.ActiveTab.table);
      this.formService.companyDataDisabledChange(false);
    }

    // fetch the employee list from the service or from session storage to display details in Table
    this.formService.employeeData.subscribe((val) => {
      this.listOfAllEmployeeDetails = val;
      if (
        val.length === 0 &&
        sessionStorage.getItem('listOfAllEmployeeDetails')
      ) {
        this.listOfAllEmployeeDetails = JSON.parse(
          sessionStorage.getItem('listOfAllEmployeeDetails')
        );
      }
      // formating the data for the table
      this.keyListMain = Object.keys(this.listOfAllEmployeeDetails[0]);
      _.map(this.listOfAllEmployeeDetails, (employee) => {
        let objectItem = {};
        this.colspanList = [];
        _.map(employee, (details) => {
          this.colspanList.push(Object.keys(details).length);
          objectItem = { ...objectItem, ...details };
        });
        this.tableList.push(objectItem);
      });
      this.secondKeyList = Object.keys(this.tableList[0]);
    });
  }
}
