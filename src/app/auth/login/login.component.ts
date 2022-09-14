import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms'; 

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;

  public formSubmitted = false;
 
  loginForm: FormGroup; 

  constructor(private router: Router,
              private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private ngZone: NgZone) {

                this.loginForm = this.fb.group({
   
                  email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email ]],
                  password: ['', [Validators.required]],
                  remember: [false],
                  });
               }


  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '62858652299-ilag9205neh1l7hv0agi60f8uu4rn7el.apps.googleusercontent.com',
      callback: ( response: any ) =>  this.handleCredentialResponse( response )
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
    .subscribe( resp => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/');
      })
      
    })
  }


  login() {
    this.usuarioService.login( this.loginForm.value )
    .subscribe(res => {
      
      if( this.loginForm.get('remember')?.value){
        localStorage.setItem('email', this.loginForm.get('email')?.value)
      } else {
        localStorage.removeItem('email');
      }

      this.ngZone.run( ()=>{
        this.router.navigateByUrl('/');
      })
      

    }, (err) => {
      Swal.fire('Error', err.error.msg,'error')
    })
  }
}
