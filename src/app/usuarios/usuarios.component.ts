import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from "../usuario.service";
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  profileForm = this.fb.group({
    idUsuario: ['', Validators.required],
    nomeUsuario: ['', Validators.required],
    enderecoUsuario: [''],
    telefoneUsuario: [''],
    foto: ['']
  });

  usuarios: Usuario[];  

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.getUsuarios();
  }  

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => this.usuarios = usuarios);
  }

  delete(usuario: Usuario) {
    
    this.usuarios = this.usuarios.filter(h => h !== usuario)    
    this.usuarioService.deleteUsuario(usuario).subscribe()
  }

  fileData = null;

  private domainUrl = 'http://localhost:5000/' 
  private resourceUrl = 'fileServe';

  onSubmit() {
    
    let urlMultiPart = `${this.domainUrl}${this.resourceUrl}`;
    let serializedForm = JSON.stringify(this.profileForm.value);
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('usuario', serializedForm);



    // this.http.post(urlMultiPart, formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('SUCCESS !!');
    //   })


      this.http.post(urlMultiPart, formData, {
        reportProgress: true,
        observe: 'events'   
    })
    .subscribe(events => {
        if(events.type == HttpEventType.UploadProgress) {
            console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
        } else if(events.type === HttpEventType.Response) {
            console.log(events);
        }
    })
    
    
    // this.usuarioService.addUsuario( serializedForm)
    // .subscribe( usuario => {
    //   this.usuarios.push(usuario)
    // })
    
  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }
 

  // add(name : string): void {
  //   name = name.trim();
  //   if(!name) { return;}
  //   this.usuarioService.addUsuario({name,} as Usuario)
  //   .subscribe( usuario => {
  //     this.usuarios.push(usuario);
  //   })
  // }
}
