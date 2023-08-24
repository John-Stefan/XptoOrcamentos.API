import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { ClienteService } from '../../services/cliente.service';
import { PrestadorService } from '../../services/prestador.service';
import { Cliente } from '../../models/cliente.model';
import { Prestador } from '../../models/prestador.model';
import { OrdemServico } from '../../models/ordem-servico.model';
import { ReturnDTO } from '../../models/return-dto.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ordem-servico-form',
  templateUrl: './ordem-servico-form.component.html',
  styleUrls: ['./ordem-servico-form.component.css']
})
export class OrdemServicoFormComponent implements OnInit {
  ordemServicoForm!: FormGroup;
  clientes: Cliente[] = [];
  prestadores: Prestador[] = [];
  id: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private ordemServicoService: OrdemServicoService,
    private clienteService: ClienteService,
    private prestadorService: PrestadorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ordemServicoForm = this.formBuilder.group({
      id: [null],
      tituloServico: ['', Validators.required],
      dataExecucao: ['', Validators.required],
      valorServico: ['', Validators.required],
      clienteId: ['', Validators.required],
      prestadorId: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.ordemServicoService.getOrdem(this.id).subscribe(
          (data: ReturnDTO<OrdemServico>) => {
            if (data.success) {
              const formattedData = {
                ...data.data,
                dataExecucao: moment(data.data.dataExecucao).format('YYYY-MM-DD'),
              };
              this.ordemServicoForm.patchValue(formattedData);
            }
          }
        );
      }
    });

    this.clienteService.getClientes().subscribe(response => {
      if (response.success) {
        this.clientes = response.data;
      } else {
        console.error(response.message);
      }
    });
    
    this.prestadorService.getPrestadores().subscribe(
      response => {
        if(response.success) {
          this.prestadores = response.data;
        } else {
          console.error(response.message);
        }
      }
    );    
  }

  onSubmit(): void {
    const ordemServico: OrdemServico = this.ordemServicoForm.value;
    let serviceCall;
  
    if (this.id) {
      serviceCall = this.ordemServicoService.updateOrdem(this.id, ordemServico);
    } else {
      serviceCall = this.ordemServicoService.createOrdem(ordemServico);
    }
  
    serviceCall.subscribe(
      (response: ReturnDTO<any>) => {
        if (response.success) {
          const message = this.id ? 'Ordem de serviço atualizada com sucesso!' : 'Ordem de serviço criada com sucesso!';
          this.snackBar.open(message, 'Fechar', {
            duration: 3000,
          });
          this.router.navigate(['/ordens']);
        } else {
          this.snackBar.open(response.message, 'Fechar', {
            duration: 3000,
          });
        }
      },
      error => {
        const errorMessage = error.message ? error.message : 'Erro desconhecido ao processar a ordem de serviço.';
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/ordens']);
      }
    );
  }  
}
