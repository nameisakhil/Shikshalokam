import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { TableDetailsComponent } from './table-details/table-details.component';

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
    path: 'details-table',
    component: TableDetailsComponent,
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
