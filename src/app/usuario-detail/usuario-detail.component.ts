import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from "../usuario";
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  usuario: Usuario;
  
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(id).subscribe(usuario => this.usuario = usuario);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.usuarioService.updateUsuario(this.usuario).subscribe(()=> this.goBack());
  }

}
