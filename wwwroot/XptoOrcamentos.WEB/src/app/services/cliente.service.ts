import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { ReturnDTO } from '../models/return-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = 'https://localhost:44385/v1/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<ReturnDTO<Cliente[]>> {
    return this.http.get<ReturnDTO<Cliente[]>>(`${this.baseUrl}`);
  }

  getCliente(id: number): Observable<ReturnDTO<Cliente>> {
    return this.http.get<ReturnDTO<Cliente>>(`${this.baseUrl}/${id}`);
  }

  createCliente(cliente: Cliente): Observable<ReturnDTO<Cliente>> {
    return this.http.post<ReturnDTO<Cliente>>(this.baseUrl, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<ReturnDTO<any>> {
    return this.http.put<ReturnDTO<any>>(`${this.baseUrl}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<ReturnDTO<any>> {
    return this.http.delete<ReturnDTO<any>>(`${this.baseUrl}/${id}`);
  }
}
