import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; //usar map
import { Auth } from '../models/auth';
import { Datos } from '../models/datos';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {  

  url: string = "https://localhost:44364/api/Auth";

  private _userSubject!: BehaviorSubject<Datos>; //behaviorSubject es un observable, que retorna el ultimo valor inmediatamente
  public user!: Observable<Datos> 

  public get userData() : Datos { // si no existe sesión el value sera null (se usa en el auth.guard.ts)
    return this._userSubject.value;
  }

  constructor(private _http: HttpClient) { 
    this._userSubject = new BehaviorSubject<Datos>(JSON.parse(localStorage.getItem('sesion')!));
    this.user = this._userSubject.asObservable();
  }

  //Iniciar sesión
  iniciar(model: Auth):Observable<Datos> {    
    return this._http.post<Datos>(this.url, model, httpOption).pipe(
      map(resp => {
        localStorage.setItem('sesion', JSON.stringify(resp));
        this._userSubject.next(resp);
        return resp;
      })
    );
  }
}
