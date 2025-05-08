import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoleGuard } from './role.guard'  // Import RoleGuard
import { CreatorComponent } from './creator/creator.component';
import { ConsumerComponent } from './consumer/consumer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'creator',
    component: CreatorComponent,  // Replace with actual creator component
    canActivate: [RoleGuard],
    data: { role: 'creator' }  // Only allow users with 'creator' role
  },
  {
    path: 'consumer',
    component: ConsumerComponent,  // Replace with actual consumer component
    canActivate: [RoleGuard],
    data: { role: 'consumer' }  // Only allow users with 'consumer' role
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
