import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  public usuario: Usuario

  constructor( private usuariosService: UsuarioService) { 
    this.usuario = usuariosService.usuario;
  }


  logout(){
    console.log("prueba");
    
    this.usuariosService.logout();
  }

}
