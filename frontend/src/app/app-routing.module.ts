import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { ImmersionDetailsComponent } from './components/immersion-details/immersion-details.component';
import { ImmersionsComponent } from './components/immersions/immersions.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers';

const routes: Routes = [
  {path:'', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'equipment', component: EquipmentComponent, canActivate: [AuthGuard]},
  {path:'immersions', component: ImmersionsComponent, canActivate: [AuthGuard]},
  // {path:'immersions/:immersionId', component: ImmersionDetailsComponent},
  {path:'immersions/:immersionId', component: ImmersionDetailsComponent, canActivate: [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
   // otherwise redirect to home
  // { path: '**', redirectTo: '' }
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
