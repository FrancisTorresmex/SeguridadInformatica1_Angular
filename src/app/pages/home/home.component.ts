import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAltaUsuarioService } from '../../services/api-alta-usuario.service';
import { DatosUsuario} from '../../models/datosUsuario';
import { async } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  lst: any; //objeto para guardar la respuesta
  unUsuario: any;
  local = JSON.parse(localStorage.getItem('sesion') as string);  

  constructor(
    private _router: Router,
    private _apiAltaUsuarioService: ApiAltaUsuarioService,    
  ) {     

      this.validar();
  }

  ngOnInit(): void {}

  verUsuarios() {
    this._apiAltaUsuarioService.verUsuarios().subscribe(resp => {
      this.lst = resp;      
      // console.log(this.lst);
    },(error) => {
      console.log(error);
    });
  }

  irAgregar() {
    this._router.navigate(['/alta']);
  }

  //Ver datos del usuario en sesión (usuario)
  async datosUsuario() {
    this._apiAltaUsuarioService.verDatos(this.local["id"]).subscribe(async resp => {
      this.unUsuario = resp;            
    },(error) => {
      console.log(error);
    }) 
  }

  async validar() {
    if (this.local != null) {
      if (this.local['role'] === "admin" || this.local['role'] === "empleado") return this.verUsuarios();      
      if (this.local['role'] === "usuario") return this.datosUsuario();                
    }else{
      return this._router.navigate(['/']);
    } 
  }

  cerrarSesion() {
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
