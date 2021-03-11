import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController){}

canActivate(): boolean {
if (this.authService.isLoggedIn) {
if (!this.menuCtrl.isEnabled('first')){
this.menuCtrl.enable(true, 'first');
}
return true;
}else{
if (this.menuCtrl.isEnabled('first')){
this.menuCtrl.enable(false, 'first');
}
this.router.navigate(['login']);
return false;
}
}
}
