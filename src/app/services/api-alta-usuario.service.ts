import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatosUsuario} from '../models/datosUsuario';


const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiAltaUsuarioService {

  url: string = "https://localhost:44364/api/AltaUsuario"

  constructor(
    private _router: Router,
    private _http: HttpClient,    
  ) { }

    //Ver todos los usuarios (admin y empleado)
    verUsuarios(): Observable<DatosUsuario> {
      return this._http.get<DatosUsuario>(this.url);
    }


    //Agregar usuario (admin)
    agregarUsuario(model: DatosUsuario): Observable<DatosUsuario> {
      return this._http.post<DatosUsuario>(this.url, model, httpOption);
    }

    //Ver datos de un usuario (usuario)
    verDatos(id: number): Observable<DatosUsuario> {
      return this._http.get<DatosUsuario>(`${this.url}/Usuario?id=${id}`);
    }
}
