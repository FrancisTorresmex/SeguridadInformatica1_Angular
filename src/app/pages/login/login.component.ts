import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from '../../services/api-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Para ver errores del formulario
  precionado: boolean = false;

  constructor(
    private _formBldr: FormBuilder,
    private _router: Router,
    private _apiAuthService: ApiAuthService,    
  ) {    
    if(localStorage.getItem('sesion') != null) { //si ya existe sesión redirige a inicio
      this._router.navigate(['/inicio']);
    }
   }

  ngOnInit(): void {
  }

   //Campos del formulario
   public loginForm = this._formBldr.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });


  //Errores de validators
  get errorLlenado() {
    return this.loginForm.controls
  }

  iniciar() {
    this.precionado = true;

    //Si el login tiene campos vacios es invalido, por lo tanto no accede a la petición
    if(this.loginForm.invalid) return;

    this._apiAuthService.iniciar(this.loginForm.value).subscribe(resp => {            
      console.log('bienvenido');      
      this._router.navigate(['/inicio']);
    },(error) => {          
      alert(error['error']['text']);  
      console.log('error apiAuth', error);
    });
  }

}
