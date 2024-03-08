import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { CompanyInformationComponent } from './company-information/company-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeDataComponent,
    CompanyInformationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule,
    InputTextModule,
    RadioButtonModule,
    CheckboxModule,
    CalendarModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
