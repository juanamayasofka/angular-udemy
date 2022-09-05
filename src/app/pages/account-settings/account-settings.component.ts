import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  
  
  constructor(private serviceSettings: SettingsService) { }

  ngOnInit(): void {
    this.serviceSettings.checkCurrentTheme();
  }

  changeTheme(theme: string){
   this.serviceSettings.changeTheme(theme);
    
  }

}
