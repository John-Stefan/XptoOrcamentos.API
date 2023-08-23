// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdemServicoListComponent } from './components/ordem-servico-list/ordem-servico-list.component';
import { OrdemServicoFormComponent } from './components/ordem-servico-form/ordem-servico-form.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { PrestadorListComponent } from './components/prestador-list/prestador-list.component';
import { PrestadorFormComponent } from './components/prestador-form/prestador-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ordens', component: OrdemServicoListComponent },
  { path: 'ordem-form/:id', component: OrdemServicoFormComponent },
  { path: 'ordem-form', component: OrdemServicoFormComponent },
  { path: 'client-list', component: ClienteListComponent },
  { path: 'client-form/:id', component: ClienteFormComponent },
  { path: 'client-form', component: ClienteFormComponent },
  { path: 'prestador-list', component: PrestadorListComponent },
  { path: 'prestador-form/:id', component: PrestadorFormComponent },
  { path: 'prestador-form', component: PrestadorFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
