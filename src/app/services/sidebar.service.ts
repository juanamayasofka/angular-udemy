import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'DashBoard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'main', url:'/' },
        { titulo: 'ProgressBar', url:'progress' },
        { titulo: 'Grafica', url:'grafica1' },
        { titulo: 'Promesas', url:'promesas' },
        { titulo: 'rxjs', url:'rxjs' }

      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url:'usuarios' },
        { titulo: 'Hospitales', url:'hospitales' },
        { titulo: 'Medicos', url:'medicos' },

      ]
    }
  ]

  constructor() { }
}
