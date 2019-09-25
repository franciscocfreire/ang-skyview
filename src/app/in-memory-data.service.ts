import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const usuarios = [
      {
        idUsuario: 1,
        nomeUsuario: 'Francisco',
        enderecoUsuario: 'Rua 1',
        telefoneUsuario: 123456,
        foto: '/FOTO/foto1.jpg'

      },

      {
        idUsuario: 2,
        nomeUsuario: 'Helio',
        enderecoUsuario: 'Rua 2',
        telefoneUsuario: 123456,
        foto: '/FOTO/foto2.jpg'

      },

      {
        idUsuario: 3,
        nomeUsuario: 'Julio',
        enderecoUsuario: 'Rua 3',
        telefoneUsuario: 123456,
        foto: '/FOTO/foto3.jpg'

      },

      {
        idUsuario: 4,
        nomeUsuario: 'Vinicius',
        enderecoUsuario: 'Rua 4',
        telefoneUsuario: 123456,
        foto: '/FOTO/foto4.jpg'

      }
    ];

    return { usuarios };
  }

  genId(usuarios: Usuario[]): number {
    return usuarios.length > 0 ? Math.max(...usuarios.map(usuario => usuario.idUsuario)) + 1 : 11;
  }
}
