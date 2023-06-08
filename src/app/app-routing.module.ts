import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { CreateAccountComponent } from './auth/components/create-account/create-account.component';
import { RecoverPassComponent } from './auth/components/recover-pass/recover-pass.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'forget-pass', component: RecoverPassComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
