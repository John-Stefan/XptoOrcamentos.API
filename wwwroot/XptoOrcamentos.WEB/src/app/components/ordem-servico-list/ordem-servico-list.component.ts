import { Component, OnInit } from '@angular/core';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { OrdemServico } from '../../models/ordem-servico.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-ordem-servico-list',
  templateUrl: './ordem-servico-list.component.html',
  styleUrls: ['./ordem-servico-list.component.css']
})
export class OrdemServicoListComponent implements OnInit {
  ordens: OrdemServico[] = [];
  displayedColumns: string[] = ['id', 'tituloServico', 'dataExecucao', 'valorServico', 'prestadorCpf', 'clienteCnpj', 'actions'];

  constructor(
    private ordemServicoService: OrdemServicoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchOrdens();
  }

  fetchOrdens(): void {
    this.ordemServicoService.getOrdens().subscribe(response => {
      if (response.success) {
        this.ordens = response.data;
      } else {
        this.snackBar.open(response.message, 'Fechar', { duration: 3000 }); 
      }
    });
  }

  editar(id: number): void {
    this.router.navigate(['/ordem-form', id]);
  }

  excluir(id: number): void {
    this.ordemServicoService.deleteOrdem(id).subscribe(
      () => {
        this.ordens = this.ordens.filter(ordem => ordem.id !== id);
        this.snackBar.open('Ordem de serviço excluída com sucesso.', 'Fechar', { duration: 3000 }); 
      },
      error => {
        this.snackBar.open(error.message, 'Fechar', { duration: 3000 });
      }
    );
  }

  novo(): void {
    this.router.navigate(['/ordem-form']);
  }
}
