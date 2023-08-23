import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdemServico } from '../models/ordem-servico.model';
import { ReturnDTO } from '../models/return-dto.model';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {
  private baseUrl = 'https://localhost:44385/v1/ordemServicos';

  constructor(private http: HttpClient) { }

  getOrdens(): Observable<ReturnDTO<OrdemServico[]>> {
    return this.http.get<ReturnDTO<OrdemServico[]>>(`${this.baseUrl}`);
  }

  getOrdem(id: number): Observable<ReturnDTO<OrdemServico>> {
    return this.http.get<ReturnDTO<OrdemServico>>(`${this.baseUrl}/${id}`);
  }

  createOrdem(ordem: OrdemServico): Observable<ReturnDTO<OrdemServico>> {
    return this.http.post<ReturnDTO<OrdemServico>>(this.baseUrl, ordem);
  }

  updateOrdem(id: number, ordem: OrdemServico): Observable<ReturnDTO<any>> {
    return this.http.put<ReturnDTO<any>>(`${this.baseUrl}/${id}`, ordem);
  }

  deleteOrdem(id: number): Observable<ReturnDTO<any>> {
    return this.http.delete<ReturnDTO<any>>(`${this.baseUrl}/${id}`);
  }
}
