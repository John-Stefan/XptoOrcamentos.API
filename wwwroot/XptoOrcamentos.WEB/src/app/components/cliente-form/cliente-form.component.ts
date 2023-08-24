import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../models/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  form: FormGroup;
  clienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClienteService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.params['id'];
    if (this.clienteId) {
      this.clientService.getCliente(this.clienteId).subscribe(response => {
        if (response.success) {
          this.form.patchValue(response.data);
        }
      });
    }
  }

  saveClient(): void {
    if (this.form.valid) {
      const clienteData: Cliente = this.form.value;
  
      if (this.clienteId) {
        this.clientService.updateCliente(this.clienteId, clienteData).subscribe(
          response => {
            if (response.success) {
              this.snackBar.open('Cliente atualizado com sucesso.', 'Fechar', { duration: 3000 });
              this.router.navigate(['/client-list']);
            } else {
              this.snackBar.open(response.message, 'Fechar', { duration: 3000 });
            }
          },
          error => this.handleError(error)
        );
      } else {
        this.clientService.createCliente(clienteData).subscribe(
          response => {
            if (response.success) {
              this.snackBar.open('Cliente criado com sucesso.', 'Fechar', { duration: 3000 });
              this.router.navigate(['/client-list']);
            } else {
              this.snackBar.open(response.message, 'Fechar', { duration: 3000 });
            }
          },
          error => this.handleError(error)
        );
      }
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
    }
  }
  
  private handleError(error: any): void {
    if (error && error.error && error.error.errors) {
      const validationErrors = error.error.errors;
      for (const field in validationErrors) {
        if (validationErrors.hasOwnProperty(field)) {
          this.snackBar.open(`Erro de validação em ${field}: ${validationErrors[field]}`, 'Fechar', { duration: 3000 });
        }
      }
    } else if (error && error.error && error.error.message) {
      this.snackBar.open(error.error.message, 'Fechar', { duration: 3000 });
    } else {
      this.snackBar.open('Ocorreu um erro desconhecido.', 'Fechar', { duration: 3000 });
    }
  }   
}
