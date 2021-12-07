import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAltaUsuarioService } from '../../services/api-alta-usuario.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  precionado: boolean = false;

  constructor(
    private _router: Router,
    private _formBldr: FormBuilder,
    private _apiAltaUsuarioService: ApiAltaUsuarioService
  ) { }

  ngOnInit(): void {
  }

  //Llenado del formulario
  public AgregarForm = this._formBldr.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
  });

  get errorLlenado() {
    return this.AgregarForm.controls;
  }

  //Agregar usuario (admin)
  agregar() {
    this.precionado = true;
    if(this.AgregarForm.invalid) return;

    this._apiAltaUsuarioService.agregarUsuario(this.AgregarForm.value).subscribe(resp => {
      alert('Usuario agregado');
      this._router.navigate(['/inicio']);
    },(error) => {
      console.log(error);
    });
  }


  //Regresar a inicio
  regresar() {
    this._router.navigate(['/inicio']);
  }

}
