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
import { TableDetailsComponent } from './table-details/table-details.component';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeDataComponent,
    CompanyInformationComponent,
    TableDetailsComponent,
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
    TableModule,
    TreeTableModule,
    ToastModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
