import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiAuthService } from '../services/api-auth.service';


//clase creada porque en angular existe algo llamado interceptor que se pueden encargar de agregarles cosas
//a las peticiones como el token que viene de la api, en lugar de poner uno a uno en los headers de cada petición


@Injectable()
export class JwtIncerteptor implements HttpInterceptor {

    constructor(private _apiAuthService: ApiAuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this._apiAuthService.userData;

        if (user != null) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }
        return next.handle(req);
    }

}