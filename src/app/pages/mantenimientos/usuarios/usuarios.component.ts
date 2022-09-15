import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { validationResult } from 'express-validator';
import { delay, Subscribable, Subscription } from 'rxjs';
import { ModalImagenComponent } from 'src/app/components/modal-imagen/modal-imagen.component';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios : number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTmp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imagSub?: Subscription;


  constructor( private usuariosService: UsuarioService,
               private sanitizer: DomSanitizer,
               private busquedaService: BusquedasService,
               private modalImgService: ModalImagenService) { }


  ngOnDestroy(): void {
    this.imagSub?.unsubscribe();
  }

  ngOnInit(): void {
   this.cargarUsuarios();

   this.imagSub = this.modalImgService.nuevaImagen
                      .pipe(
                        delay(200)
                      ) 
                      .subscribe( img => {
                        console.log(img)
                        this.cargarUsuarios();
                      })
  }

  public getSantizerUrl( url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuariosService.cargarUsuario( this.desde )
    .subscribe( ({ total, usuarios }) => {
      this.totalUsuarios = total;

      if( usuarios.length !== 0){
        this.usuarios = usuarios;
        this.usuariosTmp = usuarios;
        this.cargando = false;
      } 
      
    })
  }

  cambiarPagina( value: number){

    this.desde += value;
    if ( this.desde < 0){
      this.desde = 0;
    } else if( this.desde > this.totalUsuarios ){
      this.desde -= value;
    }

    this.cargarUsuarios();

  }

  buscar( termino: string){
    console.log('termino', termino);
    
    if( termino.length === 0){
       this.usuarios = this.usuariosTmp;
    }else{
      this.busquedaService.buscar('usuarios', termino)
    .subscribe(resultados => {
     return this.usuarios = resultados;
      
    })
    }

    return this.usuarios;
  }


  eliminarUsuario( usuario: Usuario ){
    console.log(usuario.uid);
    console.log("ser ",this.usuariosService.usuario.uid);

    if( usuario.uid === this.usuariosService.usuario.uid){
      return Swal.fire('Error no puede eliminarse','error');
    }

    Swal.fire({
      title: 'Desea eliminar este usuario?',
      text: `Se eliminara ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuariosService.eliminarUsuario( usuario )
        .subscribe( resp => {

             this.cargarUsuarios();
            Swal.fire('Usuario eliminado',`${ usuario.nombre } fue eliminado correctamente`, 'success');
          });
      }
    })
    return;
  }

  cambiarRole( usuario: Usuario){
    this.usuariosService.actualizarUsuario(usuario)
    .subscribe(resp => {
      console.log(resp);
      
    })
  }


  abrirModal( usuario: Usuario ){
    
    this.modalImgService.abrirModal( 'usuarios', usuario.uid, usuario.img );
    
  }
}
