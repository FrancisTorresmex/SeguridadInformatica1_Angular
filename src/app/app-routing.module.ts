import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './security/auth.guard';
import { AltaComponent } from './pages/alta/alta.component';
import { RoleAdminGuard } from './security/role.guard';

const routes: Routes = [
  { path: '', component:LoginComponent, pathMatch: 'full' },
  { path: 'inicio', component:HomeComponent, canActivate: [AuthGuard] },
  { path: 'alta', component:AltaComponent, canActivate: [AuthGuard, RoleAdminGuard] },

  {path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
