import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestador } from '../models/prestador.model';  // Importe o modelo apropriado
import { ReturnDTO } from '../models/return-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  private baseUrl = 'https://localhost:44385/v1/prestadores';

  constructor(private http: HttpClient) { }

  getPrestadores(): Observable<ReturnDTO<Prestador[]>> {
    return this.http.get<ReturnDTO<Prestador[]>>(`${this.baseUrl}`);
  }

  getPrestador(id: number): Observable<ReturnDTO<Prestador>> {
    return this.http.get<ReturnDTO<Prestador>>(`${this.baseUrl}/${id}`);
  }

  createPrestador(prestador: Prestador): Observable<ReturnDTO<Prestador>> {
    return this.http.post<ReturnDTO<Prestador>>(this.baseUrl, prestador);
  }

  updatePrestador(id: number, prestador: Prestador): Observable<ReturnDTO<any>> {
    return this.http.put<ReturnDTO<any>>(`${this.baseUrl}/${id}`, prestador);
  }

  deletePrestador(id: number): Observable<ReturnDTO<any>> {
    return this.http.delete<ReturnDTO<any>>(`${this.baseUrl}/${id}`);
  }
}
