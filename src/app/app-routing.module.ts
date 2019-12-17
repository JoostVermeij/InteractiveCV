import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';

import { IntroComponent } from './intro/intro.component';
import { FilosofieComponent } from './filosofie/filosofie.component';
import { QuatroComponent } from './quatro/quatro.component';
import { ReceptipediaComponent } from './receptipedia/receptipedia.component';
import { BioComponent } from './bio/bio.component';
import { SpeelQuatroComponent } from './speel-quatro/speel-quatro.component';
import { SkillsComponent } from './skills/skills.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'intro', pathMatch: 'full' },
      { path: 'intro', component: IntroComponent},
      { path: 'bio', component: BioComponent},
      { path: 'filosofie', component: FilosofieComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'quatro', component: QuatroComponent},
      { path: 'speel_quatro', component: SpeelQuatroComponent },
      { path: 'receptipedia', component: ReceptipediaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
