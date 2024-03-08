import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { ActiveTab } from '../config';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isDisabled: boolean;
  activeTab: string;
  activeTabConfig: any = ActiveTab;
  constructor(private formService: FormService) {}
  ngOnInit(): void {
    this.formService.companyDataDisabled.subscribe((bool) => {
      this.isDisabled = bool;
    });
    this.formService.activeTab.subscribe((string) => {
      this.activeTab = string;
    });
  }
}
