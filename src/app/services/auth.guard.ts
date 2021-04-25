import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
     
        return this.checkLogin(url)
    }

    private checkLogin(url: string): boolean{
        if(this.authService.isUserLoggedIn()){
            return true;
        } else {
            this.router.navigate(['/login'])
            return false;
        }
    }
}
