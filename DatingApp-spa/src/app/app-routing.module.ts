import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './members/list/list.component';
import { MembersComponent } from './members/members.component';
import { MatchesComponent } from './members/matches/matches.component';
import { MessagesComponent } from './members/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [

{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: 'home', component: HomeComponent},
{
  path: '', 
  runGuardsAndResolvers: 'always', 
  canActivate: [AuthGuard], 
  children:[{path: 'members', component: MembersComponent,},
  {path: 'list', component: ListComponent},
  {path: 'matches', component: MatchesComponent},
  {path: 'messages', component: MessagesComponent},]
},

{path: '**', redirectTo: '/home'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
