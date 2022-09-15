import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy{

  public hospitals: Hospital[] = [];
  public hospitalsTmp: Hospital[] = [];
  public cargando: boolean= true;
  public imagSub?: Subscription;

  constructor( private hospitalService: HospitalService,
               private sanitizer: DomSanitizer,
               private busquedaService: BusquedasService,
               private modalImgService: ModalImagenService) { }


  ngOnDestroy(): void {
    this.imagSub?.unsubscribe();
  }

  ngOnInit(): void {

    this.cargaHospitales();

    this.imagSub = this.modalImgService.nuevaImagen
                      .pipe(
                        delay(200)
                      ) 
                      .subscribe( img => {
                        console.log(img)
                        this.cargaHospitales();
                      })
  }

  cargaHospitales(){
    this.cargando = true;

    this.hospitalService.cargarHospitales()
    .subscribe( hospitales => {
      this.hospitals = hospitales;
      this.hospitalsTmp = hospitales; 
      this.cargando = false;
    })
  }

  public getSantizerUrl( url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  guardarCambios( hospital: Hospital ){
    this.hospitalService.actualizarHospitales( hospital._id, hospital.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
  }

  eliminar( hospital: Hospital){
    console.log(hospital._id);

    Swal.fire({
      title: 'Desea eliminar este usuario?',
      text: `Se eliminara ${ hospital.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.hospitalService.eliminarHospitales( hospital._id)
    .subscribe( resp => {
      Swal.fire('Eliminado', hospital.nombre, 'success');
      this.cargaHospitales();
    })
      }
    })
    
    
  }


  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    })
    
    if( value?.trim().length > 0 ){

      this.hospitalService.crearHospitales( value )
      .subscribe( resp => {
        Swal.fire('Creado', value, 'success');
        this.cargaHospitales();
      })

    }

    
    
  }


  buscar( termino: string){
    console.log('termino', termino);
    
    if( termino.length === 0){
       this.hospitals = this.hospitalsTmp;
    }else {
        this.busquedaService.buscar('hospitales', termino)
          .subscribe(resultados => {
        return this.hospitals = resultados;
        
      })
    }

    return this.hospitals;
  }


  abrirlModal( hospital: Hospital){
    this.modalImgService.abrirModal( 'hospitales', hospital._id, hospital.img );
  }

}
