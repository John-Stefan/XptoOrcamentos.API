import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdemServicoListComponent } from './components/ordem-servico-list/ordem-servico-list.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdemServicoFormComponent } from './components/ordem-servico-form/ordem-servico-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { PrestadorListComponent } from './components/prestador-list/prestador-list.component';
import { PrestadorFormComponent } from './components/prestador-form/prestador-form.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdemServicoListComponent,
    OrdemServicoFormComponent,
    ClienteListComponent,
    ClienteFormComponent,
    PrestadorListComponent,
    PrestadorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
