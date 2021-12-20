import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../usuario';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  usuario: Usuario;
  form: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['idUsuario'];
    this.usuarioService.find(this.id).subscribe((data: Usuario)=>{
      this.usuario = data;
    });

    this.form = new FormGroup({
      nombres:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      apellidos:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      cedula: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      correo: new FormControl('', [ Validators.required, Validators.email ]),
      telefono: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });
  }


  get campos(){
    return this.form.controls;
  }

  submit(){
    this.usuarioService.update(this.id,this.form.value).subscribe(res => {
      if(res.errors.length > 0){
        alert(res.errors.join(' y '));
      }else{
       alert(res.message);
       this.router.navigateByUrl('usuario/index');
      }
   })
  }

  
}
