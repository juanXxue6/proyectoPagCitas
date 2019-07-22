import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_interface/user';
import { UserService } from '../shared/Services/user.service';
import { AlertsService } from '../shared/Services/Alerts.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/Services/Auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService,
                private router: Router,
                private alerts: AlertsService,
                private authService: AuthService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid)
        .pipe(catchError(error =>{
            this.alerts.error('Ha habido un problema de recuperacion con tus datos, volviendo al inicio')
            this.router.navigate(['/home'])
            return of(null);
        }))
    }
}