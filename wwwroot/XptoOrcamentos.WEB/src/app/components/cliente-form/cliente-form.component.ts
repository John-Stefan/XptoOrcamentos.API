import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../models/cliente.model';

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
    private toastr: ToastrService
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
              this.toastr.success('Cliente atualizado com sucesso.');
              this.router.navigate(['/client-list']);
            } else {
              this.toastr.error(response.message);
            }
          },
          error => this.handleError(error)
        );
      } else {
        this.clientService.createCliente(clienteData).subscribe(
          response => {
            if (response.success) {
              this.toastr.success('Cliente criado com sucesso.');
              this.router.navigate(['/client-list']);
            } else {
              this.toastr.error(response.message);
            }
          },
          error => this.handleError(error)
        );
      }
    } else {
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  private handleError(error: any): void {
    if (error && error.error && error.error.errors) {
      const validationErrors = error.error.errors;
      for (const field in validationErrors) {
        if (validationErrors.hasOwnProperty(field)) {
          this.toastr.error(`Erro de validação em ${field}: ${validationErrors[field]}`);
        }
      }
    } else if (error && error.error && error.error.message) {
      this.toastr.error(error.error.message);
    } else {
      this.toastr.error('Ocorreu um erro desconhecido.');
    }
  }  
}
