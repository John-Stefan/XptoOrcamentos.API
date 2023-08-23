import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestador } from '../models/prestador.model';
import { ReturnDTO } from '../models/return-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  private baseUrl = 'https://localhost:44385/v1/prestadores';

  constructor(private http: HttpClient) { }

  getPrestadores(): Observable<ReturnDTO<Prestador[]>> {
    return this.http.get<ReturnDTO<Prestador[]>>(this.baseUrl);
  }

  // ... outros métodos, como criar, atualizar e deletar prestadores ...
}
