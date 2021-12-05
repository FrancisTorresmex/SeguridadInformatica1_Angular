import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  ) { }

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

  }

}
