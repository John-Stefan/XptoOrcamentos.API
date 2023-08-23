// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdemServicoListComponent } from './components/ordem-servico-list/ordem-servico-list.component';
import { OrdemServicoFormComponent } from './components/ordem-servico-form/ordem-servico-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ordens', component: OrdemServicoListComponent },
  { path: 'ordem-form/:id', component: OrdemServicoFormComponent },
  { path: 'ordem-form', component: OrdemServicoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
