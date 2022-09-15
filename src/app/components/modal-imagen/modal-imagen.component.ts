import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  
  
  public imagenSubir!: File; 
  public imgTemp: any = null;

  constructor( public modalService: ModalImagenService, 
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
    
   }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalService.cerrarModal();
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
    console.log('id',this.modalService.id);
    const id = this.modalService.id;
    const tipo = this.modalService.tipo ;
    try {
      this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
    .then( img => {
      this.modalService.nuevaImagen.emit(img);
      console.log('nombre archivo', img);

      this.cerrarModal();
      
      Swal.fire('Guardado', 'Actualización exitosa', 'success');
    })
    } catch (err) {
     
      Swal.fire('Error', 'Error al cargar la imagen' ,'error');
    }
    
    
  }
}
