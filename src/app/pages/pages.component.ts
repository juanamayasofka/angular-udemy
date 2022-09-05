import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  
  constructor(private serviceSettings: SettingsService) { }

  ngOnInit(): void {

    // esta funcion esta en un archivo js //assets/js
    customInitFunctions();
   
    
  }

}


