import { Cliente } from './cliente.model';
import { Prestador } from './prestador.model'; 

export class OrdemServico {
  id: number = 0;
  tituloServico: string = '';
  dataExecucao: Date = new Date();
  valorServico: number = 0;

  clienteId: number = 0;
  cliente?: Cliente;

  prestadorId: number = 0;
  prestador?: Prestador;
}

  
  