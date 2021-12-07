import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        
        //si existe una sesión puede continuar en inicio
        if(localStorage.getItem('sesion') != null) return true;

        //Si no existe sesión se redirige al login
        this._router.navigate(['/']);
        return false;
    }

}