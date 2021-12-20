import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  form: FormGroup;


 constructor(
    public usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    
    this.usuarioService.create(this.form.value).subscribe(res => {
       if(res.errors.length > 0){
         alert(res.errors.join(' y '));
       }else{
        alert(res.message);
        this.router.navigateByUrl('usuario/index');
       }
    })
  }

}
