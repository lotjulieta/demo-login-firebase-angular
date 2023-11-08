import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsersService} from '../../services/users.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario = {
    nombre: ''

  }

  constructor(
    public UsersService: UsersService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  signUp(email: any, password: any) {
    this.UsersService.RegisterUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.UsersService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  guardar( forma: NgForm){
    console.log( forma );
    console.log( forma.value );
  }
  
}
