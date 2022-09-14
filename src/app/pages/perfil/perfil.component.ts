import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  public perfilForm!: FormGroup; 
  public usuario: Usuario;
  public imagenSubir!: File; 
  public imgTemp: any = null;

  constructor( private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario;
   }
  ngOnInit(): void {
   this.perfilForm =  this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]],
    });
  }

 



  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( resp =>{
        const { nombre, email } = this.perfilForm.value;
        
        this.usuario.email= email;
        this.usuario.nombre = nombre;

        Swal.fire('Guardado', 'Actualización exitosa', 'success');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        
      });
  }

  cambiarImagen( event: any ){
    console.log('img',event?.target?.files[0]);
    
    this.imagenSubir =  event?.target?.files[0];

    if( !this.imagenSubir ){ 
     return this.imgTemp = null;
      
    }

    const reader = new FileReader();
    reader.readAsDataURL( this.imagenSubir );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
            
    }
 
    return true;
  }

  subirImagen() {
    
    try {
      this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '')
    .then( img => {
      this.usuario.img = img;
      console.log('nombre archivo', this.usuario.img);
      Swal.fire('Guardado', 'Actualización exitosa', 'success');
    })
    } catch (err) {
     
      Swal.fire('Error', 'Error al cargar la imagen' ,'error');
    }
    
    
  }
}
