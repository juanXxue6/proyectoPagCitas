import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';


@Injectable({
    providedIn: 'root'
  })

export class PreventUnsave implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent)
    {
        if(component.formularioEditar.dirty){

            return confirm('¿Seguro que quieres salir? Hay cambios sin guardar');

        }
        return true;
    }
}