import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';


declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
 

  public medicos!: Medico;

  constructor( private http: HttpClient, 
               private router: Router,
               private nZona: NgZone) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
  return {
    headers: {
      'x-token': this.token
    } 
  }
  }


  eliminarMedico( medico: Medico ){
    const url = `${base_url}/medicos/${ medico._id}`;
    return this.http.delete( url, this.headers);
  }

  cargarMedicos( ) {

    const url = `${base_url}/medicos`;
    return this.http.get< {ok: boolean, medicos: Medico[]}>( url, this.headers)
            .pipe(
              map( (resp: {ok: boolean, medicos: Medico[] }) => resp.medicos )
            );
  }

  actualizarMedico( medico: Medico  ) {

    const url = `${base_url}/medicos/${ medico._id }`;
    return this.http.put( url, medico , this.headers);
           
  }

 crearMedico( medico: { nombre: string, hospital: string }){
  const url = `${base_url}/medicos`;
  return this.http.post( url, medico, this.headers);
 }

 obtenerMedicoById( id: string){
  console.log('id service', id);
  
  const url = `${base_url}/medicos/${ id }`;
  console.log('url', url);
  
    return this.http.get< {ok: boolean, medico: Medico}>( url, this.headers)
            .pipe(
              map( (resp: {ok: boolean, medico: Medico }) => resp.medico )
            );
 }

}
