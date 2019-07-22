import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_interface/user';
import { UserService } from '../shared/Services/user.service';
import { AlertsService } from '../shared/Services/Alerts.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService,
                private router: Router,
                private alerts: AlertsService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(route.params.id)
        .pipe(catchError(error =>{
            this.alerts.error('Ha habido un problema de recuperacion del usuario, volviendo al inicio')
            this.router.navigate(['/members'])
            return of(null);
        }))
    }
}