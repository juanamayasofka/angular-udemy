import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRountingModule } from './auth/auth.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';



const routes: Routes = [
  { path: '',redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
 ]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRountingModule
  ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
