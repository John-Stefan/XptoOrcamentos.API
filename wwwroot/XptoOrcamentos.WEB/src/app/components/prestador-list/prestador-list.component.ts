import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestadorService } from '../../services/prestador.service';
import { Prestador } from '../../models/prestador.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prestador-list',
  templateUrl: './prestador-list.component.html',
  styleUrls: ['./prestador-list.component.css']
})
export class PrestadorListComponent implements OnInit {
  prestadores: Prestador[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'actions'];

  constructor(
    private prestadorService: PrestadorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchPrestadores();
  }

  fetchPrestadores(): void {
    this.prestadorService.getPrestadores().subscribe(response => {
      if (response.success) {
        this.prestadores = response.data;
      } else {
        this.snackBar.open(response.message, 'Fechar', { duration: 2000 });
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
          this.snackBar.open('Prestador excluído com sucesso.', 'Fechar', { duration: 2000 });
        } else {
          this.snackBar.open(response.message, 'Fechar', { duration: 2000 });
        }
      },
      error => {
        if (error && error.error && error.error.message) {
          this.snackBar.open(error.error.message, 'Fechar', { duration: 2000 });
        } else {
          this.snackBar.open('Ocorreu um erro desconhecido.', 'Fechar', { duration: 2000 });
        }
      }
    );
  }
}
