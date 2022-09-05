import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const theme = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";
    this.linkTheme?.setAttribute('href', theme);
   }

   changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`;
    
    this.linkTheme?.setAttribute('href', url);

    /**Guardamos en el localstorange */
    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  
  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
      
    links.forEach( elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`
      const currentTheme = this.linkTheme?.getAttribute('href');

      console.log(btnThemeUrl);
      console.log(currentTheme);

      if( btnThemeUrl === currentTheme ){
        elem.classList.add('working');
      }

    });

  }
}
