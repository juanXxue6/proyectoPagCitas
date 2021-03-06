import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserService } from '../shared/Services/user.service';
import { AlertsService } from '../shared/Services/Alerts.service';
import { catchError } from 'rxjs/operators';
import { Message } from '../_interface/message';
import { AuthService } from '../shared/Services/Auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

    pageNumber = 1;
    pageSize = 12;
    messageContainer = 'Unread';


    constructor(private userService: UserService,
                private router: Router,
                private alerts: AlertsService,
                private authService: AuthService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, 
            this.pageSize, this.messageContainer)
        .pipe(catchError(error =>{
            this.alerts.error('Ha habido un problema de recuperacion de los mensajes, volviendo al inicio')
            this.router.navigate(['/home'])
            return of(null);
        }));

        
    }
}