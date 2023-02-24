import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { InfoGatherComponent } from './info-gather/info-gather.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/authGuard';
import { SignupComponent } from './signup/signup.component';
import { VCardComponent } from './v-card/v-card.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'vcards', component: CardListComponent, canActivate: [AuthGuard] },
  { path: 'create/new', component: InfoGatherComponent, canActivate: [AuthGuard] },
  { path: 'detail/:type/:id', component: InfoGatherComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: InfoGatherComponent, canActivate: [AuthGuard] },
  {path: 'qr/:code' , component: VCardComponent},
  { path: '**', redirectTo: 'vcards' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
