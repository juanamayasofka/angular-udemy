import { Component, NgZone, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { ModalImagenComponent } from 'src/app/components/modal-imagen/modal-imagen.component';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  public imgSub?: Subscription;

  constructor( private medicoService: MedicoService,
              private router: Router,
              private sanitizer: DomSanitizer,
              private ngZona: NgZone,
              private modalImgService: ModalImagenService,
              private busquedaService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSub = this.modalImgService.nuevaImagen
                      .pipe(
                        delay(200)
                      ) 
                      .subscribe( img => {
                        console.log(img)
                        this.cargarMedicos();
                      })
  }

  ngOnDestroy(): void {
    this.imgSub?.unsubscribe();
  }

  public getSantizerUrl( url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  cargarMedicos(){
    this.cargando = true;

    this.medicoService.cargarMedicos()
    .subscribe( (medicos: Medico[]) => {
      console.log(medicos);
      
      this.medicos = medicos;
      this.medicosTemp = medicos; 
      this.cargando = false;
    })
  }

  abrirlModal( medico: Medico){
    this.modalImgService.abrirModal( 'medicos', medico._id, medico.img );
  }
  crearMedico( ){

  }

  eliminarMedico( medico: Medico){
    

    Swal.fire({
      title: 'Desea eliminar este usuario?',
      text: `Se eliminara ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.medicoService.eliminarMedico( medico )
    .subscribe( resp => {
      Swal.fire('Eliminado', medico.nombre, 'success');
      this.cargarMedicos();
    })
      }
    })
  }


  buscar( termino: string){
    console.log('termino', termino);
    
    if( termino.length === 0){
       this.medicos = this.medicosTemp;
    }else {
        this.busquedaService.buscar('medicos', termino)
          .subscribe(resultados => {
        return this.medicos = resultados;
        
      })
    }

    return this.medicos;
  }
}
