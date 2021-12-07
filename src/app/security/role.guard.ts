import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


//Creado para vérificar el rol de un usuario antes de permitirle ir a páginas destinadas a administradores

@Injectable({ providedIn: 'root' })
export class RoleAdminGuard implements CanActivate {

    constructor(private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        //revisamos en el localStorage a que rol pertenece (según el token amacenado)
        const storage = JSON.parse(localStorage.getItem('sesion') as string);

        if (storage['role'] == "admin") { //si es admin retornamos true y por ende el guard puede continuar
            return true;
        }
        this._router.navigate(['/inicio']); //si no es admin, no puede seguir
        return false;
    }

}