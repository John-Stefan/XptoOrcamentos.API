import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestadorService } from '../../services/prestador.service';
import { Prestador } from '../../models/prestador.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prestador-list',
  templateUrl: './prestador-list.component.html',
  styleUrls: ['./prestador-list.component.css']
})
export class PrestadorListComponent implements OnInit {
  prestadores: Prestador[] = [];

  constructor(
    private prestadorService: PrestadorService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchPrestadores();
  }

  fetchPrestadores(): void {
    this.prestadorService.getPrestadores().subscribe(response => {
      if (response.success) {
        this.prestadores = response.data;
      } else {
        console.error(response.message);
      }
    });
  }

  createPrestador(): void {
    this.router.navigate(['/prestador-form']);
  }

  editar(id: number): void {
    this.router.navigate(['/prestador-form', id]);
  }

  excluir(id: number): void {
    this.prestadorService.deletePrestador(id).subscribe(
      response => {
        if (response.success) {
          this.prestadores = this.prestadores.filter(prestador => prestador.id !== id);
          this.toastr.success('Prestador excluído com sucesso.');
        } else {
          this.toastr.error(response.message);
        }
      },
      error => {
        if (error && error.error && error.error.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Ocorreu um erro desconhecido.');
        }
      }
    );
  }
}
