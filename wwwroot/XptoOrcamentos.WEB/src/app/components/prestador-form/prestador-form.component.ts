import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from '../../services/prestador.service';
import { ToastrService } from 'ngx-toastr';
import { Prestador } from '../../models/prestador.model';

@Component({
  selector: 'app-prestador-form',
  templateUrl: './prestador-form.component.html',
  styleUrls: ['./prestador-form.component.css']
})
export class PrestadorFormComponent implements OnInit {
  form: FormGroup;
  prestadorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private prestadorService: PrestadorService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.prestadorId = this.route.snapshot.params['id'];
    if (this.prestadorId) {
      this.prestadorService.getPrestador(this.prestadorId).subscribe(response => {
        if (response.success) {
          this.form.patchValue(response.data);
        }
      });
    }
  }

  savePrestador(): void {
    if (this.form.valid) {
      const prestadorData: Prestador = this.form.value;

      if (this.prestadorId) {
        this.prestadorService.updatePrestador(this.prestadorId, prestadorData).subscribe(
          response => {
            if (response.success) {
              this.toastr.success('Prestador atualizado com sucesso.');
              this.router.navigate(['/prestador-list']);
            } else {
              this.toastr.error(response.message);
            }
          },
          error => this.handleError(error)
        );
      } else {
        this.prestadorService.createPrestador(prestadorData).subscribe(
          response => {
            if (response.success) {
              this.toastr.success('Prestador criado com sucesso.');
              this.router.navigate(['/prestador-list']);
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
