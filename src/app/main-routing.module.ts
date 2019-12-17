import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './home/home.component';
import { BeheerComponent } from './beheer/beheer.component';
import { LijstjeComponent } from './lijstje/lijstje.component';

const routes: Routes = [
  { path: 'app', 
    component: AppComponent, 
    loadChildren: './app-routing.module',
    data: { preload: true}},
  { path: 'home', component: HomeComponent},
  { path: 'beheer', component: BeheerComponent},
  { path: 'lijstje', component: LijstjeComponent},
  { path: '', redirectTo: '/app', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
