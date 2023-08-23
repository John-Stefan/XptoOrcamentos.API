import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clients: Cliente[] = [];

  constructor(
    private clientService: ClienteService, 
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.getClientes().subscribe(response => {
      if (response.success) {
        this.clients = response.data;
      } else {
        console.error(response.message);
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
          this.toastr.success('Cliente excluído com sucesso.');
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
