import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { InfoGatherComponent } from './info-gather/info-gather.component';
import { LandingComponent } from './landing/landing.component';
import { VCardComponent } from './v-card/v-card.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'vcards', component: CardListComponent },
  { path: 'create/new', component: InfoGatherComponent },
  { path: 'detail/:type/:id', component: InfoGatherComponent },
  { path: 'edit/:id', component: InfoGatherComponent },
  {path: 'qr/:code' , component: VCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
