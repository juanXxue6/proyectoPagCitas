// tslint:disable: quotemark
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./members/list/list.component";
import { MembersComponent } from "./members/members.component";
import { MatchesComponent } from "./members/matches/matches.component";
import { MessagesComponent } from "./members/messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberDetailsComponent } from "./members/member-details/member-details.component";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsave } from './_guards/prevent-unsave.guard';
import { MatchResolver } from './_resolvers/Match.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MembersComponent
      },
      {
        path: "members/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsave]
      },
      {
        path: "members/:id",
        component: MemberDetailsComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: "list",
        component: ListComponent,
        resolve: { users: MemberListResolver }
      },
      { 
        path: "matches", 
        component: MatchesComponent, 
        resolve: {users: MatchResolver}
      },
      { 
      path: "messages", 
      component: MessagesComponent,
      resolve: { messages: MessagesResolver} 
    }
    ]
  },

  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
