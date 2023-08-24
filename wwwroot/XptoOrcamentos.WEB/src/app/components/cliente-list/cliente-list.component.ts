import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clients: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'actions'];

  constructor(
    private clientService: ClienteService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.getClientes().subscribe(response => {
      if (response.success) {
        this.clients = response.data;
      } else {
        this.snackBar.open(response.message, 'Fechar', {
          duration: 2000,
        });
      }
    });
  }

  createClient(): void {
    this.router.navigate(['/client-form']);
  }

  editar(id: number): void {
    this.router.navigate(['/client-form', id]);
  }

  excluir(id: number): void {
    this.clientService.deleteCliente(id).subscribe(
      response => {
        if (response.success) {
          this.clients = this.clients.filter(client => client.id !== id);
          this.snackBar.open('Cliente excluído com sucesso.', 'Fechar', {
            duration: 2000,
          });
        } else {
          this.snackBar.open(response.message, 'Fechar', {
            duration: 2000,
          });
        }
      },
      error => {
        if (error && error.error && error.error.message) {
          this.snackBar.open(error.error.message, 'Fechar', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Ocorreu um erro desconhecido.', 'Fechar', {
            duration: 2000,
          });
        }
      }
    );
  }
}
