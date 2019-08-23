import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_interface/user';
import { UserService } from '../shared/Services/user.service';
import { AlertsService } from '../shared/Services/Alerts.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MatchResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';

    constructor(private userService: UserService,
                private router: Router,
                private alerts: AlertsService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
        .pipe(catchError(error =>{
            this.alerts.error('Ha habido un problema de recuperacion de la lista, volviendo al inicio')
            this.router.navigate(['/home'])
            return of(null);
        }));




        
    }
}