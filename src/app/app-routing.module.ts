import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RegistrationComponent } from './auth/registration/registration.component';

export const TranslatePath = 'translate';
export const RegistrationPath = 'registration';

const routes: Routes = [
  {
    path: '',
    redirectTo: TranslatePath,
    pathMatch: 'full'
  },
  {
    path: RegistrationPath,
    component: RegistrationComponent
  },
  {
    path: TranslatePath,
    loadChildren: () => import('./translate/translate.module').then(m => m.TranslateModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
