import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from '../../services/prestador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar
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
              this.snackBar.open('Prestador atualizado com sucesso.', 'Fechar', { duration: 3000 });
              this.router.navigate(['/prestador-list']);
            } else {
              this.snackBar.open(response.message, 'Fechar', { duration: 3000 });
            }
          },
          error => this.handleError(error)
        );
      } else {
        this.prestadorService.createPrestador(prestadorData).subscribe(
          response => {
            if (response.success) {
              this.snackBar.open('Prestador criado com sucesso.', 'Fechar', { duration: 3000 });
              this.router.navigate(['/prestador-list']);
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
