import { Component, OnInit } from '@angular/core';
import { OrdemServicoService } from '../../services/ordem-servico.service';
import { OrdemServico } from '../../models/ordem-servico.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordem-servico-list',
  templateUrl: './ordem-servico-list.component.html',
  styleUrls: ['./ordem-servico-list.component.css']
})
export class OrdemServicoListComponent implements OnInit {
  ordens: OrdemServico[] = [];

  constructor(
    private ordemServicoService: OrdemServicoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchOrdens();
  }

  fetchOrdens(): void {
    this.ordemServicoService.getOrdens().subscribe(response => {
      if (response.success) {
        this.ordens = response.data;
      } else {
        console.error(response.message);
      }
    });
  }

  editar(id: number): void {
    this.router.navigate(['/ordem-form', id]);
  }

  excluir(id: number): void {
    this.ordemServicoService.deleteOrdem(id).subscribe(() => {
        this.ordens = this.ordens.filter(ordem => ordem.id !== id);
      },
      error => {
        console.error(error.message);
      }
    );
  }

  novo(): void {
    this.router.navigate(['/ordem-form']);
  }
}

