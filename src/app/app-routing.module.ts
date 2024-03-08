import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { CompanyInformationComponent } from './company-information/company-information.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'employee',
  },
  {
    path: 'employee',
    component: EmployeeDataComponent,
  },
  {
    path: 'company',
    component: CompanyInformationComponent,
  },
  {
    path: '**',
    redirectTo: 'employee',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
