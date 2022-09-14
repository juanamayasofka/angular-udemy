import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public formularioEnviado= false;

  constructor(private fb: FormBuilder,
            private usuarioService: UsuarioService,
            private router: Router) { }

  public registerForm = this.fb.group({
    nombre: ['juan ', [Validators.required, Validators.minLength(3)]],
    email: ['juan@gmail.com', [Validators.required, Validators.email ]],
    password: ['123', [Validators.required]],
    password2: ['123', [Validators.required]],
    terminos: [ false ,[Validators.required]],


  },
  {
    validator: this.passwordIguales('password', 'password2'),
  }
    
  );



  
  crearUsuario() {
    this.formularioEnviado = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid){
      return;
    } 

    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe( resp => {
      console.log('usuarios creado')
      console.log(resp);
      this.router.navigateByUrl('/');
    }, (err)=> {
      Swal.fire('Error', err.error.msg, 'error');
    });


  }

  campoNovalido( campo: string ): boolean {

    if( this.registerForm.get(campo)?.invalid && this.formularioEnviado ){
      return true;
    }
    return false;
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formularioEnviado;
  }

  passwordIguales( password: string, password2: string ) {
    return ( formGroup : FormGroup) => {
      const pass1Control = formGroup.get(password);
      const pass2Control = formGroup.get(password2);

      if( pass1Control?.value == pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }

}
